import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Instructor } from 'src/instructors/entities/instructor.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Curriculum } from 'src/curriculum/entities/curriculum.entity';
import { Projected } from 'src/projected/entities/projected.entity';

@Entity('class_schedule')
export class ClassSchedule {
  @PrimaryGeneratedColumn()
  schedule_id: number;

  @ManyToOne(() => Instructor, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'instructor_id' })
  instructor: Instructor;

  @ManyToOne(() => Course, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Room, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => Projected, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Projected;

  @Column({ type: 'varchar', length: 255 })
  schedule_days: string; // store as comma-separated string

  @Column({ type: 'time' })
  time_start: string;

  @Column({ type: 'time' })
  time_end: string;
}
