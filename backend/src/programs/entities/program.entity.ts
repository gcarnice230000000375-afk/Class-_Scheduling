// program.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Curriculum } from 'src/curriculum/entities/curriculum.entity';

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn()
  program_id: number;

  @Column({ type: 'varchar', length: 255 })
  program_name: string;

  @Column({ type: 'varchar', length: 255 })
  program_code: string;

  @Column({ type: 'varchar', length: 255 })
  program_major: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Curriculum, (curriculum) => curriculum.program)
  curricula: Curriculum[];
}
