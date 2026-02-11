import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_accounts')
export class User_Accounts {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  employee_id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  position: string;

  @Column()
  office: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
