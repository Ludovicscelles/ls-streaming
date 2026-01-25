import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { SeasonTvShowEntity } from "./tv-show-season.entity";

@Entity()
export class EpisodeTvShowEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => SeasonTvShowEntity,
    (seasonTvShow) => seasonTvShow.episodeTvShowEntities,
    {
      nullable: false,
      onDelete: "CASCADE",
    },
  )
  seasonTvShow!: SeasonTvShowEntity;

  @Column()
  episodeNumber!: number;

  @Column()
  duration!: number;
}
