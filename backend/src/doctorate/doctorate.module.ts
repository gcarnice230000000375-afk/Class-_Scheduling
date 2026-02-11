import { Module } from '@nestjs/common';
import { DoctorateService } from './doctorate.service';
import { DoctorateController } from './doctorate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctorate } from './entities/doctorate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctorate])],
  controllers: [DoctorateController],
  providers: [DoctorateService],
  exports: [DoctorateService], // ✅ Export the service
})
export class DoctorateModule {}
