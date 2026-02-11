import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('semester_settings')
export class SemesterSetting {
  @PrimaryGeneratedColumn()
  semester_settings_id: number;

  @Column({ length: 50 })
  semester: string;

  @Column({ length: 20 })
  school_year_since: string;

  @Column({ length: 20 })
  school_year_effective: string;

  @Column({ length: 20 })
  term_status: string;
}
