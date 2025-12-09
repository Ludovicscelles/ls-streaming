
// import necessary modules and entities
// from TypeORM and entity definitions
import { Repository } from "typeorm";
import { DocumentaryEntity } from "./entities/DocumentaryEntity";
import { FilmEntity } from "./entities/FilmEntity";
import { SerieEntity } from "./entities/SerieEntity";
import { TvShowEntity } from "./entities/TvShowEntity";

// MovieLibraryRepository class definition
export class MovieLibraryRepository {
  // constructor to initialize repositories for each entity
  constructor(
    private documentaryRepo: Repository<DocumentaryEntity>,
    private filmRepo: Repository<FilmEntity>,
    private serieRepo: Repository<SerieEntity>,
    private tvShowRepo: Repository<TvShowEntity>
  ) {}
  
  // method to get all documentaries
  // async means it returns a promise and that function is asynchronous
  // Promise<DocumentaryEntity[]> indicates the return type
  // which is an array of DocumentaryEntity
  async getAllDocumentaries(): Promise<DocumentaryEntity[]> {
    // use the repository to find and return all documentaries
    // this signifies that we are calling the find method on the documentaryRepo
    // the find() method fetches all records from the database table
    return this.documentaryRepo.find();
  }

  async getAllFilms(): Promise<FilmEntity[]> {
    return this.filmRepo.find();
  }

  async getAllSeries(): Promise<SerieEntity[]> {
    // relations option is used to specify related entities to be loaded
    // here, we are loading seasons and episodes related to each series
    return this.serieRepo.find({ relations: ["seasons", "seasons.episodes"] });
  }

  async getAllTvShows(): Promise<TvShowEntity[]> {
    return this.tvShowRepo.find({ relations: ["seasons", "seasons.episodes"] });
  }

  async getAllVideos(): Promise<
    (DocumentaryEntity | FilmEntity | SerieEntity | TvShowEntity)[]
  > {
    const documentaries = await this.getAllDocumentaries();
    const films = await this.getAllFilms();
    const series = await this.getAllSeries();
    const tvShows = await this.getAllTvShows();

    return [...documentaries, ...films, ...series, ...tvShows];
  }

  async searchFilms(title: string): Promise<FilmEntity[]> {
    return this.filmRepo.find({
      // where clause to filter films by title
      // this performs a search in the database for films matching the given title
      where: { title: title },
    });
  }
}
