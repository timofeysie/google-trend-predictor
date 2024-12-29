import { Injectable } from '@nestjs/common';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import * as googleTrends from 'google-trends-api';
import config from '../../google-trends.config';
import { TrendsDataService } from './trends-data.service';
import puppeteer from 'puppeteer';

@Injectable()
export class PredictionsService {
  constructor(private readonly trendsDataService: TrendsDataService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createPredictionDto: CreatePredictionDto) {
    return 'This action adds a new prediction';
  }

  async findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      // const todaysDate = new Date();
      // const yesterdayDate =
      //   this.trendsDataService.getUsWestCoastYesterdayDate();
      const uSWCDate = this.trendsDataService.getUsWestCoastDate();
      console.log('call googleTrends.dailyTrends with data', uSWCDate);
      googleTrends.dailyTrends(
        {
          trendDate: uSWCDate,
          geo: config.geo,
        },
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            const defaultObj = JSON.parse(Object(results)).default;
            const trendingSearchesDaysArray = defaultObj.trendingSearchesDays;
            for (const day of trendingSearchesDaysArray) {
              console.log(
                'formattedDate: ' +
                  day.formattedDate +
                  ' contains ' +
                  day.trendingSearches.length,
              );
            }
            const dailyTrendsObj = JSON.parse(Object(results)).default
              .trendingSearchesDays[0].trendingSearches;
            console.log('dailyTrendsObj[0]', dailyTrendsObj.length);
            resolve(dailyTrendsObj);
          }
        },
      );
    });
  }

  async findPossibleMajorTrends(realTimeTrendsData) {
    console.log('realTimeTrendsData', realTimeTrendsData.length);
    const possibleMajorTrends = [];
    try {
      realTimeTrendsData.forEach((realTimeTrend) => {
        const result =
          this.trendsDataService.preprocessRealTimeTrend(realTimeTrend);
        console.log('result', result);
        return possibleMajorTrends;
      });
    } catch (err) {
      console.log('realTimeTrendsData err', err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} prediction`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updatePredictionDto: UpdatePredictionDto) {
    return `This action updates a #${id} prediction`;
  }

  remove(id: number) {
    return `This action removes a #${id} prediction`;
  }

  async getBrowser() {
    console.log('getBrowser called');
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath:
        process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });
    return browser;
  }
}
