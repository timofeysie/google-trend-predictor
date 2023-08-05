import { Test, TestingModule } from '@nestjs/testing';
import { LogisticRegressionController } from './logistic-regression.controller';
import { LogisticRegressionService } from './logistic-regression.service'; // Import the LogisticRegressionService
import { TrendsDataService } from '../predictions/trends-data.service'; // Import the TrendsDataService

describe('LogisticRegressionController', () => {
  let controller: LogisticRegressionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogisticRegressionController],
      providers: [LogisticRegressionService, TrendsDataService], // Provide the LogisticRegressionService and TrendsDataService here
    }).compile();

    controller = module.get<LogisticRegressionController>(
      LogisticRegressionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
