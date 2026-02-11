// src/instructor/entities/instructor.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Bachelor } from 'src/bachelor/entities/bachelor.entity';
import { Master } from 'src/master/entities/master.entity';
import { Doctorate } from 'src/doctorate/entities/doctorate.entity';

@Entity('instructors')
export class Instructor {
  @PrimaryGeneratedColumn()
  instructor_id: number;
  @Column({ type: 'varchar', length: 255 })
  instructor_fname: string;

  @Column({ type: 'varchar', length: 255 })
  instructor_mname: string;

  @Column({ type: 'varchar', length: 255 })
  instructor_lname: string;

  @Column({ type: 'varchar', length: 50 })
  instructor_gender: string;

  @Column({ type: 'varchar', length: 50 })
  employee_id: string;

  @Column({ type: 'varchar', length: 100 })
  instructor_jobtype: string;
  // Many-to-One with Bachelor
  @ManyToOne(() => Bachelor, { eager: true })
  @JoinColumn({ name: 'bachelorprogram_id' })
  bachelor: Bachelor;

  @Column({ nullable: true })
  bachelorprogram_id: number;

  // Many-to-One with Master
  @ManyToOne(() => Master, { eager: true })
  @JoinColumn({ name: 'masterprogram_id' })
  master: Master;

  @Column({ nullable: true })
  masterprogram_id: number;

  // Many-to-One with Doctorate
  @ManyToOne(() => Doctorate, { eager: true })
  @JoinColumn({ name: 'doctorateprogram_id' })
  doctorate: Doctorate;

  @Column({ nullable: true })
  doctorateprogram_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
