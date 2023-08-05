import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredictionsModule } from './predictions/predictions.module';
import { GoogleTrendsService } from './predictions/google-trends.service';
import { PredictionsService } from './predictions/predictions.service';
import { LogisticRegressionService } from './logistic-regression/logistic-regression.service';

@Module({
  imports: [PredictionsModule],
  controllers: [AppController],
  providers: [
    AppService,
    GoogleTrendsService,
    PredictionsService,
    LogisticRegressionService,
  ],
})
export class AppModule {}
