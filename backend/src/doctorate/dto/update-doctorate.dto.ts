import { PartialType } from '@nestjs/swagger';
import { CreateDoctorateDto } from './create-doctorate.dto';

export class UpdateDoctorateDto extends PartialType(CreateDoctorateDto) {}
