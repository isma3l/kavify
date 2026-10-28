import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class UserOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'auth_uid', unique: true })
  authUid!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  email!: string | null;

  @Column({ nullable: true })
  phone!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
