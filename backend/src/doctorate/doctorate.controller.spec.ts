import { Test, TestingModule } from '@nestjs/testing';
import { DoctorateController } from './doctorate.controller';
import { DoctorateService } from './doctorate.service';

describe('DoctorateController', () => {
  let controller: DoctorateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorateController],
      providers: [DoctorateService],
    }).compile();

    controller = module.get<DoctorateController>(DoctorateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
