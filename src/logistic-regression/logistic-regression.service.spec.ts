import { Test, TestingModule } from '@nestjs/testing';
import { LogisticRegressionService } from './logistic-regression.service';

describe('LogisticRegressionService', () => {
  let service: LogisticRegressionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogisticRegressionService],
    }).compile();

    service = module.get<LogisticRegressionService>(LogisticRegressionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
