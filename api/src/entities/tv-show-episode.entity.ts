import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TvShowSeasonEntity } from "./tv-show-season.entity";

@Entity()
export class TvShowEpisodeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => TvShowSeasonEntity,
    (seasonTvShow) => seasonTvShow.episodeTvShowEntities,
    {
      nullable: false,
      onDelete: "CASCADE",
    },
  )
  seasonTvShow!: TvShowSeasonEntity;

  @Column()
  episodeNumber!: number;

  @Column()
  duration!: number;
}
