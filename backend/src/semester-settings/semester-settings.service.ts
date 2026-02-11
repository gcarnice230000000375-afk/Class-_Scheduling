import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SemesterSetting } from './entities/semester-setting.entity';
import { CreateSemesterSettingDto } from './dto/create-semester-setting.dto';
import { UpdateSemesterSettingDto } from './dto/update-semester-setting.dto';

@Injectable()
export class SemesterSettingsService {
  constructor(
    @InjectRepository(SemesterSetting)
    private readonly semesterSettingsRepo: Repository<SemesterSetting>,
  ) {}

  create(createSemesterSettingDto: CreateSemesterSettingDto) {
    const semesterSetting = this.semesterSettingsRepo.create(
      createSemesterSettingDto,
    );
    return this.semesterSettingsRepo.save(semesterSetting);
  }

  findAll() {
    return this.semesterSettingsRepo.find();
  }

  findOne(id: number) {
    return this.semesterSettingsRepo.findOne({
      where: { semester_settings_id: id },
    });
  }

  async update(id: number, updateSemesterSettingDto: UpdateSemesterSettingDto) {
    await this.semesterSettingsRepo.update(id, updateSemesterSettingDto);
    return this.findOne(id);
  }

  async remove(semester_settings_id: number) {
    const semesterSetting = await this.findOne(semester_settings_id);
    if (!semesterSetting) {
      throw new Error(
        `SemesterSetting with ID ${semester_settings_id} not found`,
      );
    }
    return this.semesterSettingsRepo.remove(semesterSetting);
  }
}
