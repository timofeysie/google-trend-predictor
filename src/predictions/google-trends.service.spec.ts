/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Test } from '@nestjs/testing';
import { GoogleTrendsService } from './google-trends.service';
import { TrendsDataService } from './trends-data.service';
import * as path from 'path';

// Create a mock for TrendsDataService
const mockTrendsDataService = {
  saveTrend: jest.fn(),
  getTrends: jest.fn(),
  // Add other methods that might be needed
};

describe('GoogleTrendsService', () => {
  let service: GoogleTrendsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GoogleTrendsService,
        {
          provide: TrendsDataService,
          useValue: mockTrendsDataService,
        },
      ],
    }).compile();

    service = moduleRef.get(GoogleTrendsService);
  });

  describe('analyzeTrendSparkline', () => {
    let analyzeTrendSparkline: (sparkline: string, title: string) => {
      isRising: boolean;
      highestPoint: number;
      lastPoint: number;
      percentageFromPeak: number;
    };

    beforeEach(() => {
      analyzeTrendSparkline = (service as any).analyzeTrendSparkline.bind(service);
    });

    it('should include flat trends (carrot recall)', () => {
      const flatTrend = "-10,2 0,2 10,2 20,2 30,2 40,2 50,2 60,2 70,2 80,2 90,2 100,2";
      const result = analyzeTrendSparkline(flatTrend, 'Flat Trend Test');
      expect(result.isRising).toBe(true);
      expect(result.percentageFromPeak).toBe(0);
    });

    it('should include steadily rising trends (iranian supreme leader)', () => {
      const risingTrend = "-10,48 0,47 20,47 40,47 60,47 80,40 100,16 120,14 138,48";
      const result = analyzeTrendSparkline(risingTrend, 'Rising Trend Test');
      expect(result.isRising).toBe(true);
      expect(result.percentageFromPeak).toBeLessThanOrEqual(150);
    });

    it('should include moderately rising trends (knox jolie-pitt)', () => {
      const moderateRise = "-10,7 0,7 20,7 40,7 60,7 80,8 100,10 120,12 138,12";
      const result = analyzeTrendSparkline(moderateRise, 'Moderate Rise Test');
      expect(result.isRising).toBe(true);
      expect(result.percentageFromPeak).toBeLessThanOrEqual(150);
    });

    it('should include trends with steady increase (nfl playoff picture)', () => {
      const steadyIncrease = "-10,13 0,13 20,13 40,15 60,17 80,19 100,21 120,23 138,23";
      const result = analyzeTrendSparkline(steadyIncrease, 'Steady Increase Test');
      expect(result.isRising).toBe(true);
      expect(result.percentageFromPeak).toBeLessThanOrEqual(150);
    });

    it('should exclude highly volatile trends', () => {
      const volatileTrend = "-10,10 0,50 20,10 40,60 60,10 80,70 100,10 120,80 138,10";
      const result = analyzeTrendSparkline(volatileTrend, 'Volatile Trend Test');
      expect(result.isRising).toBe(false);
      expect(result.percentageFromPeak).toBeGreaterThan(150);
    });

    it('should exclude trends with extreme spikes', () => {
      const spikeTrend = "-10,10 0,10 20,10 40,100 60,10 80,10 100,10 120,10 138,10";
      const result = analyzeTrendSparkline(spikeTrend, 'Spike Trend Test');
      expect(result.isRising).toBe(false);
    });

    it('should handle invalid or empty sparkline data', () => {
      const result = analyzeTrendSparkline('', 'Empty Test');
      expect(result.isRising).toBe(false);
      expect(result.highestPoint).toBe(0);
      expect(result.lastPoint).toBe(0);
      expect(result.percentageFromPeak).toBe(0);
    });

    it('should exclude first and last points from analysis', () => {
      const trendWithOutliers = "-10,999 0,10 20,10 40,10 60,10 80,10 100,10 120,10 138,999";
      const result = analyzeTrendSparkline(trendWithOutliers, 'Outlier Test');
      expect(result.highestPoint).toBe(10); // Should ignore the 999 values
    });
  });
});
