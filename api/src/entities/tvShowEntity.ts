import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { SeasonTvShowEntity } from "./SeasonTvShowEntity";

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

  @OneToMany(() => SeasonTvShowEntity, (seasonTvShow) => seasonTvShow.tvShow, {
    cascade: ["insert", "update", "remove"],
  })
  seasonTvShowEntities!: SeasonTvShowEntity[];
}
