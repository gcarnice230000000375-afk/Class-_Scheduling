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
import { Projected } from 'src/projected/entities/projected.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn()
  section_id: number;

  // @Column()
  // project_id: number;

  @ManyToOne(() => Projected, (projected) => projected.sections, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  projected: Projected;

  @OneToMany(() => Projected, (projected) => projected.sections)
  sections: Section[];

  // @Column({ type: 'varchar', length: 100 })
  // section_session: string;

  @Column({ type: 'varchar', length: 100 })
  section_set: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
