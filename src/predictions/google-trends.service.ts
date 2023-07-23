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

  processData(data: any): void {
    // Perform data collection and preprocessing here
    const trendingStories = data.storySummaries.trendingStories;
    console.log('Trending Stories:', trendingStories);

    const trendingEntities = trendingStories.map((story) =>
      story.entityNames.join(', '),
    );
    const trendingTitles = trendingStories.map((story) => story.title);
    const trendingUrls = trendingStories.map((story) => story.shareUrl);

    // For example, you can filter stories that contain certain keywords
    const keywordToFilter = 'quantum';
    const filteredTrendingStories = trendingStories.filter(
      (story) =>
        story.title.toLowerCase().includes(keywordToFilter) ||
        story.entityNames.includes(keywordToFilter),
    );

    // Add your data collection and preprocessing logic here

    // You can also call other methods or services for further processing or model prediction
    this.someOtherMethod(filteredTrendingStories);
  }

  private someOtherMethod(filteredTrendingStories: any[]): void {
    // Add your additional processing or model prediction logic here
    console.log('Performing additional processing...');
  }

  // You can implement other functions here to preprocess the data or add machine learning algorithms for trend prediction
}
