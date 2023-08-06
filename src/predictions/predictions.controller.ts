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
import { TrendsDataService } from './trends-data.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('predictions')
export class PredictionsController {
  constructor(
    private readonly predictionsService: PredictionsService,
    private readonly trendsDataService: TrendsDataService,
  ) {}

  @Post()
  create(@Body() createPredictionDto: CreatePredictionDto) {
    return this.predictionsService.create(createPredictionDto);
  }

  @Get()
  async findAll() {
    console.log('/predictions API called');
    const googleTrendsData = await this.predictionsService.findAll();
    const processedTrendsData = await this.compareDailyAndRealtimeTrendsData(
      googleTrendsData,
    );
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

    return { processedTrendsData };
  }

  /**
   * Open the saved real-time trends data of the same data and add the isMajorTrend: true flag
   * to real-time trends that also appear on the daily top trends list.  Other trends will be false.
   * @param googleDailyTrendsData asdf
   * @returns asdf
   */
  async compareDailyAndRealtimeTrendsData(googleDailyTrendsData: any) {
    console.log('googleDailyTrendsData', googleDailyTrendsData.length);
    try {
      const yesterdayDate =
        this.trendsDataService.getUsWestCoastYesterdayDate();
      const yesterdayDateWithoutTime = yesterdayDate
        .toISOString()
        .split('T')[0];
      const currentDirectory = process.cwd();
      const dataPath = path.join(currentDirectory, 'data');
      const fileName = `trends_data_${yesterdayDateWithoutTime}`;
      const fileNameWithExt = `trends_data_${yesterdayDateWithoutTime}.json`;

      const filePath = path.join(dataPath, fileNameWithExt);

      const savedData = fs.readFileSync(filePath, 'utf8');
      console.log('loaded US West Coast Yesterday Date data', fileName);
      const parsedSavedData = JSON.parse(savedData);

      for (const savedTrend of parsedSavedData) {
        // Check if the title of the savedTrend exists in googleTrendsData
        const matchingTrend = googleDailyTrendsData.find(
          (trend) => trend.title.query === savedTrend.title,
        );

        if (matchingTrend) {
          // If the title is found in googleTrendsData, set isMajorTrend to true
          savedTrend.isMajorTrend = true;
        } else {
          // If the title is not found in googleTrendsData, set isMajorTrend to false
          savedTrend.isMajorTrend = false;
        }
        if (savedTrend.isMajorTrend) {
          console.log(
            `major trend: ${savedTrend.isMajorTrend} - ${savedTrend.title}`,
          );
        }
        // console.log('savedTrend', savedTrend);
      }

      this.trendsDataService.saveTrendsDataToJsonWithFilename(
        parsedSavedData,
        fileName,
      ); // Pass the updated data here

      // Now trendsData has the "isMajorTrend" field added to each trend.
      // You can save it back to the file if needed.

      return { result: 'done' };
    } catch (err) {
      console.error('Error while processing trends data:', err);
      return [];
    }
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
