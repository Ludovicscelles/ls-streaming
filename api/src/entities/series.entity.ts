import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { SeriesSeasonEntity } from "./series-season.entity";

@Entity()
export class SeriesEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  genre!: string;

  @Column()
  image!: string;

  @Column({ type: "text", nullable: true })
  synopsis?: string;

  @OneToMany(() => SeriesSeasonEntity, (season) => season.serie, {
    cascade: ["insert", "update", "remove"],
  })
  seasonEntities!: SeriesSeasonEntity[];
}
