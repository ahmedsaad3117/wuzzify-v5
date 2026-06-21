import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type ArticleStatus = 'draft' | 'published';

@Entity({ name: 'articles' })
@Index(['status', 'published_at'])
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // varchar (not text) so it can carry a UNIQUE index in MySQL.
  @Column({ type: 'varchar', length: 255, unique: true })
  slug!: string;

  @Column({ type: 'varchar', length: 300 })
  title_ar!: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  title_en!: string | null;

  @Column({ type: 'text', nullable: true })
  excerpt_ar!: string | null;

  @Column({ type: 'text', nullable: true })
  excerpt_en!: string | null;

  // longtext: article HTML can exceed the 64KB TEXT limit. App always sets it.
  @Column({ type: 'longtext' })
  content_ar!: string;

  @Column({ type: 'longtext', nullable: true })
  content_en!: string | null;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  cover_url!: string | null;

  @Column({ type: 'enum', enum: ['draft', 'published'], default: 'draft' })
  status!: ArticleStatus;

  @Column({ type: 'datetime', precision: 6, nullable: true })
  published_at!: Date | null;

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 6 })
  updated_at!: Date;
}
