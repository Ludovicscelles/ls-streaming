import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { SeasonTvShowEntity } from "./SeasonTvShowEntity";

@Entity()
export class EpisodeTvShowEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => SeasonTvShowEntity,
    (seasonTvShow) => seasonTvShow.episodeTvShowEntities
  )
  seasonTvShow!: SeasonTvShowEntity;

  @Column()
  episodeNumber!: number;

  @Column()
  duration!: number;
}
