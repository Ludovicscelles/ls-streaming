import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { SeasonEntity } from "./SeasonEntity";


@Entity()
export class SerieEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  genre!: string;

  @Column()
  image!: string;

  @OneToMany(() => SeasonEntity, (season) => season.serie, { cascade: ["insert", "update", "remove"] })
  seasonEntities!: SeasonEntity[];
}
