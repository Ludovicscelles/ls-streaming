import { Repository, Like } from "typeorm";
import { DocumentaryEntity } from "../entities/documentary.entity";

import { generateDocumentaryId } from "../utils/generateIds";

export class DocumentaryRepository {
  constructor(
    private readonly documentaryRepo: Repository<DocumentaryEntity>,
  ) {}

  // Method to get all documentaries
  // async means it returns a Promise and that functions is asynchronous
  // Promise<DocumentaryEntity[]> indicates the return type is a promise that resolves to an array of DocumentaryEntity
  async getAllDocumentaries(): Promise<DocumentaryEntity[]> {
    // use the repository to find and return all documentaries
    // this signifies that we are calling the find method on the documentaryRepo instance
    // the find() method retrieves all records from the DocumentaryEntity table
    return this.documentaryRepo.find();
  }

  // Method to get a documentary by its ID
  async getDocumentaryById(id: string): Promise<DocumentaryEntity | null> {
    return this.documentaryRepo.findOne({ where: { id } });
  }

  // Method to filter documentary by genre
  async getDocumentariesByGenre(genre: string): Promise<DocumentaryEntity[]> {
    return this.documentaryRepo.find({
      where: { genre: Like(`%${genre.trim().toLowerCase()}%`) },
    });
  }

  // Method to create a new documentary
  // takes a partial DocumentaryEntity object as input data
  async createDocumentary(
    data: Partial<DocumentaryEntity>,
  ): Promise<DocumentaryEntity> {
    const id = await generateDocumentaryId(this.documentaryRepo);
    // create a new documentary instance using the repository's create method
    const newDocumentary = this.documentaryRepo.create({ id, ...data });
    // insert the new documentary into the database
    await this.documentaryRepo.insert(newDocumentary);
    // retrieve and return the newly created documentary by its ID
    // this ensures we return the complete entity as stored in the database
    return this.documentaryRepo.findOneByOrFail({ id: newDocumentary.id! });
  }

  // Method to update an existing documentary
  async updateDocumentary(id: string, data: Partial<DocumentaryEntity>) {
    const safeData: Partial<DocumentaryEntity> = {};

    if (data.title !== undefined) safeData.title = data.title;
    if (data.genre !== undefined) safeData.genre = data.genre;
    if (data.image !== undefined) safeData.image = data.image;
    if (data.duration !== undefined) safeData.duration = data.duration;
    if (data.releaseDate !== undefined) safeData.releaseDate = data.releaseDate;
    if (data.subject !== undefined) safeData.subject = data.subject;

    if (Object.keys(safeData).length === 0) {
      throw Object.assign(new Error("No valid update fields provided"), {
        code: "NO_VALID_FIELDS",
      });
    }
    const documentary = await this.documentaryRepo.preload({ id, ...safeData });
    if (!documentary) {
      throw Object.assign(new Error("Documentary not found"), {
        code: "DOCUMENTARY_NOT_FOUND",
      });
    }
    return this.documentaryRepo.save(documentary);
  }

  // Method to delete a documentary by its ID
  async deleteDocumentary(id: string): Promise<void> {
    const result = await this.documentaryRepo.delete(id);
    if (!result.affected || result.affected === 0) {
      throw Object.assign(new Error("Documentary not found"), {
        code: "DOCUMENTARY_NOT_FOUND",
      });
    }
  }

  // Method to search documentaries by title
  async searchDocumentariesByTitle(
    title: string,
  ): Promise<DocumentaryEntity[]> {
    return this.documentaryRepo.find({
      where: { title: Like(`%${title.trim().toLowerCase()}%`) },
    });
  }
}
