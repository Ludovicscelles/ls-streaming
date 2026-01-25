import { Repository, Like } from "typeorm";
import { TvShowEntity } from "../entities/tv-show.entity";
import { TvShowSeasonEntity } from "../entities/tv-show-season.entity";
import { TvShowEpisodeEntity } from "../entities/tv-show-episode.entity";

import { generateTvShowId } from "../utils/generateIds";

export class TvShowRepository {
  constructor(
    private readonly tvShowRepo: Repository<TvShowEntity>,
    private readonly episodeTvShowRepo: Repository<TvShowEpisodeEntity>,
    private readonly seasonTvShowRepo: Repository<TvShowSeasonEntity>,
  ) {}

  // Method to get all TV shows with their seasons and episodes
  async getAllTvShows(): Promise<TvShowEntity[]> {
    // relations option is used to load related entities (seasons and episodes) along with the TV shows
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

  // Method to get a TV show by its ID
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

  // Method to get episodes by TV show ID
  async getEpisodesByTvShowId(
    tvShowId: string,
  ): Promise<TvShowEpisodeEntity[]> {
    return this.episodeTvShowRepo.find({
      where: {
        seasonTvShow: {
          tvShow: { id: tvShowId },
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

  // Method to filter tv shows by genre
  async filterTvShowsByGenre(genre: string): Promise<TvShowEntity[]> {
    return this.tvShowRepo.find({
      where: {
        genre: Like(`%${genre.trim().toLocaleLowerCase()}%`),
      },
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

  // Method to create and save a new TV show
  async createTvShow(tvShowData: Partial<TvShowEntity>): Promise<TvShowEntity> {
    const id = await generateTvShowId(this.tvShowRepo);
    const newTvShow = this.tvShowRepo.create({ id, ...tvShowData });
    await this.tvShowRepo.save(newTvShow);
    return this.tvShowRepo.findOneOrFail({
      where: { id: newTvShow.id! },
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

  // Method to add a new season to an existing TV show
  async addSeasonToTvShow(
    tvShowId: string,
    seasonData: Partial<TvShowSeasonEntity>,
  ): Promise<TvShowEntity> {
    const tvShow = await this.tvShowRepo.findOne({
      where: { id: tvShowId },
      relations: {
        seasonTvShowEntities: true,
      },
    });
    if (!tvShow) {
      throw Object.assign(new Error("TV Show not found"), {
        code: "TV_SHOW_NOT_FOUND",
      });
    }

    const newTvShowSeason = this.seasonTvShowRepo.create({
      ...seasonData,
      tvShow,
    });
    await this.seasonTvShowRepo.save(newTvShowSeason);

    return this.tvShowRepo.findOneOrFail({
      where: { id: tvShowId! },
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

  // Method to update a TV show
  async updateTvShow(
    id: string,
    data: Partial<TvShowEntity>,
  ): Promise<TvShowEntity> {
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
      throw Object.assign(new Error("TV Show not found"), {
        code: "TV_SHOW_NOT_FOUND",
      });
    }

    return this.tvShowRepo.save(tvShow);
  }

  // Method to delete a TV show by its ID
  async deleteTvShow(id: string): Promise<void> {
    const tvShow = await this.tvShowRepo.findOne({
      where: { id },
      relations: { seasonTvShowEntities: { episodeTvShowEntities: true } },
    });

    if (!tvShow) {
      throw Object.assign(new Error("TV Show not found"), {
        code: "TV_SHOW_NOT_FOUND",
      });
    }
    await this.tvShowRepo.remove(tvShow);
  }

  // Method to search TV shows by title
  async searchTvShowsByTitle(title: string): Promise<TvShowEntity[]> {
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
}
