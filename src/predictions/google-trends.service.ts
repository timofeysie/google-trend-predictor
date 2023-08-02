/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as googleTrends from 'google-trends-api';
import config from '../../google-trends.config';
import axios from 'axios';
import cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

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

  /**
   * Perform data collection and preprocessing.
   * @param realTimeTrendsData
   * @param realTimeTrendsPageData
   */
  processData(realTimeTrendsData: any, realTimeTrendsPageData: any): void {
    console.log('realTimeTrendsPageData', realTimeTrendsPageData.length);
    // Process real-time trends data
    const parsedRealTimeTrendsData = this.parseRealTimeTrendsWitCheerio(
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

  async getSearchTrendsViePuppeteer(): Promise<string> {
    const path_to_your_chrome_executable =
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: path_to_your_chrome_executable,
    });
    console.log('puppeteer launched');
    try {
      const page = await browser.newPage();
      console.log('puppeteer page ready');
      await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9',
      });
      const realTimeTrendsUrl = `https://trends.google.com/trends/trendingsearches/realtime?geo=${config.geo}&hl=${config.hl}&category=${config.category}`;
      await page.goto(realTimeTrendsUrl);
      const trendingNowSelector = 'feed-item';
      await page.waitForSelector(trendingNowSelector, { visible: true });
      const htmlContent = await page.content();
      console.log('puppeteer htmlContent', htmlContent.length);
      fs.writeFileSync('search_trends.html', htmlContent);
      return htmlContent;
    } catch (err) {
      console.error('Error while scraping:', err);
      return '';
    } finally {
      await browser.close();
    }
  }

  private parseRealTimeTrendsWitCheerio(data: string): any {
    const $ = cheerio.load(data);
    const html = $.html();
    console.log('HTML data:', html.length);
    const titles: string[] = [];
    const sparklineData: any[][] = [];
    // Find the div with the specific attribute value containing the trending stories
    const feedItemElements = $('feed-item');
    console.log('feedItemElements', feedItemElements.length); // 0
    // Find all the "a" tags within the div
    const feedItemElementsAnchors = feedItemElements.find('a');
    console.log('trendElements', feedItemElementsAnchors.length);

    // Loop through each trend element to extract title and sparkline data
    feedItemElementsAnchors.each((index, element) => {
      const title = $(element).text().trim();
      titles.push(title);

      // Extract sparkline data from the "path" tag's "d" attribute
      const sparklinePath = $(element).siblings('path');
      console.log('sparklinePath', sparklinePath.length);
      // const sparklinePoints = this.parseSparklineData(sparklinePath);
      // sparklineData.push(sparklinePoints);
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
