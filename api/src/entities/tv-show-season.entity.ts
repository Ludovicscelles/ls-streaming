import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
  CreateDateColumn,
} from "typeorm";
import { TvShowEntity } from "./tv-show.entity";
import { TvShowEpisodeEntity } from "./tv-show-episode.entity";

@Entity()
@Index(["tvShow", "seasonNumber"], { unique: true })
export class TvShowSeasonEntity {
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
  seasonDescription!: string;

  @CreateDateColumn()
  seasonAddedAt!: Date;

  @OneToMany(
    () => TvShowEpisodeEntity,
    (episodeTvShow) => episodeTvShow.seasonTvShow,
    {
      cascade: ["insert", "update", "remove"],
    },
  )
  episodeTvShowEntities!: TvShowEpisodeEntity[];
}
