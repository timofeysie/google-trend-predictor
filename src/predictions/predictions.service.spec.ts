import { Test, TestingModule } from '@nestjs/testing';
import { PredictionsService } from './predictions.service';
import { TrendsDataService } from './trends-data.service'; // Import the TrendsDataService

describe('PredictionsService', () => {
  let service: PredictionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredictionsService, TrendsDataService], // Provide the TrendsDataService here
    }).compile();

    service = module.get<PredictionsService>(PredictionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
