import { Test, TestingModule } from '@nestjs/testing';
import { ProjectedController } from './projected.controller';
import { ProjectedService } from './projected.service';

describe('ProjectedController', () => {
  let controller: ProjectedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectedController],
      providers: [ProjectedService],
    }).compile();

    controller = module.get<ProjectedController>(ProjectedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
