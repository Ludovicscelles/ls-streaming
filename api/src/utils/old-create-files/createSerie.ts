// Description: Utility function to create a Serie instance with nested Seasons and Episodes.

// Imports of necessary models to construct the Serie object
import { Episode, Season, Serie } from "../../models/Serie";

// Function to create a Serie instance
export function createSerie(
  // Input data structure for creating a Serie
  // with nested Seasons and Episodes
  // The data parameter includes all necessary fields
  data: {
    id: string;
    title: string;
    genre: string;
    image: string;

    // Array of season data, each containing episodes
    // Each season has a year, number, and list of episodes
    // Each episode has a title, number, duration, and director
    seasonData: {
      seasonYear: number;
      seasonNumber: number;
      episodes: {
        title: string;
        numberEpisode: number;
        duration: number;
        director: string;
      }[];
    }[];

    // Return type is a Serie instance
    // which includes nested Seasons and Episodes
  }
): Serie {
  // Map through the season data to create Season instances
  // Each Season contains its respective Episode instances
  const season = data.seasonData.map(
    ({ seasonYear, seasonNumber, episodes }) => {
      // Map through the episodes to create Episode instances
      // Each Episode is constructed with its respective properties
      const episodesInstance = episodes.map(
        (ep) =>
          new Episode(ep.title, ep.numberEpisode, ep.duration, ep.director)
      );
      // Return a new Season instance with the constructed episodes
      return new Season(seasonYear, seasonNumber, episodesInstance);
    }
  );
  // Return a new Serie instance with the constructed seasons
  // and other properties from the input data
  return new Serie(data.id, data.title, data.genre, data.image, season);
}
