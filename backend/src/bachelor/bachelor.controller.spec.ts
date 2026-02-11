import { Test, TestingModule } from '@nestjs/testing';
import { BachelorController } from './bachelor.controller';
import { BachelorService } from './bachelor.service';

describe('BachelorController', () => {
  let controller: BachelorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BachelorController],
      providers: [BachelorService],
    }).compile();

    controller = module.get<BachelorController>(BachelorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
