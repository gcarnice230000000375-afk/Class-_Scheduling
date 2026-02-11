import { Module } from '@nestjs/common';
import { SemesterSettingsService } from './semester-settings.service';
import { SemesterSettingsController } from './semester-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemesterSetting } from './entities/semester-setting.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SemesterSetting])],
  controllers: [SemesterSettingsController],
  providers: [SemesterSettingsService],
})
export class SemesterSettingsModule {}
