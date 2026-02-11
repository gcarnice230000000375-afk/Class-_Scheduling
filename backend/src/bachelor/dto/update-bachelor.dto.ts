import { PartialType } from '@nestjs/swagger';
import { CreateBachelorDto } from './create-bachelor.dto';

export class UpdateBachelorDto extends PartialType(CreateBachelorDto) {}
