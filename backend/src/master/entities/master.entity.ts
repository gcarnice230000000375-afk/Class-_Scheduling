import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('master')
export class Master {
  @PrimaryGeneratedColumn()
  masterprogram_id: number;

  @Column({ type: 'varchar', length: 255 })
  master_category: string;

  @Column({ type: 'varchar', length: 255 })
  master_type: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  master_postnominal: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
