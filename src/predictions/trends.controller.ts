/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { GoogleTrendsService } from './google-trends.service';
import { TrendPredictor } from './trend-predictor';

@Controller('trends')
export class TrendsController {
  private readonly trendPredictor: TrendPredictor;

  constructor(private readonly googleTrendsService: GoogleTrendsService) {
    this.trendPredictor = new TrendPredictor();
  }

  @Get('real-time')
  async getRealTimeTrends(): Promise<any> {
    const results = await this.googleTrendsService.getRealTimeTrends();

    results.forEach((result) => {
      console.log('result', result);
    })

    // Preprocess the results and extract relevant data for prediction
    const xTrain: number[] = [];
    const yTrain: number[] = [];
    // Process the results and populate xTrain and yTrain with relevant data

    // Train the model
    const epochs = 50; // Number of training iterations
    await this.trendPredictor.trainModel(xTrain, yTrain, epochs);

    // Use the model to predict future trends
    const xTest: number[] = [];
    // Populate xTest with relevant data for prediction
    // TODO
    const predictions = null; // await this.trendPredictor.predict(xTest);

    // You can add more logic here to interpret the predictions and make decisions

    return { results, predictions };
  }
}
