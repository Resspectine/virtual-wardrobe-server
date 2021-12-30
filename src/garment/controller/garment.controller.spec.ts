import { Test, TestingModule } from '@nestjs/testing';
import { GarmentController } from './garment.controller';

describe('UserController', () => {
  let controller: GarmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GarmentController],
    }).compile();

    controller = module.get<GarmentController>(GarmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
