/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
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
  async parseRealTimeData(
    @Query('geo') geo?: string,
    @Query('sort') sort?: string,
    @Query('hl') hl?: string,
    @Query('recency') recency?: string,
    @Query('hours') hours?: number,
    @Query('category') category?: string,
  ) {
    const trendsData = await this.googleTrendsService.getSearchTrendsViePuppeteer({
      geo,
      sort,
      hl,
      hours,
      recency,
      category,
    });
    return {
      timestamp: new Date().toISOString(),
      data: trendsData,
    };
  }
}
