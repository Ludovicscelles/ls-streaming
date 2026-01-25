import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { TvShowSeasonEntity } from "./tv-show-season.entity";

@Entity()
export class TvShowEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  genre!: string;

  @Column()
  image!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @OneToMany(() => TvShowSeasonEntity, (seasonTvShow) => seasonTvShow.tvShow, {
    cascade: ["insert", "update", "remove"],
  })
  seasonTvShowEntities!: TvShowSeasonEntity[];
}
