import { PartialType } from '@nestjs/mapped-types';
import { CreateSemesterSettingDto } from './create-semester-setting.dto';

export class UpdateSemesterSettingDto extends PartialType(
  CreateSemesterSettingDto,
) {}
