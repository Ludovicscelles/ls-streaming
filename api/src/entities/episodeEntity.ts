import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { SeasonEntity } from "./SeasonEntity";

@Entity()
export class EpisodeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SeasonEntity, (season) => season.episodes)
  season!: SeasonEntity;

  @Column()
  title!: string;

  @Column()
  episodeNumber!: number;

  @Column()
  duration!: number;

  @Column()
  director!: string;
}
