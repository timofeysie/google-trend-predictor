import { Test, TestingModule } from '@nestjs/testing';
import { LogisticRegressionService } from './logistic-regression.service';
import { TrendsDataService } from '../predictions/trends-data.service'; // Import the TrendsDataService

describe('LogisticRegressionService', () => {
  let service: LogisticRegressionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogisticRegressionService, TrendsDataService], // Provide the TrendsDataService here
    }).compile();

    service = module.get<LogisticRegressionService>(LogisticRegressionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
