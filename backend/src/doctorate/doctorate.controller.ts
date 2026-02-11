import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DoctorateService } from './doctorate.service';
import { CreateDoctorateDto } from './dto/create-doctorate.dto';
import { UpdateDoctorateDto } from './dto/update-doctorate.dto';

@Controller('doctorate')
export class DoctorateController {
  constructor(private readonly doctorateService: DoctorateService) {}

  @Post('add-doctorate')
  create(@Body() createDoctorateDto: CreateDoctorateDto) {
    return this.doctorateService.create(createDoctorateDto);
  }

  @Get('get-doctorate')
  findAll() {
    return this.doctorateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorateService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorateDto: UpdateDoctorateDto,
  ) {
    return this.doctorateService.update(+id, updateDoctorateDto);
  }

  @Delete('doctorate-id/:id')
  remove(@Param('id') id: string) {
    return this.doctorateService.remove(+id);
  }
}
