import { PartialType } from '@nestjs/mapped-types';
import { CreateClassScheduleDto } from './create-class-schedule.dto';
import { IsOptional, IsArray } from 'class-validator';

export class UpdateClassScheduleDto extends PartialType(
  CreateClassScheduleDto,
) {
  @IsOptional()
  @IsArray()
  schedule_days?: string[]; // keep type consistent
}
