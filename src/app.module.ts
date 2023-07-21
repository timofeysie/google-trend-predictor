import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredictionsModule } from './predictions/predictions.module';

@Module({
  imports: [PredictionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
