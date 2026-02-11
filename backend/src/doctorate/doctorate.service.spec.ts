import { Test, TestingModule } from '@nestjs/testing';
import { DoctorateService } from './doctorate.service';

describe('DoctorateService', () => {
  let service: DoctorateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorateService],
    }).compile();

    service = module.get<DoctorateService>(DoctorateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
