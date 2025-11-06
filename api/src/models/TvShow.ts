import { Video } from "./Video";

export class TvShow extends Video {
  constructor(
    id: string,
    title: string,
    genre: string,
    image: string,
    public director: string,
    public season: SeasonTvShow[]
  ) {
    super(id, title, genre, image);
  }

  play(): void {
    console.log(`Lecture de l'émission ${this.title}`);
  }
}

export class SeasonTvShow {
  constructor(
    public year: number,
    public number: number,
    public TVHost: string,
    public episodes: EpisodeTvShow[]
  ) {}
}

export class EpisodeTvShow {
  constructor(
    public number: number,
    public duration: number
  ) {}
  play() {
    console.log(`Lecture de l'épisode ${this.number} `);
  }
}
