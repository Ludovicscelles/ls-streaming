import { Video } from "./Video";

export class Film extends Video {
  constructor(
    id: string,
    title: string,
    genre: string,
    image: string,
    duration: number,
    releaseDate: string,
    public director: string
  ) {
    super(id, title, genre, image, duration, releaseDate);
  }

  play(): void {
    console.log(`Lecture du film : ${this.title} réalisé par ${this.director}`);
  }
}
