import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BachelorService } from './bachelor.service';
import { CreateBachelorDto } from './dto/create-bachelor.dto';
import { UpdateBachelorDto } from './dto/update-bachelor.dto';

@Controller('bachelor')
export class BachelorController {
  constructor(private readonly bachelorService: BachelorService) {}

  @Post('add-bachelor')
  create(@Body() createBachelorDto: CreateBachelorDto) {
    return this.bachelorService.create(createBachelorDto);
  }

  @Get('get-bachelor')
  findAll() {
    return this.bachelorService.findAll();
  }

  @Get(':bachelor_id')
  findOne(@Param('bachelor_id') bachelor_id: string) {
    return this.bachelorService.findOne(+bachelor_id);
  }

  @Patch(':bachelor_id')
  update(
    @Param('bachelor_id') bachelor_id: string,
    @Body() updateBachelorDto: UpdateBachelorDto,
  ) {
    return this.bachelorService.update(+bachelor_id, updateBachelorDto);
  }

  @Delete('bachelor-id/:bachelor_id')
  remove(@Param('bachelor_id') bachelor_id: string) {
    return this.bachelorService.remove(+bachelor_id);
  }
}
