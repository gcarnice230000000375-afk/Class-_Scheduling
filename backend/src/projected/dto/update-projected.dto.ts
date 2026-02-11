import { PartialType } from '@nestjs/swagger';
import { CreateProjectedDto } from './create-projected.dto';

export class UpdateProjectedDto extends PartialType(CreateProjectedDto) {}
