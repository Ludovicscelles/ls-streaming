import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { SerieEntity } from "./SerieEntity";
import { EpisodeEntity } from "./EpisodeEntity";

@Entity()
export class SeasonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SerieEntity, (serie) => serie.seasonEntities)
  serie!: SerieEntity;

  @Column()
  seasonYear!: number;

  @Column()
  seasonNumber!: number;

  @OneToMany(() => EpisodeEntity, (episode) => episode.season, {
    cascade: true,
  })
  episodes!: EpisodeEntity[];
}
