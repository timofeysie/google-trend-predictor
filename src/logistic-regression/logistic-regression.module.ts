import { Module } from '@nestjs/common';
import { LogisticRegressionController } from './logistic-regression.controller';
import { LogisticRegressionService } from './logistic-regression.service';
import { TrendsDataService } from '../predictions/trends-data.service';

@Module({
  controllers: [LogisticRegressionController],
  providers: [LogisticRegressionService, TrendsDataService], // Include required providers
})
export class LogisticRegressionModule {}
