import { Test, TestingModule } from '@nestjs/testing';
import { LogisticRegressionController } from './logistic-regression.controller';

describe('LogisticRegressionController', () => {
  let controller: LogisticRegressionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogisticRegressionController],
    }).compile();

    controller = module.get<LogisticRegressionController>(LogisticRegressionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
