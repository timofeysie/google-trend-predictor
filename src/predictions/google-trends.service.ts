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
        const terms = Array.from(panel.querySelectorAll('.mUIrbf-vQzf8d')).map(
          (term) => term.textContent,
        );

        // Get related news if available
        const news = Array.from(panel.querySelectorAll('.xZCHj')).map(
          (item) => {
            const newsTitle = item.querySelector('.QbLC8c')?.textContent || '';
            const metaInfo = item.querySelector('.pojp0c')?.textContent || '';
            const imageUrl =
              item.querySelector('.QtVIpe')?.getAttribute('src') || '';
            const sourceUrl = item.getAttribute('href') || '';

            // Split meta info into time and source
            const [time, source] = metaInfo.split('●').map((s) => s.trim());

            return {
              title: newsTitle,
              url: sourceUrl,
              imageUrl: imageUrl,
              time: time,
              source: source?.replace(/Opens a new tab$/, '').trim() || '',
            };
          },
        );

        return {
          title,
          terms,
          news,
          graphData: graphSvg,
        };
      });

      return detailData;
    } catch (error) {
      console.error('Error extracting detail panel content:', error);
      return null;
    }
  }

  private analyzeTrendSparkline(
    sparklinePoints: string,
    title: string,
  ): {
    isRising: boolean;
    highestPoint: number;
    lastPoint: number;
    percentageFromPeak: number;
  } {
    if (!sparklinePoints) {
      console.log(`Warning: No sparkline data for trend: ${title}`);
      return {
        isRising: false,
        highestPoint: 0,
        lastPoint: 0,
        percentageFromPeak: 0,
      };
    }

    // Parse points and exclude first and last points
    const points = sparklinePoints
      .trim()
      .split(/\s+/) // Handle multiple spaces between points
      .filter((pair) => pair.includes(','))
      .map((pair) => {
        const [x, y] = pair.split(',');
        return {
          x: parseFloat(x),
          y: parseFloat(y),
        };
      })
      .filter((point, index, array) => {
        return (
          index !== 0 &&
          index !== array.length - 1 &&
          !isNaN(point.x) &&
          !isNaN(point.y)
        );
      });

    if (points.length < 2) {

      return {
        isRising: false,
        highestPoint: 0,
        lastPoint: 0,
        percentageFromPeak: 0,
      };
    }

    // Find the peak (lowest Y value) from the remaining points
    const highestPoint = Math.min(...points.map((p) => p.y));
    const lastPoint = points[points.length - 1];

    // Calculate percentage from peak
    const percentageFromPeak =
      ((lastPoint.y - highestPoint) / Math.abs(highestPoint)) * 100;

    // NEW LOGIC: A trend is rising if:
    // 1. It's flat (percentage change near 0)
    // 2. OR it's steadily increasing (up to 150% from peak)
    // 3. AND the last point is not too high relative to the peak
    const isFlat = Math.abs(percentageFromPeak) <= 5;
    const isSteadilyRising = percentageFromPeak > 0 && percentageFromPeak <= 150;
    const isRising = isFlat || isSteadilyRising;

    return {
      isRising,
      highestPoint,
      lastPoint: lastPoint.y,
      percentageFromPeak,
    };
  }

  private isTrendRelevant(sparklinePoints: string, title: string): boolean {
    const analysis = this.analyzeTrendSparkline(sparklinePoints, title);
    return analysis.isRising;
  }

  async getSearchTrendsViePuppeteer(): Promise<any[]> {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath:
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
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
        'status=active',
      ].join('&');

      await page.goto(realTimeTrendsUrl);
      console.log('Waiting for content...');

      // Wait for the table rows to appear
      await page.waitForSelector('tr.enOdEe-wZVHld-xMbwt', {
        timeout: 30000,
      });

      await page.waitForTimeout(5000);

      const trendsData = await page.$$eval('tr[jsname="oKdM2c"]', (rows) => {
        return rows.map((row) => {
          const title = row.querySelector('.mZ3RIc')?.textContent || '';

          // Get the polyline points from the SVG with the specific classes
          const polyline = row.querySelector('polyline.sbIkwd.nSZy3e');
          const sparkline = polyline?.getAttribute('points') || '';

          return {
            title,
            sparkline,
            // ... other fields ...
          };
        });
      });

      const relevantTrends = [];
      console.log('\nStarting trend analysis...');

      for (const trend of trendsData) {

        if (this.isTrendRelevant(trend.sparkline, trend.title)) {
          console.log(`Including trend: ${trend.title}`);
          try {
            // Find all trend rows
            const rows = await page.$$('tr.enOdEe-wZVHld-xMbwt');

            // Find the matching row by checking the title text
            for (const row of rows) {
              const rowTitle = await row.$eval('.mZ3RIc', (el) =>
                el.textContent?.trim(),
              );

              if (rowTitle === trend.title) {

                await row.click();
                await page.waitForTimeout(1000);

                const details = await this.extractDetailPanelContent(page);
                relevantTrends.push({
                  ...trend,
                  details,
                  sparklineAnalysis: this.analyzeTrendSparkline(
                    trend.sparkline,
                    trend.title,
                  ),
                });

                // Close the detail panel
                const closeButton = await page.$(
                  '.pYTkkf-Bz112c-LgbsSe[aria-label="Close"]',
                );
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
        }
      }

      if (relevantTrends.length > 0) {
        console.log(
          'Relevant trend titles:',
          relevantTrends.map((t) => t.title).join(', '),
        );
      }

      return relevantTrends;
    } catch (err) {
      console.error('Error while scraping:', err);
      if (page) {
        await page.screenshot({
          path: 'error-screenshot.png',
          fullPage: true,
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
