export abstract class Video {
  constructor(
    public id: string,
    public title: string,
    public genre: string,
    public image?: string,
    public duration?: number,
    public releaseDate?: string
  ) {}

  abstract play(): void;
}
