import { Test, TestingModule } from '@nestjs/testing';
import { GarmentService } from './garment.service';

describe('UserService', () => {
  let service: GarmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GarmentService],
    }).compile();

    service = module.get<GarmentService>(GarmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
