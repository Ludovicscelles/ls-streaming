import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
} from "typeorm";
import { SeriesEntity } from "./series.entity";
import { SeriesEpisodeEntity } from "./series-episode.entity";

@Entity()
@Index(["serie", "seasonNumber"], { unique: true })
export class SeriesSeasonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SeriesEntity, (serie) => serie.seasonEntities, {
    nullable: false,
    onDelete: "CASCADE",
  })
  serie!: SeriesEntity;

  @Column()
  seasonYear!: number;

  @Column()
  seasonNumber!: number;

  @Column({ type: "text", nullable: true })
  seasonSynopsis?: string;

  @OneToMany(() => SeriesEpisodeEntity, (episode) => episode.season, {
    cascade: ["insert", "update", "remove"],
  })
  episodes!: SeriesEpisodeEntity[];
}
