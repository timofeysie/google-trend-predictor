import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleTrendsService } from './predictions/google-trends.service';
import { PredictionsService } from './predictions/predictions.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly googleTrendsService: GoogleTrendsService,
    private readonly predictionsService: PredictionsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/process-data')
  async processData(): Promise<any> {
    // Replace 'data' with the actual JSON data you receive from the real-time trends API
    const searchTrends =
      await this.googleTrendsService.getSearchTrendsViePuppeteer();
    const realTimeTrendsData = await this.predictionsService.findAll();
    const possibleMajorTrends =
      await this.predictionsService.findPossibleMajorTrends(realTimeTrendsData);
    this.googleTrendsService.processData(realTimeTrendsData, searchTrends);
    return possibleMajorTrends;
  }
}
