import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Projected } from 'src/projected/entities/projected.entity';
import { Program } from 'src/programs/entities/program.entity';
import { Course } from 'src/courses/entities/course.entity';
@Entity('curricula')
export class Curriculum {
  @PrimaryGeneratedColumn()
  curriculum_id: number;

  @Column({ type: 'int' })
  program_id: number;

  @Column({ type: 'varchar', length: 255 })
  curriculum_name: string;

  @Column({ type: 'varchar', length: 100 })
  curriculum_since: string;

  @Column({ type: 'varchar', length: 100 })
  curriculum_effective: string;

  @Column({ type: 'varchar', length: 255 })
  curriculum_consortium: string;

  @Column({ type: 'varchar', length: 100 })
  curriculum_cmo: string;

  @Column({ type: 'varchar', length: 100 })
  curriculum_status: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relation to Projected
  @OneToMany(() => Projected, (projected) => projected.curriculum)
  projected: Projected[];

  // Relation to Projected
  @OneToMany(() => Course, (courses) => courses.curriculum)
  courses: Course[];

  @ManyToOne(() => Program, (program) => program.curricula, {
    onDelete: 'CASCADE', // or 'RESTRICT'
  })
  @JoinColumn({ name: 'program_id' })
  program: Program;
}
