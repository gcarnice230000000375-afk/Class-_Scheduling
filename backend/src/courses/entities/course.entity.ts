import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Curriculum } from 'src/curriculum/entities/curriculum.entity';
import { Projected } from 'src/projected/entities/projected.entity';
@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  course_id: number;

  @Column({ type: 'int', nullable: true }) // ✅ Must be nullable for SET NULL
  curriculum_id: number;

  @Column({ type: 'varchar', length: 100 })
  course_offer_code: string;

  @Column({ type: 'varchar', length: 100 })
  course_code: string;

  @Column({ type: 'varchar', length: 255 })
  course_description: string;

  @Column({ type: 'int' })
  course_semester: number;

  @Column({ type: 'int' })
  course_level: number;

  @Column({ type: 'int' })
  course_lec: number;

  @Column({ type: 'int' })
  course_lab: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  course_requisite: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @ManyToOne(() => Curriculum, (curriculum) => curriculum.courses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: Curriculum;
  @OneToMany(() => Projected, (projected) => projected.courses)
  projected: Projected[];
}
