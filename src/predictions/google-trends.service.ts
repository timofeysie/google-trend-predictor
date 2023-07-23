/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as googleTrends from 'google-trends-api';
import config from '../../google-trends.config';
import axios from 'axios';
import cheerio from 'cheerio';

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

  async fetchRealTimeTrendsPage(): Promise<any> {
    const realTimeTrendsUrl = `https://trends.google.com/trends/trendingsearches/realtime?geo=${config.geo}&hl=${config.hl}&category=${config.category}`;
    console.log('realTimeTrendsUrl', realTimeTrendsUrl);
    try {
      const response = await axios.get(realTimeTrendsUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching real-time trends:', error);
      throw error;
    }
  }

  /**
   * Perform data collection and preprocessing.
   * @param realTimeTrendsData
   * @param realTimeTrendsPageData
   */
  processData(realTimeTrendsData: any, realTimeTrendsPageData: any): void {
    console.log('realTimeTrendsPageData', realTimeTrendsPageData.length);
    // Process real-time trends data
    const parsedRealTimeTrendsData = this.parseRealTimeTrends(
      realTimeTrendsPageData,
    );
    console.log('parsedRealTimeTrendsData', parsedRealTimeTrendsData);

    const trendingStories = realTimeTrendsData.storySummaries?.trendingStories;

    if (trendingStories) {
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
    }

    // Add data collection and preprocessing logic here
  }

  private parseRealTimeTrends(data: string): {
    titles: string[];
    sparklineData: number[][];
  } {
    const $ = cheerio.load(data);
    const titles: string[] = [];
    const sparklineData: any[][] = [];

    // Find all the elements with the class "title"
    const path = 'div.feed-item-header';
    const titleElements = $(path);
    console.log('titleElements', titleElements)
    const titles2 = titleElements.map((index, element) => $(element).text()).get();
  
    console.log('titles2', titles2)
    console.log('titleElements', titleElements.length)

    // Loop through each trend element to extract title and sparkline data
    titleElements.each((index, element) => {
      const title = $(element).text().trim();
      titles.push(title);

      // Extract sparkline data from the sibling "path" tag's "d" attribute
      const sparklinePath = $(element).siblings('path').attr('d');
      const sparklinePoints = this.parseSparklineData(sparklinePath);
      sparklineData.push(sparklinePoints);
    });

    return { titles, sparklineData };
  }

  private parseSparklineData(sparklinePath: string): number[][] {
    const points: number[][] = [];
    // Use regex to extract x, y coordinates from the sparkline path data
    const regex = /M(\d+),(\d+)L(\d+),(\d+)/g;
    let match;
    while ((match = regex.exec(sparklinePath)) !== null) {
      const x1 = parseInt(match[1]);
      const y1 = parseInt(match[2]);
      const x2 = parseInt(match[3]);
      const y2 = parseInt(match[4]);
      points.push([x1, y1], [x2, y2]);
    }
    return points;
  }

  // You can implement other functions here to preprocess the data or add machine learning algorithms for trend prediction
}
