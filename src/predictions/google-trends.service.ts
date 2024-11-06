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
  constructor(private readonly trendsDataService: TrendsDataService) {}

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
        },
      );
    });
  }

  /**
   * Perform data collection and preprocessing.
   * @param dailyTrendsData
   * @param realTimeTrendsPageData
   */
  processData(trendsData: any[]): void {
    console.log('Processing trends data:', trendsData.length);
    if (trendsData.length > 0) {
      this.trendsDataService.saveTrendsDataToJson(trendsData);
    }
  }

  private async extractDetailPanelContent(page: puppeteer.Page) {
    try {
      await page.waitForSelector('.EMz5P', { timeout: 5000 });
      
      const detailData = await page.evaluate(() => {
        const panel = document.querySelector('.EMz5P');
        if (!panel) return null;

        // Get the trend title
        const title = panel.querySelector('.VBeVke')?.textContent || '';
        
        // Get the graph data
        const graphSvg = panel.querySelector('svg')?.outerHTML || '';
        
        // Get the breakdown terms
        const terms = Array.from(panel.querySelectorAll('.mUIrbf-vQzf8d'))
          .map(term => term.textContent);

        // Get related news if available
        const news = Array.from(panel.querySelectorAll('.xZCHj'))
          .map(item => {
            const newsTitle = item.querySelector('.QbLC8c')?.textContent || '';
            const metaInfo = item.querySelector('.pojp0c')?.textContent || '';
            const imageUrl = item.querySelector('.QtVIpe')?.getAttribute('src') || '';
            const sourceUrl = item.getAttribute('href') || '';

            // Split meta info into time and source
            const [time, source] = metaInfo.split('●').map(s => s.trim());

            return {
              title: newsTitle,
              url: sourceUrl,
              imageUrl: imageUrl,
              time: time,
              source: source?.replace(/Opens a new tab$/, '').trim() || '',
            };
          });

        return {
          title,
          terms,
          news,
          graphData: graphSvg
        };
      });

      return detailData;
    } catch (error) {
      console.error('Error extracting detail panel content:', error);
      return null;
    }
  }

  async getSearchTrendsViePuppeteer(): Promise<any[]> {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    });
    let page;

    try {
      page = await browser.newPage();
      console.log('puppeteer page ready');
      
      await page.setViewport({ width: 1280, height: 800 });
      await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9',
      });

      const realTimeTrendsUrl = [
        'https://trends.google.com/trends/trendingsearches/realtime?',
        `geo=${config.geo}`,
        `hl=${config.hl}`,
        `category=${config.category}`,
        'status=active'
      ].join('&');
      
      await page.goto(realTimeTrendsUrl);
      console.log('Waiting for content...');

      // Wait for the table rows to appear
      await page.waitForSelector('tr.enOdEe-wZVHld-xMbwt', { 
        timeout: 30000 
      });

      await page.waitForTimeout(5000);

      const trends = [];
      
      // Get all trend rows
      const rows = await page.$$('tr.enOdEe-wZVHld-xMbwt');
      console.log(`Found ${rows.length} trend rows`);
      
      for (const row of rows) {
        try {
          // Get basic trend data
          const basicData = await page.evaluate((rowEl) => {
            const titleDiv = rowEl.querySelector('.mZ3RIc');
            const volumeDiv = rowEl.querySelector('.lqv0Cb');
            const timeDiv = rowEl.querySelector('.A7jE4');
            const sparklinePath = rowEl.querySelector('svg polyline');

            return {
              title: titleDiv?.textContent?.trim() || '',
              searchVolume: volumeDiv?.textContent?.trim() || '',
              timeAgo: timeDiv?.textContent?.trim() || '',
              sparkline: sparklinePath?.getAttribute('points') || '',
              timestamp: new Date().toISOString()
            };
          }, row);

          // Click the row to open detail panel
          await row.click();
          await page.waitForTimeout(1000);

          // Extract the detail content
          const details = await this.extractDetailPanelContent(page);

          trends.push({
            ...basicData,
            details
          });

          // Close the detail panel if it's open
          const closeButton = await page.$('.pYTkkf-Bz112c-LgbsSe[aria-label="Close"]');
          if (closeButton) {
            await closeButton.click();
            await page.waitForTimeout(500);
          }

        } catch (error) {
          console.error('Error processing trend row:', error);
        }
      }

      console.log(`Processed ${trends.length} trending items with details`);
      return trends;

    } catch (err) {
      console.error('Error while scraping:', err);
      if (page) {
        await page.screenshot({ 
          path: 'error-screenshot.png',
          fullPage: true 
        });
      }
      return [];
    } finally {
      if (page) {
        await page.waitForTimeout(2000);
      }
      await browser.close();
    }
  }
}
