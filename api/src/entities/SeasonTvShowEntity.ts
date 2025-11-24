import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { TvShowEntity } from "./TvShowEntity";
import { EpisodeTvShowEntity } from "./EpisodeTvShowEntity";


@Entity()
export class SeasonTvShowEntity {
  @PrimaryGeneratedColumn()
    id!: number;
  
  @ManyToOne(() => TvShowEntity, (tvShow) => tvShow.seasonTvShowEntities)
  tvShow!: TvShowEntity;

  @Column()
  seasonYear!: number;

  @Column()
  seasonNumber!: number;

  @Column()
  tvHost!: string;

  @OneToMany(() => EpisodeTvShowEntity, (episodeTvShow) => episodeTvShow.seasonTvShow, {
    cascade: true
  })
  episodeTvShowEntities!: EpisodeTvShowEntity[];

}