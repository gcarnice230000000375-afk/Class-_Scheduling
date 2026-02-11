import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SemesterSettingsService } from './semester-settings.service';
import { CreateSemesterSettingDto } from './dto/create-semester-setting.dto';
import { UpdateSemesterSettingDto } from './dto/update-semester-setting.dto';

@Controller('semester-settings')
export class SemesterSettingsController {
  constructor(
    private readonly semesterSettingsService: SemesterSettingsService,
  ) {}

  @Post('add-semester-settings')
  create(@Body() createSemesterSettingDto: CreateSemesterSettingDto) {
    return this.semesterSettingsService.create(createSemesterSettingDto);
  }

  @Get('get-semester-settings')
  findAll() {
    return this.semesterSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.semesterSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSemesterSettingDto: UpdateSemesterSettingDto,
  ) {
    return this.semesterSettingsService.update(+id, updateSemesterSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.semesterSettingsService.remove(+id);
  }
}
