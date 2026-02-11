import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';

@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Post('add-instructor')
  create(@Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorsService.create(createInstructorDto);
  }

  @Get('get-instructors')
  findAll() {
    return this.instructorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorsService.findOne(+id);
  }

  @Patch('update-instructor/:id')
  update(
    @Param('id') id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    return this.instructorsService.update(+id, updateInstructorDto);
  }

  @Delete('delete-id/:id')
  remove(@Param('id') id: string) {
    return this.instructorsService.remove(+id);
  }
}
