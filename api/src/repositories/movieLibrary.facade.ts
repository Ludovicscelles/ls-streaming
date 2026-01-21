// import necessary modules and entities
// from TypeORM and entity definitions
import { DocumentaryEntity } from "../entities/DocumentaryEntity";
import { FilmEntity } from "../entities/FilmEntity";
import { SerieEntity } from "../entities/SerieEntity";
import { SeasonEntity } from "../entities/SeasonEntity";
import { EpisodeEntity } from "../entities/EpisodeEntity";
import { TvShowEntity } from "../entities/TvShowEntity";
import { SeasonTvShowEntity } from "../entities/SeasonTvShowEntity";
import { EpisodeTvShowEntity } from "../entities/EpisodeTvShowEntity";
import { DocumentaryRepository } from "./documentary.repository";
import { FilmRepository } from "./film.repository";
import { SerieRepository } from "./serie.repository";
import { TvShowRepository } from "./tvShow.repository";

type MovieLibraryDeps = {
  documentaryRepo: DocumentaryRepository;
  filmRepo: FilmRepository;
  serieRepo: SerieRepository;
  tvShowRepo: TvShowRepository;
};

// MovieLibraryRepository class definition
export class MovieLibraryRepository {
  // constructor to initialize repositories for each entity
  constructor(private readonly deps: MovieLibraryDeps) {}
  // method to get all films
  async getAllFilms() {
    return this.deps.filmRepo.getAllFilms();
  }

  // method to get all documentaries
  async getAllDocumentaries(): Promise<DocumentaryEntity[]> {
    return this.deps.documentaryRepo.getAllDocumentaries();
  }

  // method to get all series
  async getAllSeries(): Promise<SerieEntity[]> {
    return this.deps.serieRepo.getAllSeries();
  }

  // method to get all TV shows
  async getAllTvShows(): Promise<TvShowEntity[]> {
    return this.deps.tvShowRepo.getAllTvShows();
  }

  // method to get all videos (documentaries, films, series, tv shows)
  // combines results from all individual getAll methods
  async getAllVideos(): // promise that resolves to an array containing any of the four entity types
  // DocumentaryEntity, FilmEntity, SerieEntity, TvShowEntity
  Promise<(DocumentaryEntity | FilmEntity | SerieEntity | TvShowEntity)[]> {
    // await each method to get the respective lists
    const documentaries = await this.deps.documentaryRepo.getAllDocumentaries();
    const films = await this.deps.filmRepo.getAllFilms();
    const series = await this.deps.serieRepo.getAllSeries();
    const tvShows = await this.deps.tvShowRepo.getAllTvShows();

    // concatenate all lists into a single array and return it
    return [...documentaries, ...films, ...series, ...tvShows];
  }

  // Method to get film by ID
  async getFilmById(id: string): Promise<FilmEntity | null> {
    return this.deps.filmRepo.getFilmById(id);
  }

  // Method to get documentary by ID
  async getDocumentaryById(id: string): Promise<DocumentaryEntity | null> {
    return this.deps.documentaryRepo.getDocumentaryById(id);
  }

  // Method to get serie by ID
  async getSerieById(id: string): Promise<SerieEntity | null> {
    return this.deps.serieRepo.getSerieById(id);
  }

  // Method to get tv-show by ID
  async getTvShowById(id: string): Promise<TvShowEntity | null> {
    return this.deps.tvShowRepo.getTvShowById(id);
  }

  // Method to get episodes by serie ID
  async getEpisodesBySerieId(serieId: string): Promise<EpisodeEntity[]> {
    return this.deps.serieRepo.getEpisodesBySerieId(serieId);
  }

  // Methode to get episodes by tv show ID
  async getEpisodesByTvShowId(
    tvShowId: string,
  ): Promise<EpisodeTvShowEntity[]> {
    return this.deps.tvShowRepo.getEpisodesByTvShowId(tvShowId);
  }

  // Method to filter films by genre
  async getFilmsByGenre(genre: string) {
    return this.deps.filmRepo.getFilmsByGenre(genre);
  }

  // Method to filter documentaries by genre
  async getDocumentariesByGenre(genre: string) {
    return this.deps.documentaryRepo.getDocumentariesByGenre(genre);
  }

  // Method to filter series by genre
  async getSeriesByGenre(genre: string) {
    return this.deps.serieRepo.getSeriesByGenre(genre);
  }

  // Method to filter tv shows by genre
  async getTvShowsByGenre(genre: string) {
    return this.deps.tvShowRepo.filterTvShowsByGenre(genre);
  }

  // method to create a new film
  async createFilm(data: Partial<FilmEntity>) {
    return this.deps.filmRepo.createFilm(data);
  }

  // method to create a new documentary
  async createDocumentary(data: Partial<DocumentaryEntity>) {
    return this.deps.documentaryRepo.createDocumentary(data);
  }

  // method to create a new serie
  async createSerie(data: Partial<SerieEntity>) {
    return this.deps.serieRepo.createSerie(data);
  }

  // method to add a new season to an existing serie
  async addSeasonToSerie(serieId: string, seasonData: Partial<SeasonEntity>) {
    return this.deps.serieRepo.addSeasonToSerie(serieId, seasonData);
  }

  // methode to create a new tv show
  async createTvShow(data: Partial<TvShowEntity>) {
    return this.deps.tvShowRepo.createTvShow(data);
  }

  // method to add a new season to an existing tv show
  async addSeasonToTvShow(
    tvShowId: string,
    seasonData: Partial<SeasonTvShowEntity>,
  ) {
    return this.deps.tvShowRepo.addSeasonToTvShow(tvShowId, seasonData);
  }

  // method to update a film
  async updateFilm(id: string, data: Partial<FilmEntity>) {
    return this.deps.filmRepo.updateFilm(id, data);
  }

  // Method to update a documentary
  async updateDocumentary(id: string, data: Partial<DocumentaryEntity>) {
    return this.deps.documentaryRepo.updateDocumentary(id, data);
  }

  // Method to update a serie
  async updateSerie(id: string, data: Partial<SerieEntity>) {
    return this.deps.serieRepo.updateSerie(id, data);
  }

  // methode to update a tv show
  async updateTvShow(id: string, data: Partial<TvShowEntity>) {
    return this.deps.tvShowRepo.updateTvShow(id, data);
  }

  // method to delete a film by ID
  async deleteFilm(id: string): Promise<void> {
    return this.deps.filmRepo.deleteFilm(id);
  }

  // method to delete a documentary by ID
  async deleteDocumentary(id: string): Promise<void> {
    return this.deps.documentaryRepo.deleteDocumentary(id);
  }

  // method to delete a serie by ID
  async deleteSerie(id: string): Promise<void> {
    return this.deps.serieRepo.deleteSerie(id);
  }

  // method to delete a tv show by ID
  async deleteTvShow(id: string): Promise<void> {
    return this.deps.tvShowRepo.deleteTvShow(id);
  }

  // method to search films by title
  async searchFilms(title: string): Promise<FilmEntity[]> {
    return this.deps.filmRepo.searchFilmsByTitle(title);
  }

  // method to search documentaries by title
  async searchDocumentaries(title: string): Promise<DocumentaryEntity[]> {
    return this.deps.documentaryRepo.searchDocumentariesByTitle(title);
  }

  // method to search series by title
  async searchSeries(title: string): Promise<SerieEntity[]> {
    return this.deps.serieRepo.searchSeriesByTitle(title);
  }

  // method to search episode series by title
  async searchEpisodesInSeriesByTitle(title: string) {
    return this.deps.serieRepo.searchEpisodesInSeriesByTitle(title);
  }

  // method to search episode series by title with query builder
  async searchSerieByEpisodeTitle(title: string): Promise<SerieEntity[]> {
    return this.deps.serieRepo.searchSerieByEpisodeTitle(title);
  }

  async searchTvShows(title: string): Promise<TvShowEntity[]> {
    return this.deps.tvShowRepo.searchTvShowsByTitle(title);
  }

  // global search method to search across all video types
  async searchAllVideosByTitle(
    // title parameter of type string
    title: string,
    // returns a promise that resolves to an array of various entity types
  ): Promise<(DocumentaryEntity | FilmEntity | SerieEntity | TvShowEntity)[]> {
    // trim and convert the title to lowercase for consistent searching
    const searchedTitle = title.trim().toLowerCase();
    // perform searches for each video type concurrently using Promise.all
    // Promise.all takes an array of promises and returns a single promise
    // that resolves when all of the input promises have resolved
    const [films, documentaries, series, tvShows] = await Promise.all([
      // this calls each search method with the processed title
      this.searchFilms(searchedTitle),
      this.searchDocumentaries(searchedTitle),
      this.searchSeries(searchedTitle),
      this.searchTvShows(searchedTitle),
    ]);
    // combine all results into a single array and return it
    return [...films, ...documentaries, ...series, ...tvShows];
  }
}
