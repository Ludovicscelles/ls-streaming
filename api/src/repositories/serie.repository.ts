import { Repository, Like } from "typeorm";
import { SerieEntity } from "../entities/series.entity";
import { SeasonEntity } from "../entities/series-season.entity";
import { EpisodeEntity } from "../entities/series-episode.entity";

import { generateSerieId } from "../utils/generateIds";

export class SerieRepository {
  constructor(
    private readonly serieRepo: Repository<SerieEntity>,
    private readonly episodeRepo: Repository<EpisodeEntity>,
    private readonly seasonRepo: Repository<SeasonEntity>,
  ) {}

  // Method to get all series with their seasons and episodes
  async getAllSeries(): Promise<SerieEntity[]> {
    // relations option is used to load related entities (seasons and episodes) along with the series
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

  // Method to get a serie by its ID
  // includes related seasons and episodes, ordered by seasonNumber and episodeNumber
  async getSerieById(id: string): Promise<SerieEntity | null> {
    // findOne method to retrieve a single serie by its ID
    return this.serieRepo.findOne({
      where: { id },
      // relations option to include related seasons and episodes
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

  // Methode de get episodes by serie ID
  async getEpisodesBySerieId(serieId: string): Promise<EpisodeEntity[]> {
    // find method to retrieve all episodes associated with a specific serie ID
    return this.episodeRepo.find({
      where: {
        season: {
          serie: { id: serieId },
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
        season: {
          id: true,
          seasonNumber: true,
        },
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

  // Method to filter series by genre
  async getSeriesByGenre(genre: string): Promise<SerieEntity[]> {
    return this.serieRepo.find({
      where: { genre: Like(`%${genre.trim().toLocaleLowerCase()}%`) },
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

  // Method to create a new serie
  async createSerie(data: Partial<SerieEntity>): Promise<SerieEntity> {
    const id = await generateSerieId(this.serieRepo);
    const newSerie = this.serieRepo.create({ id, ...data });
    await this.serieRepo.save(newSerie);
    return this.serieRepo.findOneOrFail({
      where: { id: newSerie.id! },
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

  // Method to add a season to an existing serie.
  // Takes the serie ID and a partial SeasonEntity object as input data.
  async addSeasonToSerie(
    serieId: string,
    seasonData: Partial<SeasonEntity>,
  ): Promise<SerieEntity> {
    // find the serie by its ID, including its existing seasons.
    const serie = await this.serieRepo.findOne({
      where: { id: serieId },
      relations: { seasonEntities: true },
    });

    // If the serie does not exist, throw an error.
    if (!serie) {
      throw Object.assign(new Error("Serie not found"), {
        code: "SERIE_NOT_FOUND",
      });
    }

    // Create a new season instance associated with the found serie.
    const newSeason = this.seasonRepo.create({
      ...seasonData,
      serie: serie,
    });

    // Save the updated serie with the new season to the database.
    await this.seasonRepo.save(newSeason);

    // Return the newly created season.
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

  // Method to update an existing serie
  async updateSerie(id: string, data: Partial<SerieEntity>) {
    // create a safeData object to hold only the fields that are allowed to be updated
    // this prevents accidental overwriting of the id field
    // by excluding id from the data object and other unwanted fields
    // we ensure that only title, genre, and image can be updated
    // this is a common practice to maintain data integrity
    // for this reason, we manually construct the safeData object here
    const safeData: Partial<SerieEntity> = {};

    // Only copy allowed fields if they are defined in the input data
    if (data.title !== undefined) safeData.title = data.title;
    if (data.genre !== undefined) safeData.genre = data.genre;
    if (data.image !== undefined) safeData.image = data.image;

    // If no valid fields are provided for update, throw an error
    // this prevents unnecessary database operations
    if (Object.keys(safeData).length === 0) {
      throw Object.assign(new Error("No valid update fields provided"), {
        code: "NO_VALID_FIELDS",
      });
    }

    // preload the existing serie entity to ensure it exists before updating
    const serie = await this.serieRepo.preload({ id, ...safeData });

    // if the serie does not exist, throw an error indicating that the serie was not found
    if (!serie) {
      throw Object.assign(new Error("Serie not found"), {
        code: "SERIE_NOT_FOUND",
      });
    }

    // save the updated serie data to the database
    return this.serieRepo.save(serie);
  }

  // Method to delete a serie by its ID
  async deleteSerie(id: string): Promise<void> {
    // find the serie by its ID, including its related seasons and episodes
    const serie = await this.serieRepo.findOne({
      where: { id },
      relations: { seasonEntities: { episodes: true } },
    });

    if (!serie) {
      throw Object.assign(new Error("Serie not found"), {
        code: "SERIE_NOT_FOUND",
      });
    }

    // remove the serie from the database
    await this.serieRepo.remove(serie);
  }

  // Method to search series by title
  async searchSeriesByTitle(title: string): Promise<SerieEntity[]> {
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

  // Method to search episode series by title
  async searchEpisodesInSeriesByTitle(title: string): Promise<EpisodeEntity[]> {
    return this.episodeRepo.find({
      where: {
        title: Like(`%${title.trim().toLowerCase()}%`),
      },
      relations: {
        season: {
          serie: true,
        },
      },
    });
  }

  // Method to search series by episode title using QueryBuilder
  // This method searches for series that contain episodes with titles matching the provided title.
  async searchSerieByEpisodeTitle(title: string): Promise<SerieEntity[]> {
    // Using QueryBuilder to construct a more complex query
    return (
      this.serieRepo
        // Create a query builder for the SerieEntity
        .createQueryBuilder("serie")
        // Left join the SeasonEntity related to the serie
        // This allows us to access seasons of the serie, even if there are no seasons (LEFT JOIN)
        .leftJoinAndSelect("serie.seasonEntities", "season")
        // Left join the EpisodeEntity related to the season
        // This allows us to access episodes of each season, even if there are no episodes (LEFT JOIN)
        .leftJoinAndSelect("season.episodes", "episode")
        // Add a WHERE clause to filter episodes by title (case-insensitive)
        .where("LOWER(episode.title) LIKE :title", {
          title: `%${title.trim().toLowerCase()}%`,
        })
        // Order the results by season number and episode number in ascending order
        .orderBy("season.seasonNumber", "ASC")
        .addOrderBy("episode.episodeNumber", "ASC")
        // Execute the query and return the results as an array of SerieEntity
        // getMany() executes the query and retrieves all matching records
        // getMany() allows us to get multiple series that match the criteria
        .getMany()
    );
  }
}
