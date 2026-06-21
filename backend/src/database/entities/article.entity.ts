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

  @Column({ type: 'text', unique: true })
  slug!: string;

  @Column({ type: 'text' })
  title_ar!: string;

  @Column({ type: 'text', nullable: true })
  title_en!: string | null;

  @Column({ type: 'text', nullable: true })
  excerpt_ar!: string | null;

  @Column({ type: 'text', nullable: true })
  excerpt_en!: string | null;

  @Column({ type: 'text', default: '' })
  content_ar!: string;

  @Column({ type: 'text', nullable: true })
  content_en!: string | null;

  @Column({ type: 'text', nullable: true })
  cover_url!: string | null;

  @Column({ type: 'enum', enum: ['draft', 'published'], default: 'draft' })
  status!: ArticleStatus;

  @Column({ type: 'timestamptz', nullable: true })
  published_at!: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;
}
