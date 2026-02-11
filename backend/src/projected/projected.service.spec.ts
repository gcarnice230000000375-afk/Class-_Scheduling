import { Test, TestingModule } from '@nestjs/testing';
import { ProjectedService } from './projected.service';

describe('ProjectedService', () => {
  let service: ProjectedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectedService],
    }).compile();

    service = module.get<ProjectedService>(ProjectedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
