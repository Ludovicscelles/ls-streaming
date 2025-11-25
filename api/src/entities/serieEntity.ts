import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SeasonEntity } from "./SeasonEntity";


@Entity()
export class SerieEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  genre!: string;

  @Column()
  image!: string;

  @OneToMany(() => SeasonEntity, (season) => season.serie, { cascade: true })
  seasonEntities!: SeasonEntity[];
}
