import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'admins' })
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', unique: true })
  email!: string;

  @Column({ type: 'text' })
  password_hash!: string;

  @Column({ type: 'text', nullable: true })
  name!: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;
}
