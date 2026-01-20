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
import { FilmRepository } from "./film.repository";
import { SerieRepository } from "./serie.repository";

import { generateSerieId, generateTvShowId } from "../utils/generateIds";
import { EpisodeTvShowEntity } from "../entities/EpisodeTvShowEntity";

type MovieLibraryDeps = {
  documentaryRepo: DocumentaryRepository;
  filmRepo: FilmRepository;
  serieRepo: SerieRepository;
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
    private readonly filmRepo: FilmRepository,
    private readonly serieRepo: SerieRepository,
    private readonly tvShowRepo: Repository<TvShowEntity>,
    private readonly episodeTvShowRepo: Repository<EpisodeTvShowEntity>,
    private readonly seasonTvShowRepo: Repository<SeasonTvShowEntity>,
  ) {}

  // method to get all films
  async getAllFilms(): Promise<FilmEntity[]> {
    return this.filmRepo.getAllFilms();
  }

  // method to get all documentaries
  async getAllDocumentaries(): Promise<DocumentaryEntity[]> {
    return this.documentaryRepo.getAllDocumentaries();
  }

  // method to get all series with their seasons and episodes
  async getAllSeries(): Promise<SerieEntity[]> {
    return this.serieRepo.getAllSeries();
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
    const films = await this.filmRepo.getAllFilms();
    const series = await this.serieRepo.getAllSeries();
    const tvShows = await this.getAllTvShows();

    // concatenate all lists into a single array and return it
    return [...documentaries, ...films, ...series, ...tvShows];
  }

  // Method to get film by ID
  async getFilmById(id: string): Promise<FilmEntity | null> {
    return this.filmRepo.getFilmById(id);
  }

  // Method to get documentary by ID
  async getDocumentaryById(id: string): Promise<DocumentaryEntity | null> {
    return this.documentaryRepo.getDocumentaryById(id);
  }

  // Method to get serie by ID
  async getSerieById(id: string): Promise<SerieEntity | null> {
    return this.serieRepo.getSerieById(id);
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
    return this.serieRepo.getEpisodesBySerieId(serieId);
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
    return this.filmRepo.getFilmsByGenre(genre);
  }

  // Method to filter documentaries by genre
  async getDocumentariesByGenre(genre: string) {
    return this.documentaryRepo.getDocumentariesByGenre(genre);
  }

  // Method to filter series by genre
  async getSeriesByGenre(genre: string) {
    return this.serieRepo.getSeriesByGenre(genre);
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
    return this.filmRepo.createFilm(data);
  }

  // method to create a new documentary
  async createDocumentary(data: Partial<DocumentaryEntity>) {
    return this.documentaryRepo.createDocumentary(data);
  }

  // method to create a new serie
  async createSerie(data: Partial<SerieEntity>) {
    return this.serieRepo.createSerie(data);
  }

  // method to add a new season to an existing serie
  async addSeasonToSerie(serieId: string, seasonData: Partial<SeasonEntity>) {
    return this.serieRepo.addSeasonToSerie(serieId, seasonData);
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
  async updateFilm(id: string, data: Partial<FilmEntity>) {
    return this.filmRepo.updateFilm(id, data);
  }

  // Method to update a documentary
  async updateDocumentary(id: string, data: Partial<DocumentaryEntity>) {
    return this.documentaryRepo.updateDocumentary(id, data);
  }

  // Method to update a serie
  async updateSerie(id: string, data: Partial<SerieEntity>) {
    return this.serieRepo.updateSerie(id, data);
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
    return this.filmRepo.deleteFilm(id);
  }

  // method to delete a documentary by ID
  async deleteDocumentary(id: string): Promise<void> {
    return this.documentaryRepo.deleteDocumentary(id);
  }

  // method to delete a serie by ID
  async deleteSerie(id: string): Promise<void> {
    return this.serieRepo.deleteSerie(id);
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
    return this.filmRepo.searchFilmsByTitle(title);
  }

  // method to search documentaries by title
  async searchDocumentaries(title: string): Promise<DocumentaryEntity[]> {
    return this.documentaryRepo.searchDocumentariesByTitle(title);
  }

  // method to search series by title
  async searchSeries(title: string): Promise<SerieEntity[]> {
    return this.serieRepo.searchSeriesByTitle(title);
  }

  // method to search episode series by title
  async searchEpisodesInSeriesByTitle(title: string) {
    return this.serieRepo.searchEpisodesInSeriesByTitle(title);
  }

  // method to search episode series by title with query builder
  async searchSerieByEpisodeTitle(title: string): Promise<SerieEntity[]> {
    return this.serieRepo.searchSerieByEpisodeTitle(title);
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
