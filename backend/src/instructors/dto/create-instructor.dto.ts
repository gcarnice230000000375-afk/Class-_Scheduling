import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateInstructorDto {
  @IsString()
  instructor_fname: string;

  @IsString()
  instructor_mname: string;

  @IsString()
  instructor_lname: string;

  @IsString()
  instructor_gender: string;

  @IsString()
  instructor_jobtype: string;

  @IsOptional()
  @IsNumber()
  bachelorprogram_id?: number;

  @IsOptional()
  @IsString()
  bachelor_postnominal?: string;

  @IsOptional()
  @IsNumber()
  masterprogram_id?: number;

  @IsOptional()
  @IsString()
  master_postnominal?: string;

  @IsOptional()
  @IsNumber()
  doctorateprogram_id?: number;

  @IsOptional()
  @IsString()
  doctorate_postnominal?: string;

  @IsString()
  employee_id: string;
}
