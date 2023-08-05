import { Test, TestingModule } from '@nestjs/testing';
import { PredictionsController } from './predictions.controller';
import { PredictionsServiceMock as PredictionsService } from './predictions.service.mock';

describe('PredictionsController', () => {
  let predictionsController: PredictionsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PredictionsController],
      providers: [PredictionsService],
    }).compile();

    predictionsController = app.get<PredictionsController>(
      PredictionsController,
    );
  });

  describe('should be defined', () => {
    it('should be defined', () => {
      expect(predictionsController).toBeDefined();
    });
  });
});
