import { Controller, Post, Body } from '@nestjs/common';
import { LogisticRegressionService } from './logistic-regression.service';

@Controller('logistic-regression')
export class LogisticRegressionController {
  constructor(
    private readonly logisticRegressionService: LogisticRegressionService,
  ) {}

  @Post('train')
  async trainModel(
    @Body() data: { features: number[][]; labels: number[] },
  ): Promise<void> {
    const { features, labels } = data;
    if (
      !Array.isArray(features) ||
      !Array.isArray(labels) ||
      features.length === 0 ||
      labels.length === 0
    ) {
      throw new Error(
        'Invalid input data. Both features and labels must be non-empty arrays.',
      );
    }

    try {
      await this.logisticRegressionService.train(features, labels);
    } catch (error) {
      throw new Error('Error while training the model: ' + error.message);
    }
  }

  @Post('predict')
  predict(@Body() data: { features: number[][] }): number[] {
    return this.logisticRegressionService.predict(data.features);
  }
}
