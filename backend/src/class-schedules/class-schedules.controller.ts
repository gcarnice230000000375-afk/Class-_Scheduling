import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ClassSchedulesService } from './class-schedules.service';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';
import { ClassSchedule } from './entities/class-schedule.entity';

@Controller('class-schedules')
export class ClassSchedulesController {
  constructor(private readonly classSchedulesService: ClassSchedulesService) {}

  @Post('add-class-schedules')
  async create(
    @Body() createClassScheduleDto: CreateClassScheduleDto,
  ): Promise<ClassSchedule[]> {
    return await this.classSchedulesService.create(createClassScheduleDto);
  }

  @Get('get-class-schedules')
  async findAll(): Promise<ClassSchedule[]> {
    return await this.classSchedulesService.findAll();
  }

  // @Get('get-detailed-all')
  // async findDetailedAll(): Promise<any[]> {
  //   return await this.classSchedulesService.findWithViewAll();
  // }

  @Get('get-detailed-instructor')
  async findDetailedInstructors(): Promise<any[]> {
    return await this.classSchedulesService.findWithInstructorPrograms();
  }

  @Get('get-detailed-programs')
  async findDetailedPrograms(): Promise<any[]> {
    return await this.classSchedulesService.findWithPrograms();
  }

  @Get('get-detailed-courses')
  async findDetailedCourses(): Promise<any[]> {
    return await this.classSchedulesService.findWithCourses();
  }

  @Get('get-detailed-sections')
  async findDetailedSections(): Promise<any[]> {
    return await this.classSchedulesService.findWithSections();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid schedule ID');
    }
    return this.classSchedulesService.findOne(parsedId);
  }

  @Patch('update-class/:id')
  update(
    @Param('id') id: string,
    @Body() updateClassScheduleDto: UpdateClassScheduleDto,
  ) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid schedule ID');
    }
    return this.classSchedulesService.update(parsedId, updateClassScheduleDto);
  }

  @Delete('delete-id/:id')
  remove(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid schedule ID');
    }
    return this.classSchedulesService.remove(parsedId);
  }
}
