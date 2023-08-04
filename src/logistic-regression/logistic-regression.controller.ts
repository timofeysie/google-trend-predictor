import { Controller, Post, Body } from '@nestjs/common';
import { LogisticRegressionService } from './logistic-regression.service';

@Controller('logistic-regression')
export class LogisticRegressionController {
  constructor(
    private readonly logisticRegressionService: LogisticRegressionService,
  ) {}

  @Post('train')
  async trainModel(
    @Body() trainData: number[][],
    @Body() trainLabels: number[],
  ): Promise<string> {
    try {
      await this.logisticRegressionService.trainModel(trainData, trainLabels);
      return 'Model trained successfully!';
    } catch (error) {
      throw new Error('Error while training the model: ' + error.message);
    }
  }

  @Post('predict')
  predict(@Body() data: number[][]): number[] {
    return this.logisticRegressionService.predict(data);
  }
}
