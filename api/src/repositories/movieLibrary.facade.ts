// import necessary modules and entities
// from TypeORM and entity definitions
import type { DocumentaryEntity } from "../entities/documentary.entity";
import type { FilmEntity } from "../entities/film.entity";
import type { SeriesEntity } from "../entities/series.entity";
import type { SeriesSeasonEntity } from "../entities/series-season.entity";
import type { TvShowEntity } from "../entities/tv-show.entity";
import type { TvShowSeasonEntity } from "../entities/tv-show-season.entity";
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
export class MovieLibraryFacade {
  // constructor to initialize repositories for each entity
  constructor(private readonly deps: MovieLibraryDeps) {}
  // method to get all films
  getAllFilms() {
    return this.deps.filmRepo.getAllFilms();
  }

  // method to get all documentaries
  getAllDocumentaries() {
    return this.deps.documentaryRepo.getAllDocumentaries();
  }
  // method to get all series
  getAllSeries() {
    return this.deps.serieRepo.getAllSeries();
  }

  // method to get all TV shows
  getAllTvShows() {
    return this.deps.tvShowRepo.getAllTvShows();
  }

  // method to get all videos (documentaries, films, series, tv shows)
  // combines results from all individual getAll methods
  async getAllVideos(): // promise that resolves to an array containing any of the four entity types
  // DocumentaryEntity, FilmEntity, SerieEntity, TvShowEntity
  Promise<(DocumentaryEntity | FilmEntity | SeriesEntity | TvShowEntity)[]> {
    // use Promise.all to fetch all video types concurrently
    // destructure the results into respective variables
    // documentaries, films, series, and tvShows
    const [documentaries, films, series, tvShows] = await Promise.all([
      this.getAllDocumentaries(),
      this.getAllFilms(),
      this.getAllSeries(),
      this.getAllTvShows(),
    ]);

    // concatenate all lists into a single array and return it
    return [...documentaries, ...films, ...series, ...tvShows];
  }

  // Method to get film by ID
  getFilmById(id: string) {
    return this.deps.filmRepo.getFilmById(id);
  }

  // Method to get documentary by ID
  getDocumentaryById(id: string) {
    return this.deps.documentaryRepo.getDocumentaryById(id);
  }

  // Method to get serie by ID
  getSerieById(id: string) {
    return this.deps.serieRepo.getSerieById(id);
  }

  // Method to get tv-show by ID
  getTvShowById(id: string) {
    return this.deps.tvShowRepo.getTvShowById(id);
  }

  // Method to get episodes by serie ID
  getEpisodesBySerieId(serieId: string) {
    return this.deps.serieRepo.getEpisodesBySerieId(serieId);
  }

  // Methode to get episodes by tv show ID
  getEpisodesByTvShowId(tvShowId: string) {
    return this.deps.tvShowRepo.getEpisodesByTvShowId(tvShowId);
  }

  // Method to filter films by genre
  getFilmsByGenre(genre: string) {
    return this.deps.filmRepo.getFilmsByGenre(genre);
  }

  // Method to filter documentaries by genre
  getDocumentariesByGenre(genre: string) {
    return this.deps.documentaryRepo.getDocumentariesByGenre(genre);
  }

  // Method to filter series by genre
  getSeriesByGenre(genre: string) {
    return this.deps.serieRepo.getSeriesByGenre(genre);
  }

  // Method to filter tv shows by genre
  getTvShowsByGenre(genre: string) {
    return this.deps.tvShowRepo.filterTvShowsByGenre(genre);
  }

  // method to create a new film
  createFilm(data: Partial<FilmEntity>) {
    return this.deps.filmRepo.createFilm(data);
  }

  // method to create a new documentary
  createDocumentary(data: Partial<DocumentaryEntity>) {
    return this.deps.documentaryRepo.createDocumentary(data);
  }

  // method to create a new serie
  createSerie(data: Partial<SeriesEntity>) {
    return this.deps.serieRepo.createSerie(data);
  }

  // method to add a new season to an existing serie
  addSeasonToSerie(serieId: string, seasonData: Partial<SeriesSeasonEntity>) {
    return this.deps.serieRepo.addSeasonToSerie(serieId, seasonData);
  }

  // methode to create a new tv show
  createTvShow(data: Partial<TvShowEntity>) {
    return this.deps.tvShowRepo.createTvShow(data);
  }

  // method to add a new season to an existing tv show
  addSeasonToTvShow(tvShowId: string, seasonData: Partial<TvShowSeasonEntity>) {
    return this.deps.tvShowRepo.addSeasonToTvShow(tvShowId, seasonData);
  }

  // method to update a film
  updateFilm(id: string, data: Partial<FilmEntity>) {
    return this.deps.filmRepo.updateFilm(id, data);
  }

  // Method to update a documentary
  updateDocumentary(id: string, data: Partial<DocumentaryEntity>) {
    return this.deps.documentaryRepo.updateDocumentary(id, data);
  }

  // Method to update a serie
  updateSerie(id: string, data: Partial<SeriesEntity>) {
    return this.deps.serieRepo.updateSerie(id, data);
  }

  // methode to update a tv show
  updateTvShow(id: string, data: Partial<TvShowEntity>) {
    return this.deps.tvShowRepo.updateTvShow(id, data);
  }

  // method to delete a film by ID
  deleteFilm(id: string) {
    return this.deps.filmRepo.deleteFilm(id);
  }

  // method to delete a documentary by ID
  deleteDocumentary(id: string) {
    return this.deps.documentaryRepo.deleteDocumentary(id);
  }

  // method to delete a serie by ID
  deleteSerie(id: string) {
    return this.deps.serieRepo.deleteSerie(id);
  }

  // method to delete a tv show by ID
  deleteTvShow(id: string) {
    return this.deps.tvShowRepo.deleteTvShow(id);
  }

  // method to search films by title
  searchFilms(title: string) {
    return this.deps.filmRepo.searchFilmsByTitle(title);
  }

  // method to search documentaries by title
  searchDocumentaries(title: string) {
    return this.deps.documentaryRepo.searchDocumentariesByTitle(title);
  }

  // method to search series by title
  searchSeries(title: string) {
    return this.deps.serieRepo.searchSeriesByTitle(title);
  }

  // method to search episode series by title
  searchEpisodesInSeriesByTitle(title: string) {
    return this.deps.serieRepo.searchEpisodesInSeriesByTitle(title);
  }

  // method to search episode series by title with query builder
  searchSerieByEpisodeTitle(title: string) {
    return this.deps.serieRepo.searchSerieByEpisodeTitle(title);
  }

  searchTvShows(title: string) {
    return this.deps.tvShowRepo.searchTvShowsByTitle(title);
  }

  // global search method to search across all video types
  async searchAllVideosByTitle(
    // title parameter of type string
    title: string,
    // returns a promise that resolves to an array of various entity types
  ): Promise<(DocumentaryEntity | FilmEntity | SeriesEntity | TvShowEntity)[]> {
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
