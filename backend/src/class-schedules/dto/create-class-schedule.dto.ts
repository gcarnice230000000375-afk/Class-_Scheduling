import {
  IsInt,
  IsString,
  Matches,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateClassScheduleDto {
  @IsInt()
  @IsNotEmpty()
  instructor_id: number;

  @IsInt()
  @IsNotEmpty()
  course_id: number;

  @IsInt()
  @IsNotEmpty()
  room_id: number;

  @IsInt()
  @IsNotEmpty()
  project_id: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  schedule_days: string[];

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, {
    message: 'time_start must be in HH:MM or HH:MM:SS format',
  })
  time_start: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, {
    message: 'time_end must be in HH:MM or HH:MM:SS format',
  })
  time_end: string;
}
