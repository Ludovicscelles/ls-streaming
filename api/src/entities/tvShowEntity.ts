import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SeasonTvShowEntity } from "./SeasonTvShowEntity";

@Entity()
export class TvShowEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  genre!: string;

  @Column()
  image!: string;

  @OneToMany(() => SeasonTvShowEntity, (seasonTvShow) => seasonTvShow.tvShow, { cascade: true})
  seasonTvShowEntities!: SeasonTvShowEntity[];
}