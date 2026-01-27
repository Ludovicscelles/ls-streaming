import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

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
  releaseDate!: string;

  @CreateDateColumn()
  addedAt!: Date;
  
  @Column()
  director!: string;

  @Column({ type: "text", nullable: true })
  synopsis?: string;
}
