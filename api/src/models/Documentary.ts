import { Video } from "./Video";

export class Documentary extends Video {
  constructor(
    id: string,
    title: string,
    genre: string,
    image: string,
    duration: number,
    releaseDate: string,
    public subject: string
  ) {
    super(id, title, genre, image, duration, releaseDate);
  }

  play(): void {
    console.log(
      `Lecture du documentaire : ${this.title} sur le sujet : ${this.subject}`
    );
  }
}
