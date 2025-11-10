import { Video } from "./models/Video";
import { Episode, Season, Serie } from "./models/Serie";
import { TvShow } from "./models/TvShow";

export class MovieLibrary {
  private videos: Video[] = [];
  private tvShows: TvShow[] = [];
  private series: Serie[] = [];

  // Getter for all videos
  getAll(): Video[] {
    return this.videos;
  }

  // Getter for one video by ID
  getById(id: string): Video | undefined {
    return this.videos.find((video) => video.id === id);
  }

  // Search videos by title
  search(videoTitle: string): Video[] {
    const searchTerm = videoTitle.toLowerCase();
    return this.videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm)
    );
  }

  // Search series by title
  searchSeries(serieTitle: string): Serie[] {
    const searchTerm = serieTitle.toLowerCase();
    return this.series.filter((serie) =>
      serie.title.toLowerCase().includes(searchTerm)
    );
  }

  // Search TV shows by title
  searchTvShows(tvShowTitle: string): TvShow[] {
    const searchTerm = tvShowTitle.toLowerCase();
    return this.tvShows.filter((tvShow) =>
      tvShow.title.toLowerCase().includes(searchTerm)
    );
  }

  // Search in all video types
  searchAll(videoTitle: string): { type: string; videoTitle: string }[] {
    const searchTerm = videoTitle.toLowerCase();
    const match: { type: string; videoTitle: string }[] = [];

    for (const video of this.videos) {
      if (video.title.toLowerCase().includes(searchTerm)) {
        match.push({ type: video.constructor.name, videoTitle: video.title });
      }
    }
    for (const serie of this.series) {
      if (serie.title.toLowerCase().includes(searchTerm)) {
        match.push({ type: "Serie", videoTitle: serie.title });
      }
    }
    for (const tvShow of this.tvShows) {
      if (tvShow.title.toLowerCase().includes(searchTerm)) {
        match.push({ type: "TvShow", videoTitle: tvShow.title });
      }
    }

    return match;
  }
}
