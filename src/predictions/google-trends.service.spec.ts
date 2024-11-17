/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Test } from '@nestjs/testing';
import { GoogleTrendsService } from './google-trends.service';
import { TrendsDataService } from './trends-data.service';
import * as fs from 'fs';
import * as path from 'path';

// Create a mock for TrendsDataService
const mockTrendsDataService = {
  saveTrend: jest.fn(),
  getTrends: jest.fn(),
  // Add other methods that might be needed
};

describe('GoogleTrendsService', () => {
  let service: GoogleTrendsService;
  let testData: Array<{
    title: string;
    sparkline: string;
    expectedResult: boolean;
  }>;

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
    
    // Load test data
    const testDataPath = path.join(__dirname, '../../peak-test-data.json');
    try {
      const rawData = fs.readFileSync(testDataPath, 'utf8');
      testData = JSON.parse(rawData);
    } catch (error) {
      console.error('Error loading test data:', error);
      testData = [];
    }
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

    it('should correctly identify rising trends', () => {
      testData.forEach(({ title, sparkline, expectedResult }) => {
        const result = analyzeTrendSparkline(sparkline, title);
        
        console.log(`\nTesting trend: ${title}`);
        console.log('Expected:', expectedResult);
        console.log('Actual:', result.isRising);
        console.log('Peak Y:', result.highestPoint);
        console.log('Last Y:', result.lastPoint);
        console.log('Percentage from peak:', Math.round(result.percentageFromPeak * 100) / 100 + '%');

        expect(result.isRising).toBe(expectedResult);
      });
    });

    it('should identify flat or consistently rising trends', () => {
      const flatTrend = '-10,72 122,72';
      const result = analyzeTrendSparkline(flatTrend, 'Flat Trend');
      expect(result.isRising).toBe(true);
    });

    it('should exclude trends that peaked and dropped', () => {
      const peakAndDrop = '-10,47 14,10 138,48';
      const result = analyzeTrendSparkline(peakAndDrop, 'Peak and Drop');
      expect(result.isRising).toBe(false);
    });

    // "doug burgum"
    it('should exclude doug burgum trend', () => {
        const peakAndDrop = '-10,48 0,46 1,46 3,46 4,46 6,46 7,46 9,46 10,46 11,46 13,46 14,46 16,46 17,46 18,46 20,46 21,46 23,46 24,46 26,46 27,46 28,46 30,46 31,46 33,46 34,46 36,46 37,46 38,46 40,45 41,45 43,44 44,44 46,45 47,46 48,46 50,45 51,44 53,44 54,44 55,44 57,44 58,45 60,46 61,46 63,45 64,45 65,45 67,45 68,45 70,45 71,45 73,46 74,46 75,46 77,46 78,46 80,46 81,46 82,46 84,46 85,45 87,45 88,45 90,45 91,45 92,45 94,45 95,45 97,45 98,45 100,44 101,43 102,42 104,41 105,39 107,36 108,35 110,33 111,32 112,28 114,21 115,13 117,10 118,13 119,19 121,24 122,28 124,31 125,33 127,35 128,37 138,48';
        const result = analyzeTrendSparkline(peakAndDrop, 'Peak and Drop');
        expect(result.isRising).toBe(false);
    });

  });
});
