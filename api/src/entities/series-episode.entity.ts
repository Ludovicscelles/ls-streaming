import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { SeriesSeasonEntity } from "./series-season.entity";

@Entity()
export class SeriesEpisodeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SeriesSeasonEntity, (season) => season.episodes, {
    nullable: false,
    onDelete: "CASCADE",
  })
  season!: SeriesSeasonEntity;

  @Column()
  title!: string;

  @Column()
  episodeNumber!: number;

  @Column()
  duration!: number;

  @Column()
  director!: string;
}
