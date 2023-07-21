/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as googleTrends from 'google-trends-api';
import config from '../../google-trends.config';

@Injectable()
export class GoogleTrendsService {
  async getRealTimeTrends(): Promise<any> {
    return new Promise((resolve, reject) => {
        googleTrends.realTimeTrends(config, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // You can implement other functions here to preprocess the data or add machine learning algorithms for trend prediction
}
