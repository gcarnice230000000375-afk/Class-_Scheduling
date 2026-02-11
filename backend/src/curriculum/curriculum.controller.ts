import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';

@Controller('curriculums')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post('add-curriculums')
  create(@Body() createCurriculumDto: CreateCurriculumDto) {
    return this.curriculumService.create(createCurriculumDto);
  }

  @Get('get-curriculums')
  findAll() {
    return this.curriculumService.findAll();
  }

  @Get('get-id/:id')
  findOne(@Param('id') id: string) {
    return this.curriculumService.findOne(+id);
  }

  @Patch('update-curriculum/:id')
  update(
    @Param('id') id: string,
    @Body() updateCurriculumDto: UpdateCurriculumDto,
  ) {
    return this.curriculumService.update(+id, updateCurriculumDto);
  }

  @Delete('delete-id/:id')
  remove(@Param('id') id: string) {
    return this.curriculumService.remove(+id);
  }
}
