import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
} from "typeorm";
import { TvShowEntity } from "./tv-show.entity";
import { EpisodeTvShowEntity } from "./tv-show-episode.entity";

@Entity()
@Index(["tvShow", "seasonNumber"], { unique: true })
export class SeasonTvShowEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => TvShowEntity, (tvShow) => tvShow.seasonTvShowEntities, {
    nullable: false,
    onDelete: "CASCADE",
  })
  tvShow!: TvShowEntity;

  @Column()
  seasonYear!: number;

  @Column()
  seasonNumber!: number;

  @Column()
  tvHost!: string;

  @Column({ type: "text", nullable: true })
  descriptionSeason?: string;

  @OneToMany(
    () => EpisodeTvShowEntity,
    (episodeTvShow) => episodeTvShow.seasonTvShow,
    {
      cascade: ["insert", "update", "remove"],
    },
  )
  episodeTvShowEntities!: EpisodeTvShowEntity[];
}
