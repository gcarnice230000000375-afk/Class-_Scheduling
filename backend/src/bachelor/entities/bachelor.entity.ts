// src/bachelor/entities/bachelor.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('bachelor')
export class Bachelor {
  @PrimaryGeneratedColumn()
  bachelorprogram_id: number;

  @Column({ type: 'varchar', length: 255 })
  bachelor_category: string;

  @Column({ type: 'varchar', length: 255 })
  bachelor_type: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  bachelor_postnominal: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
