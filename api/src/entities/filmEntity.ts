import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class FilmEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  genre!: string;

  @Column()
  image!: string;

  @Column()
  duration!: number;

  @Column()
  realiseDate!: string;
  
  @Column()
  director!: string;
}
