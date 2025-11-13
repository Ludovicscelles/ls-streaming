import { Video } from "./Video";  

export class Serie extends Video {
  constructor(
    id: string,
    title: string,
    genre: string,
    image: string,
    public season: Season[]
  ) {
    super(id, title, genre, image,);
  }

  play(): void {
    console.log(`Lecture de la série : ${this.title}`);
  }
}

export class Season {
  constructor (
    public year: number,
    public number: number,
    public episodes: Episode[]  
  ) {}
}

export class Episode {
  constructor (
    public title: string,
    public number: number,
    public duration: number,
    public director: string,
  ) {}
  play() {
    console.log(`Lecture de l'épisode ${this.number} : ${this.title}`);   
  }
}