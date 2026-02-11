import { Module } from '@nestjs/common';
import { ClassSchedulesService } from './class-schedules.service';
import { ClassSchedulesController } from './class-schedules.controller';
import { ClassSchedule } from './entities/class-schedule.entity';
import { Instructor } from 'src/instructors/entities/instructor.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Section } from 'src/sections/entities/section.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      ClassSchedule,
      Instructor,
      Room,
      Section,
    ]),
  ],
  controllers: [ClassSchedulesController],
  providers: [ClassSchedulesService],
})
export class ClassSchedulesModule {}
