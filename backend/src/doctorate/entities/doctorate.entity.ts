import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('doctorate')
export class Doctorate {
  @PrimaryGeneratedColumn()
  doctorateprogram_id: number;

  @Column({ type: 'varchar', length: 255 })
  doctorate_category: string;

  @Column({ type: 'varchar', length: 255 })
  doctorate_type: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  doctorate_postnominal: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
