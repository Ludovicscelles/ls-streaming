// import necessary modules and entities
// from TypeORM and entity definitions
import { Repository, Like } from "typeorm";
import { DocumentaryEntity } from "./entities/DocumentaryEntity";
import { FilmEntity } from "./entities/FilmEntity";
import { SerieEntity } from "./entities/SerieEntity";
import { EpisodeEntity } from "./entities/EpisodeEntity";
import { TvShowEntity } from "./entities/TvShowEntity";

// MovieLibraryRepository class definition
export class MovieLibraryRepository {
  // constructor to initialize repositories for each entity
  constructor(
    private documentaryRepo: Repository<DocumentaryEntity>,
    private filmRepo: Repository<FilmEntity>,
    private serieRepo: Repository<SerieEntity>,
    private tvShowRepo: Repository<TvShowEntity>,
    private episodeRepo: Repository<EpisodeEntity>
  ) {}

  // method to get all documentaries
  // async means it returns a promise and that function is asynchronous
  // Promise<DocumentaryEntity[]> indicates the return type
  // which is an array of DocumentaryEntity
  async getAllDocumentaries(): Promise<DocumentaryEntity[]> {
    // use the repository to find and return all documentaries
    // this signifies that we are calling the find method on the documentaryRepo
    // the find() method fetches all records from the database table
    return this.documentaryRepo.find();
  }

  // method to get all films
  async getAllFilms(): Promise<FilmEntity[]> {
    return this.filmRepo.find();
  }

  // method to get all series with their seasons and episodes
  async getAllSeries(): Promise<SerieEntity[]> {
    // relations option is used to specify related entities to be loaded
    // here, we are loading seasons and episodes related to each series
    return this.serieRepo.find({
      relations: ["seasonEntities", "seasonEntities.episodes"],
    });
  }

  // method to get all TV shows with their seasons and episodes
  async getAllTvShows(): Promise<TvShowEntity[]> {
    return this.tvShowRepo.find({
      relations: [
        "seasonTvShowEntities",
        "seasonTvShowEntities.episodeTvShowEntities",
      ],
    });
  }

  // method to get all videos (documentaries, films, series, tv shows)
  // combines results from all individual getAll methods
  async getAllVideos(): // promise that resolves to an array containing any of the four entity types
  // DocumentaryEntity, FilmEntity, SerieEntity, TvShowEntity
  Promise<(DocumentaryEntity | FilmEntity | SerieEntity | TvShowEntity)[]> {
    // await each method to get the respective lists
    const documentaries = await this.getAllDocumentaries();
    const films = await this.getAllFilms();
    const series = await this.getAllSeries();
    const tvShows = await this.getAllTvShows();

    // concatenate all lists into a single array and return it
    return [...documentaries, ...films, ...series, ...tvShows];
  }

  // Method to get film by ID
  async getFilmById(id: string): Promise<FilmEntity | null> {
    return this.filmRepo.findOne({ where: { id } });
  }

  // Method to get documentary by ID
  async getDocumentaryById(id: string): Promise<DocumentaryEntity | null> {
    return this.documentaryRepo.findOne({ where: { id } });
  }

  // Method to get serie by ID
  async getSerieById(id: string): Promise<SerieEntity | null> {
    return this.serieRepo.findOne({
      where: { id },
      relations: ["seasonEntities", "seasonEntities.episodes"],
    });
  }

  // Method to get tv-show by ID
  async getTvShowById(id: string): Promise<TvShowEntity | null> {
    return this.tvShowRepo.findOne({
      where: { id },
      relations: [
        "seasonTvShowEntities",
        "seasonTvShowEntities.episodeTvShowEntities",
      ],
    });
  }

  // Method to filter films by genre

  async getFilmsByGenre(genre: string) {
    return this.filmRepo.find({
      where: { genre: Like(`%${genre.trim().toLowerCase()}%`) },
    });
  }

  // Method to filter documentary by genre

  async getDocumentariesByGenre(genre: string) {
    return this.documentaryRepo.find({
      where: { genre: Like(`%${genre.trim().toLowerCase()}%`) },
    });
  }

  // Method to filter series by genre

  async getSeriesByGenre(genre: string) {
    return this.serieRepo.find({
      where: { genre: Like(`%${genre.trim().toLowerCase()}%`) },
      relations: [`seasonEntities`, `seasonEntities.episodes`],
    });
  }

  // Method to filter tv shows by genre

  async getTvShowsByGenre(genre: string) {
    return this.tvShowRepo.find({
      where: { genre: Like(`%${genre.trim().toLowerCase()}%`) },
      relations: [
        `seasonTvShowEntities`,
        `seasonTvShowEntities.episodeTvShowEntities`,
      ],
    });
  }

  // method to create a new film
  async createFilm(data: Partial<FilmEntity>) {
    const film = this.filmRepo.create(data);
    await this.filmRepo.insert(film);
    return this.filmRepo.findOneByOrFail({ id: film.id! });
  }

  // method to create a new documentary

  // method to create a new documentary
  // takes a partial DocumentaryEntity object as input data
  async createDocumentary(data: Partial<DocumentaryEntity>) {
    // create a new documentary instance using the repository's create method
    const documentary = this.documentaryRepo.create(data);
    // insert the new documentary into the database
    await this.documentaryRepo.insert(documentary);
    // retrieve and return the newly created documentary by its ID
    // this ensures we return the complete entity as stored in the database
    return this.documentaryRepo.findOneByOrFail({ id: documentary.id! });
  }

  // method to search films by title
  async searchFilms(title: string): Promise<FilmEntity[]> {
    return this.filmRepo.find({
      // where clause to filter films by title
      // this performs a search in the database for films matching the given title
      where: { title: Like(`%${title.trim().toLowerCase()}%`) },
    });
  }

  async searchDocumentaries(title: string): Promise<DocumentaryEntity[]> {
    return this.documentaryRepo.find({
      where: { title: Like(`%${title.trim().toLocaleLowerCase()}%`) },
    });
  }

  async searchSeries(title: string): Promise<SerieEntity[]> {
    return this.serieRepo.find({
      where: { title: Like(`%${title.trim().toLowerCase()}%`) },
      relations: ["seasonEntities", "seasonEntities.episodes"],
    });
  }

  // methode to search epidode series by title

  async searchEpisodesInSeriesByTitle(title: string) {
    return this.episodeRepo.find({
      where: { title: Like(`%${title.trim().toLowerCase()}%`) },
      relations: ["season.serie"],
    });
  }

  // methode to search episode series by title with query builder

  // This method searches for series that contain episodes with titles matching the provided title.
  async searchSerieByEpisodeTitle(title: string): Promise<SerieEntity[]> {
    // Using QueryBuilder to construct a more complex query
    return (
      this.serieRepo
        // create a query builder for the SerieEntity
        .createQueryBuilder("serie")
        // left join the seasonEntities related to the series
        // This allows us to access seasons of the series, even if there are no seasons (left join)
        .leftJoinAndSelect("serie.seasonEntities", "season")
        // left join the episodes related to the seasons
        // This allows us to access episodes of the seasons, even if there are no episodes (left join)
        .leftJoinAndSelect("season.episodes", "episode")
        // add a where clause to filter series based on episode titles
        .where("episode.title LIKE :title", {
          title: `%${title.trim().toLowerCase()}%`,
        })
        // execute the query and get the results as an array of SerieEntity
        // getMany() executes the built query and returns the matching series
        // getMany() allows us to retrieve multiple records that match the criteria
        .getMany()
    );
  }

  async searchTvShows(title: string): Promise<TvShowEntity[]> {
    return this.tvShowRepo.find({
      where: { title: Like(`%${title.trim().toLowerCase()}%`) },
      relations: [
        "seasonTvShowEntities",
        "seasonTvShowEntities.episodeTvShowEntities",
      ],
    });
  }

  // global search method to search across all video types

  async searchAllVideosByTitle(
    // title parameter of type string
    title: string
    // returns a promise that resolves to an array of various entity types
  ): Promise<(DocumentaryEntity | FilmEntity | SerieEntity | TvShowEntity)[]> {
    // trim and convert the title to lowercase for consistent searching
    const searchedTitle = title.trim().toLowerCase();
    // perform searches for each video type concurrently using Promise.all
    // Promise.all takes an array of promises and returns a single promise
    // that resolves when all of the input promises have resolved
    const [films, documentaries, series, tvShows] = await Promise.all([
      // this calls each search method with the processed title
      this.searchFilms(searchedTitle),
      this.searchDocumentaries(searchedTitle),
      this.searchSeries(searchedTitle),
      this.searchTvShows(searchedTitle),
    ]);
    // combine all results into a single array and return it
    return [...films, ...documentaries, ...series, ...tvShows];
  }
}
