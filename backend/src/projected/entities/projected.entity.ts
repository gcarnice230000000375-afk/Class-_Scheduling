import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Curriculum } from 'src/curriculum/entities/curriculum.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Course } from 'src/courses/entities/course.entity';
@Entity('projected')
export class Projected {
  @PrimaryGeneratedColumn()
  project_id: number;

  @Column({ nullable: true })
  curriculum_id: number;

  @Column({ nullable: true })
  course_id: number;

  @Column({ nullable: true })
  section_id: number;

  @Column()
  project_level: number;

  @Column({ type: 'varchar', length: 255 })
  project_section: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Curriculum, (curriculum) => curriculum.projected, {
    onDelete: 'CASCADE', // or 'SET NULL' if preferred
  })
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: Curriculum;

  @OneToMany(() => Section, (section) => section.projected)
  sections: Section[];

  @ManyToOne(() => Section, (section) => section.projected, {
    onDelete: 'CASCADE', // or 'SET NULL' if preferred
  })
  @JoinColumn({ name: 'section_id' })
  section: Section;

  @ManyToOne(() => Course, (course) => course.projected, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  courses: Course;
}
