// description: Utility function to create a TvShow instance from raw data

// Imports of necessary models to construct the TvShow object
import { EpisodeTvShow, SeasonTvShow, TvShow } from "../../models/TvShow";

// Function to create a TvShow instance
export function createTvShow(
  
  // Input data structure for creating a TvShow
  // with nested Seasons and Episodes
  // The data parameter includes all necessary fields
  data: {
  id: string;
  title: string;
  genre: string;
  image: string;
  director: string;
  // Array of season data, each containing episodes
  // Each season has a year, number, TV host, and list of episodes
  // Each episode has a number and duration
  seasonTvShowEntities: {
    seasonYear: number;
    seasonNumber: number;
    tvHost: string;
    // Array of episodes in the season
    episodeTvShowEntities: {
      episodeNumber: number;
      duration: number;
    }[];
  }[];
  // Return type is a TvShow instance
  // which includes nested Seasons and Episodes
}): TvShow {
  // Map through the season data to create SeasonTvShow instances
  // Each SeasonTvShow contains its respective EpisodeTvShow instances
  const season = data.seasonTvShowEntities.map(
    ({ seasonYear, seasonNumber, tvHost, episodeTvShowEntities }) => {
      // Map through the episodes to create EpisodeTvShow instances
      // Each EpisodeTvShow is constructed with its respective properties
      const episodesInstance = episodeTvShowEntities.map(
        (ep) => new EpisodeTvShow(ep.episodeNumber, ep.duration)
      );
      // Return a new SeasonTvShow instance with the constructed episodes
      // and other properties from the input data
      return new SeasonTvShow(
        seasonYear,
        seasonNumber,
        tvHost,
        episodesInstance
      );
    }
  );
  // Return a new TvShow instance with the constructed seasons
  // and other properties from the input data
  return new TvShow(
    data.id,
    data.title,
    data.genre,
    data.image,
    data.director,
    season
  );
}
