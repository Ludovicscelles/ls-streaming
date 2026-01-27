import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

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

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  subject!: string;

  @Column({ type: "text", nullable: true })
  description?: string;
}
