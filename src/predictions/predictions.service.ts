import { Injectable } from '@nestjs/common';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import * as googleTrends from 'google-trends-api';
import config from '../../google-trends.config';

@Injectable()
export class PredictionsService {
  create(createPredictionDto: CreatePredictionDto) {
    return 'This action adds a new prediction';
  }

  async findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      googleTrends.dailyTrends(
        {
          trendDate: new Date(),
          geo: config.geo,
        },
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            const dailyTrendsObj = JSON.parse(Object(results)).default
              .trendingSearchesDays[0].trendingSearches;
            console.log('dailyTrendsObj', dailyTrendsObj.length);
            resolve(dailyTrendsObj);
          }
        },
      );
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} prediction`;
  }

  update(id: number, updatePredictionDto: UpdatePredictionDto) {
    return `This action updates a #${id} prediction`;
  }

  remove(id: number) {
    return `This action removes a #${id} prediction`;
  }
}
