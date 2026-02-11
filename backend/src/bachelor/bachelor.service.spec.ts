import { Test, TestingModule } from '@nestjs/testing';
import { BachelorService } from './bachelor.service';

describe('BachelorService', () => {
  let service: BachelorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BachelorService],
    }).compile();

    service = module.get<BachelorService>(BachelorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
