import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeService } from './time.service';
import { TimeController } from './time.controller';
import { Time } from './entities/time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Time])],
  controllers: [TimeController],
  providers: [TimeService],
})
export class TimeModule {}
