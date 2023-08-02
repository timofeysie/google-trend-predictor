import { Module } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { PredictionsController } from './predictions.controller';
import { TrendsDataService } from './trends-data.service';

@Module({
  controllers: [PredictionsController],
  providers: [PredictionsService, TrendsDataService],
  exports: [TrendsDataService],
})
export class PredictionsModule {}
