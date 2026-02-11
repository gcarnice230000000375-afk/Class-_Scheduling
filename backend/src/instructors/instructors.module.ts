import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { Instructor } from './entities/instructor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bachelor } from 'src/bachelor/entities/bachelor.entity';
import { Master } from 'src/master/entities/master.entity';
import { Doctorate } from 'src/doctorate/entities/doctorate.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Instructor, Bachelor, Master, Doctorate]),
  ],
  controllers: [InstructorsController],
  providers: [InstructorsService],
})
export class InstructorsModule {}
