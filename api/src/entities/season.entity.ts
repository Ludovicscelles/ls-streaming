import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
} from "typeorm";
import { SerieEntity } from "./series.entity";
import { EpisodeEntity } from "./episode.entity";

@Entity()
@Index(["serie", "seasonNumber"], { unique: true })
export class SeasonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SerieEntity, (serie) => serie.seasonEntities, {
    nullable: false,
    onDelete: "CASCADE",
  })
  serie!: SerieEntity;

  @Column()
  seasonYear!: number;

  @Column()
  seasonNumber!: number;

  @Column({ type: "text", nullable: true })
  seasonSynopsis?: string;

  @OneToMany(() => EpisodeEntity, (episode) => episode.season, {
    cascade: ["insert", "update", "remove"],
  })
  episodes!: EpisodeEntity[];
}
