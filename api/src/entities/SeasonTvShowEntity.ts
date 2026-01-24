import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
} from "typeorm";
import { TvShowEntity } from "./TvShowEntity";
import { EpisodeTvShowEntity } from "./EpisodeTvShowEntity";

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

  @OneToMany(
    () => EpisodeTvShowEntity,
    (episodeTvShow) => episodeTvShow.seasonTvShow,
    {
      cascade: ["insert", "update", "remove"],
    },
  )
  episodeTvShowEntities!: EpisodeTvShowEntity[];
}
