import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class DocumentaryEntity {
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

  @Column()
  subject!: string;
}
