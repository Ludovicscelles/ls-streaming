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

  // Getter for all documentaries
  getAllDocumentaries(): Video[] {
    return this.videos.filter(
      (video) => video.constructor.name === "Documentary"
    );
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

  // search episode of a series

  searchEpisodeSeries(
    episodeTitle: string
  ): { episode: Episode; season: Season; serie: Serie }[] {
    const searchTerm = episodeTitle.toLowerCase();
    const results: { episode: Episode; season: Season; serie: Serie }[] = [];
    for (const serie of this.series) {
      for (const season of serie.season) {
        for (const episode of season.episodes) {
          if (episode.title.toLowerCase().includes(searchTerm)) {
            results.push({ episode, season, serie });
          }
        }
      }
    }
    return results;
  }

  // add a video to the library
  add(video: Video) {
    this.videos.push(video);
  }

  // add a serie to the library
  addSerie(serie: Serie): void {
    this.series.push(serie);
    this.add(serie);
  }

  // add a tv show to the library
  addTvShow(tvShow: TvShow): void {
    this.tvShows.push(tvShow);
    this.add(tvShow);
  }

  // update video title by id
  setTitle(videoId: string, newTitle: string): boolean {
    const video = this.videos.find((video) => video.id === videoId);
    if (video) {
      video.title = newTitle;
      return true;
    }
    return false;
  }

  // update a video object by id
  setVideo(VideoId: string, update: Partial<Video>): boolean {
    const video = this.videos.find((video) => video.id === VideoId);
    if (!video) {
      return false;
    }
    Object.assign(video, update);
    return true;
  }

  // delete a video by id
  delete(videoId: string): boolean {
    const initialLength = this.videos.length;
    this.videos = this.videos.filter((video) => video.id !== videoId);
    return this.videos.length < initialLength;
  }
}
