import { Test, TestingModule } from '@nestjs/testing';
import { SemesterSettingsService } from './semester-settings.service';

describe('SemesterSettingsService', () => {
  let service: SemesterSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemesterSettingsService],
    }).compile();

    service = module.get<SemesterSettingsService>(SemesterSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
