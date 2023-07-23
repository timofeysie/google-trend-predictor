import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
// import { TrendPredictor } from './trend-predictor';

@Controller('predictions')
export class PredictionsController {
  // private readonly trendPredictor: TrendPredictor;
  constructor(private readonly predictionsService: PredictionsService) {}

  @Post()
  create(@Body() createPredictionDto: CreatePredictionDto) {
    return this.predictionsService.create(createPredictionDto);
  }

  @Get()
  async findAll() {
    const results = this.predictionsService.findAll();
    // // Preprocess the results and extract relevant data for prediction
    // const xTrain: number[] = [];
    // const yTrain: number[] = [];
    // // Process the results and populate xTrain and yTrain with relevant data

    // // Train the model
    // const epochs = 50; // Number of training iterations
    // await this.trendPredictor.trainModel(xTrain, yTrain, epochs);

    // // Use the model to predict future trends
    // const xTest: number[] = [];
    // // Populate xTest with relevant data for prediction
    // const predictions = await this.trendPredictor.predict(xTest);

    // // You can add more logic here to interpret the predictions and make decisions

    return { results };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predictionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePredictionDto: UpdatePredictionDto,
  ) {
    return this.predictionsService.update(+id, updatePredictionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predictionsService.remove(+id);
  }
}
