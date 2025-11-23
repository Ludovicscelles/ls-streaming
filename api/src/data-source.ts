import "reflect-metadata";
import { DataSource } from "typeorm";
import { Documentary } from "./models/Documentary";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "data/ls-streaming.sqlite",
  entities: [Documentary],
  synchronize: true,
  logging: false,
});
