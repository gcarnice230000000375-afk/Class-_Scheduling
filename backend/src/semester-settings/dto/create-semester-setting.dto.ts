import { IsString, Length } from 'class-validator';

export class CreateSemesterSettingDto {
  @IsString()
  @Length(1, 50, { message: 'Semester must not exceed 50 characters' })
  semester: string;

  @IsString()
  @Length(1, 20, { message: 'School year since must not exceed 20 characters' })
  school_year_since: string;

  @IsString()
  @Length(1, 20, {
    message: 'School year effective must not exceed 20 characters',
  })
  school_year_effective: string;

  @IsString()
  @Length(1, 20, { message: 'Term status must not exceed 20 characters' })
  term_status: string;
}
