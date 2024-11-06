import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredictionsModule } from './predictions/predictions.module';
import { GoogleTrendsService } from './predictions/google-trends.service';
import { TrendsDataService } from './predictions/trends-data.service';
import { PredictionsService } from './predictions/predictions.service';
import { LogisticRegressionModule } from './logistic-regression/logistic-regression.module';

@Module({
  imports: [PredictionsModule, LogisticRegressionModule],
  controllers: [AppController],
  providers: [
    AppService,
    GoogleTrendsService,
    PredictionsService,
    TrendsDataService,
  ],
})
export class AppModule {}
