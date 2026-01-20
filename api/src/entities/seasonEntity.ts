import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
} from "typeorm";
import { SerieEntity } from "./SerieEntity";
import { EpisodeEntity } from "./EpisodeEntity";

@Entity()
@Index(["serie", "seasonNumber"], { unique: true })
export class SeasonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SerieEntity, (serie) => serie.seasonEntities, {
    onDelete: "CASCADE",
    nullable: false,
  })
  serie!: SerieEntity;

  @Column()
  seasonYear!: number;

  @Column()
  seasonNumber!: number;

  @OneToMany(() => EpisodeEntity, (episode) => episode.season, {
    cascade: ["insert", "update", "remove"],
  })
  episodes!: EpisodeEntity[];
}
