import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  room_id: number;

  @Column({ type: 'int', nullable: true })
  room_number: number | null;

  @Column({ type: 'varchar', length: 100 })
  room_type: string;

  @Column({ type: 'varchar', length: 100 })
  room_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
