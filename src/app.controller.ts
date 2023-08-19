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
    console.log('=== /process-data API called');
    // Get real-time trends using puppeteer and cheerio
    const realTimeTrends =
      await this.googleTrendsService.getSearchTrendsViePuppeteer();
    console.log('realTimeTrends', realTimeTrends.length);
    // const dailyTrendsData = await this.predictionsService.findAll();
    if (realTimeTrends) {
      const possibleMajorTrends =
        await this.predictionsService.findPossibleMajorTrends(realTimeTrends);
      this.googleTrendsService.processData(realTimeTrends);
      return possibleMajorTrends;
    }
  }
}
