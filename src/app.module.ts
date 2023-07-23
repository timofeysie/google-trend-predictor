import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredictionsModule } from './predictions/predictions.module';
import { GoogleTrendsService } from './predictions/google-trends.service'; // Import the service
import { PredictionsService } from './predictions/predictions.service';

@Module({
  imports: [PredictionsModule],
  controllers: [AppController],
  providers: [AppService, GoogleTrendsService, PredictionsService],
})
export class AppModule {}
