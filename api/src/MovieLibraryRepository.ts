// import necessary modules and entities
// from TypeORM and entity definitions
import { Repository, Like, Code } from "typeorm";
import { DocumentaryEntity } from "./entities/DocumentaryEntity";
import { FilmEntity } from "./entities/FilmEntity";
import { SerieEntity } from "./entities/SerieEntity";
import { EpisodeEntity } from "./entities/EpisodeEntity";
import { TvShowEntity } from "./entities/TvShowEntity";

import {
  generateFilmId,
  generateDocumentaryId,
  generateSerieId,
  generateTvShowId,
} from "./utils/generateIds";

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
      relations: {
        seasonEntities: {
          episodes: true,
        },
      },
      order: {
        id: "ASC",
        seasonEntities: {
          seasonNumber: "ASC",
          episodes: {
            episodeNumber: "ASC",
          },
        },
      },
    });
  }

  // method to get all TV shows with their seasons and episodes
  async getAllTvShows(): Promise<TvShowEntity[]> {
    return this.tvShowRepo.find({
      relations: {
        seasonTvShowEntities: {
          episodeTvShowEntities: true,
        },
      },
      order: {
        id: "ASC",
        seasonTvShowEntities: {
          seasonNumber: "ASC",
          episodeTvShowEntities: {
            episodeNumber: "ASC",
          },
        },
      },
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
  // includes related seasons and episodes, ordered by season and episode number
  async getSerieById(id: string): Promise<SerieEntity | null> {
    // findOne method to retrieve a single serie by its ID
    return this.serieRepo.findOne({
      where: { id },
      // relations to include related seasons and episodes
      relations: {
        seasonEntities: {
          episodes: true,
        },
      },
      order: {
        // ordering seasons by seasonNumber in ascending order
        // and episodes within each season by episodeNumber in ascending order
        seasonEntities: {
          seasonNumber: "ASC",
          episodes: {
            episodeNumber: "ASC",
          },
        },
      },
    });
  }

  // Method to get tv-show by ID
  async getTvShowById(id: string): Promise<TvShowEntity | null> {
    return this.tvShowRepo.findOne({
      where: { id },
      relations: {
        seasonTvShowEntities: {
          episodeTvShowEntities: true,
        },
      },
      order: {
        seasonTvShowEntities: {
          seasonNumber: "ASC",
          episodeTvShowEntities: {
            episodeNumber: "ASC",
          },
        },
      },
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
      relations: {
        seasonEntities: {
          episodes: true,
        },
      },
      order: {
        seasonEntities: {
          seasonNumber: "ASC",
          episodes: {
            episodeNumber: "ASC",
          },
        },
      },
    });
  }

  // Method to filter tv shows by genre
  async getTvShowsByGenre(genre: string) {
    return this.tvShowRepo.find({
      where: { genre: Like(`%${genre.trim().toLowerCase()}%`) },
      relations: {
        seasonTvShowEntities: {
          episodeTvShowEntities: true,
        },
      },
      order: {
        seasonTvShowEntities: {
          seasonNumber: "ASC",
          episodeTvShowEntities: {
            episodeNumber: "ASC",
          },
        },
      },
    });
  }

  // method to create a new film
  async createFilm(data: Partial<FilmEntity>) {
    const id = await generateFilmId(this.filmRepo);

    const film = this.filmRepo.create({ ...data, id });
    await this.filmRepo.insert(film);
    return this.filmRepo.findOneByOrFail({ id: film.id! });
  }

  // method to create a new documentary
  // takes a partial DocumentaryEntity object as input data
  async createDocumentary(data: Partial<DocumentaryEntity>) {
    const id = await generateDocumentaryId(this.documentaryRepo);
    // create a new documentary instance using the repository's create method
    const documentary = this.documentaryRepo.create({ ...data, id });
    // insert the new documentary into the database
    await this.documentaryRepo.insert(documentary);
    // retrieve and return the newly created documentary by its ID
    // this ensures we return the complete entity as stored in the database
    return this.documentaryRepo.findOneByOrFail({ id: documentary.id! });
  }

  // method to create a new serie
  async createSerie(data: Partial<SerieEntity>) {
    const id = await generateSerieId(this.serieRepo);

    const serie = this.serieRepo.create({ ...data, id });
    await this.serieRepo.save(serie);
    return this.serieRepo.findOneOrFail({
      where: { id: serie.id! },
      relations: {
        seasonEntities: {
          episodes: true,
        },
      },
      order: {
        seasonEntities: {
          seasonNumber: "ASC",
          episodes: {
            episodeNumber: "ASC",
          },
        },
      },
    });
  }

  // methode to create a new tv show
  async createTvShow(data: Partial<TvShowEntity>) {
    const id = await generateTvShowId(this.tvShowRepo);

    const tvShow = this.tvShowRepo.create({ ...data, id });
    await this.tvShowRepo.save(tvShow);
    return this.tvShowRepo.findOneOrFail({
      where: { id: tvShow.id! },
      relations: {
        seasonTvShowEntities: {
          episodeTvShowEntities: true,
        },
      },
      order: {
        seasonTvShowEntities: {
          seasonNumber: "ASC",
          episodeTvShowEntities: {
            episodeNumber: "ASC",
          },
        },
      },
    });
  }

  // method to update a film
  // takes the film ID and a partial FilmEntity object with updated data
  async updateFilm(id: string, data: Partial<FilmEntity>) {
    // create a safeData object to hold only the fields that are allowed to be updated
    // this prevents accidental overwriting of the id field
    // by excluding id from the data object and other unwanted fields
    // we ensure that only title, genre, image, duration, releaseDate, and director can be updated
    // this is a common practice to maintain data integrity
    const safeData: Partial<FilmEntity> = {};

    // Only copy allowed fields to safeData
    if (data.title !== undefined) safeData.title = data.title;
    if (data.genre !== undefined) safeData.genre = data.genre;
    if (data.image !== undefined) safeData.image = data.image;
    if (data.duration !== undefined) safeData.duration = data.duration;
    if (data.releaseDate !== undefined) safeData.releaseDate = data.releaseDate;
    if (data.director !== undefined) safeData.director = data.director;

    // if no valid fields are provided for update, throw an error
    // this prevents unnecessary database operations
    if (Object.keys(safeData).length === 0) {
      throw Object.assign(new Error("No valid update fields provided"), {
        code: "NO_VALID_FIELDS",
      });
    }

    // preload the existing film entity with the new data
    const film = await this.filmRepo.preload({ id, ...safeData });

    // if the film does not exist, throw an error
    if (!film) {
      throw Object.assign(new Error("Film not found"), {
        code: "FILM_NOT_FOUND",
      });
    }
    // save the updated film entity back to the database
    return this.filmRepo.save(film);
  }

  // Method to update a documentary
  async updateDocumentary(id: string, data: Partial<DocumentaryEntity>) {
    const safeData: Partial<DocumentaryEntity> = {};

    if (data.title !== undefined) safeData.title = data.title;
    if (data.genre !== undefined) safeData.genre = data.genre;
    if (data.image !== undefined) safeData.image = data.image;
    if (data.duration !== undefined) safeData.duration = data.duration;
    if (data.releaseDate !== undefined) safeData.releaseDate = data.releaseDate;
    if (data.subject !== undefined) safeData.subject = data.subject;

    if (Object.keys(safeData).length === 0) {
      throw Object.assign(new Error("No valid update fields provided"), {
        code: "NO_VALID_FIELDS",
      });
    }
    const documentary = await this.documentaryRepo.preload({ id, ...safeData });

    if (!documentary) {
      throw Object.assign(new Error("Documentary not found"), {
        code: "DOCUMENTARY_NOT_FOUND",
      });
    }

    return this.documentaryRepo.save(documentary);
  }

  // Method to update a serie
  async updateSerie(id: string, data: Partial<SerieEntity>) {
    // create a safeData object to hold only the fields that are allowed to be updated
    // this prevents accidental overwriting of the id field
    // by excluding id from the data object and other unwanted fields
    // we ensure that only title, genre, and image can be updated
    // this is a common practice to maintain data integrity
    // for this reason, we manually construct the safeData object here
    const safeData: Partial<SerieEntity> = {};

    // Only copy allowed fields to safeData
    if (data.title !== undefined) safeData.title = data.title;
    if (data.genre !== undefined) safeData.genre = data.genre;
    if (data.image !== undefined) safeData.image = data.image;

    // if no valid fields are provided for update, throw an error
    // this prevents unnecessary database operations
    if (Object.keys(safeData).length === 0) {
      throw Object.assign(new Error("No valid update fields provided"), {
        code: "NO_VALID_FIELDS",
      });
    }

    // preload the existing serie entity with the new data
    const serie = await this.serieRepo.preload({ id, ...safeData });

    // if the serie does not exist, throw an error
    if (!serie) {
      throw Object.assign(new Error("Serie not found"), {
        code: "SERIE_NOT_FOUND",
      });
    }
    // save the updated serie entity back to the database
    return this.serieRepo.save(serie);
  }

  // methode to update a tv show

  async updateTvShow(id: string, data: Partial<TvShowEntity>) {
    const safeData: Partial<TvShowEntity> = {};

    if (data.title !== undefined) safeData.title = data.title;
    if (data.genre !== undefined) safeData.genre = data.genre;
    if (data.image !== undefined) safeData.image = data.image;

    if (Object.keys(safeData).length === 0) {
      throw Object.assign(new Error("No valid update fields provided"), {
        code: "NO_VALID_FIELDS",
      });
    }

    const tvShow = await this.tvShowRepo.preload({ id, ...safeData });

    if (!tvShow) {
      throw Object.assign(new Error("Tv show not found"), {
        code: "TV_SHOW_NOT_FOUND",
      });
    }

    return this.tvShowRepo.save(tvShow);
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
