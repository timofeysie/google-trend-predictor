/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TrendsDataService } from './trends-data.service';

describe('TrendsDataService', () => {
  let service: TrendsDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrendsDataService],
    }).compile();

    service = module.get<TrendsDataService>(TrendsDataService);
  });

  it('should preprocess a real-time trend correctly', () => {
    const realTimeTrend = {
      title: 'Okoboji Bible Conference Ministries',
      titles: [
        'Okoboji Bible Conference Ministries',
        'Arnolds Park',
        'August 5',
        '2023',
        'Iowa',
      ],
      sparkline:
        'M0,69L8.695652173913043,75L17.391304347826086,71L26.08695652173913,72L34.78260869565217,69L43.47826086956522,64L52.17391304347826,54L60.86956521739131,43L69.56521739130434,41L78.26086956521739,50L86.95652173913044,45L95.65217391304348,48L104.34782608695652,47L113.04347826086956,47L121.73913043478262,44L130.43478260869566,40L139.1304347826087,37L147.82608695652172,32L156.52173913043478,26L165.2173913043478,26L173.91304347826087,22L182.6086956521739,14L191.30434782608697,9L200,0',
      trendSearchUrl:
        'https://www.nwestiowa.com/discover/be-still-and-know/article_f630b0fe-3202-11ee-aac6-dfaee578d2e6.html',
    };

    const predictedLabels = service.preprocessRealTimeTrend(realTimeTrend);

    // Perform your assertions on predictedLabels here
    // For example, you could check if it's an array with the expected length
    expect(Array.isArray(predictedLabels)).toBe(true);
    expect(predictedLabels.length).toBe(1); // Assuming the model returns a single prediction
  });
});
