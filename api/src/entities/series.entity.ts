import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { SeasonEntity } from "./season.entity";

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

  @Column({ type: "text", nullable: true })
  synopsis?: string;

  @OneToMany(() => SeasonEntity, (season) => season.serie, {
    cascade: ["insert", "update", "remove"],
  })
  seasonEntities!: SeasonEntity[];
}
