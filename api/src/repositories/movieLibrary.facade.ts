// import necessary modules and entities
// from TypeORM and entity definitions
import { Repository, Like } from "typeorm";
import { DocumentaryEntity } from "../entities/DocumentaryEntity";
import { FilmEntity } from "../entities/FilmEntity";
import { SerieEntity } from "../entities/SerieEntity";
import { SeasonEntity } from "../entities/SeasonEntity";
import { EpisodeEntity } from "../entities/EpisodeEntity";
import { TvShowEntity } from "../entities/TvShowEntity";
import { SeasonTvShowEntity } from "../entities/SeasonTvShowEntity";
import { DocumentaryRepository } from "./documentary.repository";

import {
  generateFilmId,
  generateSerieId,
  generateTvShowId,
} from "../utils/generateIds";
import { EpisodeTvShowEntity } from "../entities/EpisodeTvShowEntity";

type MovieLibraryDeps = {
  documentaryRepo: DocumentaryRepository;
  filmRepo: Repository<FilmEntity>;
  serieRepo: Repository<SerieEntity>;
  tvShowRepo: Repository<TvShowEntity>;
  episodeRepo: Repository<EpisodeEntity>;
  seasonRepo: Repository<SeasonEntity>;
  episodeTvShowRepo: Repository<EpisodeTvShowEntity>;
  seasonTvShowRepo: Repository<SeasonTvShowEntity>;
};

// MovieLibraryRepository class definition
export class MovieLibraryRepository {
  // constructor to initialize repositories for each entity
  constructor(
    private readonly documentaryRepo: DocumentaryRepository,
    private readonly filmRepo: Repository<FilmEntity>,
    private readonly serieRepo: Repository<SerieEntity>,
    private readonly tvShowRepo: Repository<TvShowEntity>,
    private readonly episodeRepo: Repository<EpisodeEntity>,
    private readonly seasonRepo: Repository<SeasonEntity>,
    private readonly episodeTvShowRepo: Repository<EpisodeTvShowEntity>,
    private readonly seasonTvShowRepo: Repository<SeasonTvShowEntity>,
  ) {}

  // method to get all films
  async getAllFilms(): Promise<FilmEntity[]> {
    return this.filmRepo.find();
  }

  // method to get all documentaries
  async getAllDocumentaries(): Promise<DocumentaryEntity[]> {
    return this.documentaryRepo.getAllDocumentaries();
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
    const documentaries = await this.documentaryRepo.getAllDocumentaries();
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
    return this.documentaryRepo.getDocumentaryById(id);
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

  // Method to get episodes by serie ID
  async getEpisodesBySerieId(serieId: string): Promise<EpisodeEntity[]> {
    // find method to retrieve episodes associated with a specific serie ID
    return this.episodeRepo.find({
      where: {
        season: {
          serie: {
            id: serieId,
          },
        },
      },
      relations: {
        season: {
          serie: true,
        },
      },
      // select specific fields to return for each episode
      select: {
        id: true,
        title: true,
        duration: true,
        episodeNumber: true,
        director: true,
        season: { id: true, seasonNumber: true },
      },
      // order episodes by season number and episode number in ascending order
      order: {
        season: {
          seasonNumber: "ASC",
        },
        episodeNumber: "ASC",
      },
    });
  }

  // Methode to get episodes by tv show ID
  async getEpisodesByTvShowId(
    tvShowId: string,
  ): Promise<EpisodeTvShowEntity[]> {
    return this.episodeTvShowRepo.find({
      where: {
        seasonTvShow: {
          tvShow: {
            id: tvShowId,
          },
        },
      },
      relations: {
        seasonTvShow: {
          tvShow: true,
        },
      },
      select: {
        id: true,
        episodeNumber: true,
        duration: true,
        seasonTvShow: {
          id: true,
          seasonNumber: true,
        },
      },

      order: {
        seasonTvShow: {
          seasonNumber: "ASC",
        },
        episodeNumber: "ASC",
      },
    });
  }

  // Method to filter films by genre
  async getFilmsByGenre(genre: string) {
    return this.filmRepo.find({
      where: { genre: Like(`%${genre.trim().toLowerCase()}%`) },
    });
  }

  // Method to filter documentaries by genre
  async getDocumentariesByGenre(genre: string) {
    return this.documentaryRepo.getDocumentariesByGenre(genre);
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
  async createDocumentary(data: Partial<DocumentaryEntity>) {
    return this.documentaryRepo.createDocumentary(data);
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

  // method to add a new season to an existing serie
  // takes the serie ID and a partial SeasonEntity object as input
  async addSeasonToSerie(serieId: string, seasonData: Partial<SeasonEntity>) {
    // find the serie by its ID, including its existing seasons
    const serie = await this.serieRepo.findOne({
      where: { id: serieId },
      relations: { seasonEntities: true },
    });

    // if the serie does not exist, throw an error
    if (!serie) {
      throw Object.assign(new Error("Serie not found"), {
        code: "SERIE_NOT_FOUND",
      });
    }

    // create a new season instance associated with the serie
    const newSeason = this.seasonRepo.create({
      ...seasonData,
      serie: serie,
    });

    // save the updated serie (with the new season) back to the database
    await this.seasonRepo.save(newSeason);

    // return the updated serie with its seasons and episodes
    return this.serieRepo.findOneOrFail({
      where: { id: serie.id! },
      relations: {
        seasonEntities: {
          episodes: true,
        },
      },
      //  order seasons and episodes by their respective numbers in ascending order
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

  // methode to add a new season to an existing tv show
  async addSeasonToTvShow(
    tvShowId: string,
    seasonData: Partial<SeasonTvShowEntity>,
  ) {
    const tvShow = await this.tvShowRepo.findOne({
      where: { id: tvShowId },
      relations: { seasonTvShowEntities: true },
    });

    if (!tvShow) {
      throw Object.assign(new Error("Tv show not found"), {
        code: "TV_SHOW_NOT_FOUND",
      });
    }

    const newTvShowSeason = this.seasonTvShowRepo.create({
      ...seasonData,
      tvShow: tvShow,
    });

    await this.seasonTvShowRepo.save(newTvShowSeason);

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
    return this.documentaryRepo.updateDocumentary(id, data);
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

  // method to delete a film by ID
  async deleteFilm(id: string): Promise<void> {
    const result = await this.filmRepo.delete(id);
    if (!result.affected || result.affected === 0) {
      throw Object.assign(new Error("Film not found"), {
        code: "FILM_NOT_FOUND",
      });
    }
  }

  // method to delete a documentary by ID
  async deleteDocumentary(id: string): Promise<void> {
    return this.documentaryRepo.deleteDocumentary(id);
  }

  // method to delete a serie by ID
  async deleteSerie(id: string): Promise<void> {
    const result = await this.serieRepo.delete(id);
    if (!result.affected || result.affected === 0) {
      throw Object.assign(new Error("Serie not found"), {
        code: "SERIE_NOT_FOUND",
      });
    }
  }

  // method to delete a tv show by ID
  async deleteTvShow(id: string): Promise<void> {
    const result = await this.tvShowRepo.delete(id);
    if (!result.affected || result.affected === 0) {
      throw Object.assign(new Error("Tv show not found"), {
        code: "TV_SHOW_NOT_FOUND",
      });
    }
  }

  // method to search films by title
  async searchFilms(title: string): Promise<FilmEntity[]> {
    return this.filmRepo.find({
      // where clause to filter films by title
      // this performs a search in the database for films matching the given title
      where: { title: Like(`%${title.trim().toLowerCase()}%`) },
    });
  }

  // method to search documentaries by title
  async searchDocumentaries(title: string): Promise<DocumentaryEntity[]> {
    return this.documentaryRepo.searchDocumentariesByTitle(title);
  }

  async searchSeries(title: string): Promise<SerieEntity[]> {
    return this.serieRepo.find({
      where: { title: Like(`%${title.trim().toLowerCase()}%`) },
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

  // methode to search epidode series by title
  async searchEpisodesInSeriesByTitle(title: string) {
    return this.episodeRepo.find({
      where: { title: Like(`%${title.trim().toLowerCase()}%`) },
      relations: {
        season: {
          serie: true,
        },
      },
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

  // global search method to search across all video types

  async searchAllVideosByTitle(
    // title parameter of type string
    title: string,
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
      this.documentaryRepo.searchDocumentariesByTitle(searchedTitle),
      this.searchSeries(searchedTitle),
      this.searchTvShows(searchedTitle),
    ]);
    // combine all results into a single array and return it
    return [...films, ...documentaries, ...series, ...tvShows];
  }
}
