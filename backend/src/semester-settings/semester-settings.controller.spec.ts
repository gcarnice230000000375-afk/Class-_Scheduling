import { Test, TestingModule } from '@nestjs/testing';
import { SemesterSettingsController } from './semester-settings.controller';
import { SemesterSettingsService } from './semester-settings.service';

describe('SemesterSettingsController', () => {
  let controller: SemesterSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemesterSettingsController],
      providers: [SemesterSettingsService],
    }).compile();

    controller = module.get<SemesterSettingsController>(SemesterSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
