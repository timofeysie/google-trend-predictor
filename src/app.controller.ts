import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleTrendsService } from './predictions/google-trends.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly googleTrendsService: GoogleTrendsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('realtime-data')
  async getRealTimeData() {
    return await this.googleTrendsService.getRealTimeTrends();
  }

  @Get('parse-realtime-data')
  async parseRealTimeData() {
    const trendsData =
      await this.googleTrendsService.getSearchTrendsViePuppeteer();
    return {
      timestamp: new Date().toISOString(),
      data: trendsData,
    };
  }
}
