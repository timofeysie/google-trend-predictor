/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as googleTrends from 'google-trends-api';
import config from '../../google-trends.config';
import axios from 'axios';
import cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { TrendsDataService } from './trends-data.service';


@Injectable()
export class GoogleTrendsService {

  constructor(
    private readonly trendsDataService: TrendsDataService,
  ) {}

  async getRealTimeTrends(): Promise<any> {
    return new Promise((resolve, reject) => {
      googleTrends.dailyTrends(
        {
          trendDate: new Date(),
          geo: config.geo,
        },
        function (err, results) {
          if (err) {
            return err;
          } else {
            const defaultObj = JSON.parse(Object(results)).default
              .trendingSearchesDays[0].trendingSearches;
            return defaultObj;
          }
        }
      );
    });
  }

  /**
   * Perform data collection and preprocessing.
   * @param dailyTrendsData
   * @param realTimeTrendsPageData
   */
  processData(realTimeTrendsPageData: any): void {
    console.log('realTimeTrendsPageData', realTimeTrendsPageData.length);
    // Process real-time trends data
    const parsedRealTimeTrendsData = this.parseRealTimeTrendsWitCheerio(
      realTimeTrendsPageData,
    );
    console.log('parsedRealTimeTrendsData', parsedRealTimeTrendsData.length);
    if (parsedRealTimeTrendsData.length > 0) {
      this.trendsDataService.saveTrendsDataToJson(parsedRealTimeTrendsData);
    }

    // const trendingStories = dailyTrendsData.storySummaries?.trendingStories;

    // if (trendingStories) {
    //   const trendingEntities = trendingStories.map((story) =>
    //     story.entityNames.join(', '),
    //   );
    //   const trendingTitles = trendingStories.map((story) => story.title);
    //   const trendingUrls = trendingStories.map((story) => story.shareUrl);

    //   // For example, you can filter stories that contain certain keywords
    //   const keywordToFilter = 'quantum';
    //   const filteredTrendingStories = trendingStories.filter(
    //     (story) =>
    //       story.title.toLowerCase().includes(keywordToFilter) ||
    //       story.entityNames.includes(keywordToFilter),
    //   );
    // }

    // Add data collection and preprocessing logic here
  }

  async getSearchTrendsViePuppeteer(): Promise<string> {
    const path_to_your_chrome_executable =
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: path_to_your_chrome_executable,
    });

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
      await new Promise((resolve) => setTimeout(resolve, 6000));

      // Function to check if the "Load more" button is present on the page
      async function isLoadMoreButtonPresent() {
        return await page.evaluate(() => {
          return Boolean(document.querySelector('.feed-load-more-button'));
        });
      }

      // Function to click the "Load more" button and wait for a few seconds
      async function clickLoadMoreAndWait() {
        await page.click('.feed-load-more-button');
        await page.waitForTimeout(3000); // Adjust the wait time (in milliseconds) as needed
      }

      let loadMoreButtonPresent = await isLoadMoreButtonPresent();

      while (loadMoreButtonPresent) {
        await clickLoadMoreAndWait();
        loadMoreButtonPresent = await isLoadMoreButtonPresent();
        console.log('loadMoreButtonPresent');
      }

      const htmlContent = await page.content();
      console.log('puppeteer htmlContent', htmlContent.length);
      return htmlContent;
    } catch (err) {
      console.error('Error while scraping:', err);
      return '';
    } finally {
      console.log('awaiting browser close');
      await browser.close();
    }
  }

  private parseRealTimeTrendsWitCheerio(htmlContent: string): any {
    const $ = cheerio.load(htmlContent);

      // Function to extract sparkline data from a feed item
      function getSparklineData(feedItem): string {
        return feedItem.find('.sparkline-chart path').attr('d');
      }

      // Function to extract titles data from a feed item
      function getTitlesData(feedItem): string[] {
        const titles = [];
        feedItem.find('.title a').each((index, element) => {
          titles.push($(element).text().trim());
        });
        return titles;
      }

      const trendsData = [];

      // Loop through each feed item and extract the required data
      $('feed-item').each((index, element) => {
        const title = $(element).find('.title a').first().text().trim();
        const sparkline = getSparklineData($(element));
        const titles = getTitlesData($(element));
        const trendSearchUrl = $(element).find('.summary-text a').attr('href');


        const trendObject = {
          title,
          titles,
          sparkline,
          trendSearchUrl,
        };
        trendsData.push(trendObject);
      });

      return trendsData;
  }

}
