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

  private analyzeTrendSparkline(sparklinePoints: string, title: string): { 
    isRising: boolean, 
    highestPoint: number,
    lastPoint: number,
    percentageFromPeak: number 
  } {
    const points = sparklinePoints.split(' ')
      .filter(pair => pair.includes(','))
      .map(pair => {
        const [x, y] = pair.split(',');
        return {
          x: parseInt(x, 10),
          y: parseInt(y, 10)
        };
      })
      .filter(point => !isNaN(point.x) && !isNaN(point.y));

    if (points.length < 2) return {
      isRising: false,
      highestPoint: 0,
      lastPoint: 0,
      percentageFromPeak: 0
    };

    // Find the peak (lowest y value)
    const peakY = Math.min(...points.map(p => p.y));
    const lastY = points[points.length - 1].y;
    
    // Calculate how much higher the last point is compared to the peak
    // Note: Higher y-value means lower trend value
    const percentageIncrease = ((lastY - peakY) / Math.abs(peakY)) * 100;
    
    // Only include if the last point hasn't increased by more than 5% from the peak
    const isRising = percentageIncrease <= 5;

    console.log(`\n=== Analyzing Trend: ${title} ===`);
    console.log('Analysis:', {
      peakY,
      lastY,
      percentageIncrease: Math.round(percentageIncrease * 100) / 100,
      isRising
    });

    return {
      isRising,
      highestPoint: peakY,
      lastPoint: lastY,
      percentageFromPeak: percentageIncrease
    };
  }

  private isTrendRelevant(sparklinePoints: string, title: string): boolean {
    const analysis = this.analyzeTrendSparkline(sparklinePoints, title);
    return analysis.isRising;
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

      const trendsData = await page.evaluate(() => {
        const trends: Array<{
          title: string;
          searchVolume: string;
          timeAgo: string;
          sparkline: string;
          timestamp: string;
        }> = [];
        
        const trendRows = document.querySelectorAll('tr.enOdEe-wZVHld-xMbwt');
        
        trendRows.forEach((row) => {
          const titleDiv = row.querySelector('.mZ3RIc');
          const title = titleDiv?.textContent?.trim() || '';

          const volumeDiv = row.querySelector('.lqv0Cb');
          const searchVolume = volumeDiv?.textContent?.trim() || '';

          const timeDiv = row.querySelector('.A7jE4');
          const timeAgo = timeDiv?.textContent?.trim() || '';

          const sparklinePath = row.querySelector('svg polyline');
          const sparkline = sparklinePath?.getAttribute('points') || '';

          if (title) {
            trends.push({
              title,
              searchVolume,
              timeAgo,
              sparkline,
              timestamp: new Date().toISOString()
            });
          }
        });

        return trends;
      });

      const relevantTrends = [];
      console.log('\nStarting trend analysis...');
      
      for (const trend of trendsData) {
        if (this.isTrendRelevant(trend.sparkline, trend.title)) {
          console.log(`\n✓ Including trend: ${trend.title}`);
          try {
            // Find all trend rows
            const rows = await page.$$('tr.enOdEe-wZVHld-xMbwt');
            
            // Find the matching row by checking the title text
            for (const row of rows) {
              const rowTitle = await row.$eval('.mZ3RIc', el => el.textContent?.trim());
              
              if (rowTitle === trend.title) {
                if (trend.title.toLowerCase() === 'netflix') {
                  console.log('Found Netflix row, clicking...');
                }
                
                await row.click();
                await page.waitForTimeout(1000);

                const details = await this.extractDetailPanelContent(page);
                relevantTrends.push({
                  ...trend,
                  details,
                  sparklineAnalysis: this.analyzeTrendSparkline(trend.sparkline, trend.title)
                });

                // Close the detail panel
                const closeButton = await page.$('.pYTkkf-Bz112c-LgbsSe[aria-label="Close"]');
                if (closeButton) {
                  await closeButton.click();
                  await page.waitForTimeout(500);
                }
                
                break; // Found and processed the row, move to next trend
              }
            }
          } catch (error) {
            console.error(`Error processing trend: ${trend.title}`, error);
          }
        } else {
          console.log(`✗ Excluding trend: ${trend.title}`);
        }
      }

      console.log('\n=== Summary ===');
      console.log(`Total trends found: ${trendsData.length}`);
      console.log(`Relevant trends: ${relevantTrends.length}`);
      if (relevantTrends.length > 0) {
        console.log('Relevant trend titles:', relevantTrends.map(t => t.title).join(', '));
      }

      return relevantTrends;

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
