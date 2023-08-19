/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as tf from '@tensorflow/tfjs';

@Injectable()
export class TrendsDataService {
  saveTrendsDataToJson(data: any): void {
    const usWestCoastDate = this.getUsWestCoastDate();
    const usWestCoastDateWithoutTime = usWestCoastDate
      .toISOString()
      .split('T')[0];
    const fileName = `trends_data_${usWestCoastDateWithoutTime}`;
    const filePath = this.constructPath(fileName, '.json', 'data');
    console.log('1 saveTrendsDataToJson: writing to filePath', filePath);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data));
      console.log(`Trends data saved to ${filePath} using US WestCoastDate`);
    } catch (err) {
      console.error('Error while saving trends data:', err);
    }
  }

  saveTrendsDataToJsonWithFilename(data: any, fileName: string): void {
    const filePath = this.constructPath(fileName, '.json', 'data');
    console.log(
      '2 saveTrendsDataToJsonWithFilename: writing to filePath',
      filePath,
    );
    try {
      fs.writeFileSync(filePath, JSON.stringify(data));
      console.log(`Trends data saved to ${filePath} using US WestCoastDate`);
    } catch (err) {
      console.error('Error while saving trends data:', err);
    }
  }

  saveFileWithFilenameExtensionAndDir(
    data: any,
    fileName: string,
    extension: string,
    directory: string,
  ): void {
    const filePath = this.constructPath(fileName, extension, directory);
    console.log(
      '2 saveTrendsDataToJsonWithFilename: writing to filePath',
      filePath,
    );
    try {
      fs.writeFileSync(filePath, JSON.stringify(data));
      console.log(`Trends data saved to ${filePath} using US WestCoastDate`);
    } catch (err) {
      console.error('Error while saving trends data:', err);
    }
  }

  getUsWestCoastYesterdayDate(): Date {
    const usWestCoastTimezone = 'America/Los_Angeles';
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: usWestCoastTimezone,
    });
    const formattedDate = formatter.format(currentDate);
    const usWestCoastDate = new Date(formattedDate);
    usWestCoastDate.setDate(usWestCoastDate.getDate() - 1);
    return usWestCoastDate;
  }

  getUsWestCoastDate(): Date {
    const usWestCoastTimezone = 'America/Los_Angeles';
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: usWestCoastTimezone,
    });
    const formattedDate = formatter.format(currentDate);
    const usWestCoastDate = new Date(formattedDate);
    usWestCoastDate.setDate(usWestCoastDate.getDate());
    return usWestCoastDate;
  }

  preprocessData(dataset: any[]): { features: number[][]; labels: number[] } {
    const features: number[][] = [];
    const labels: number[] = [];
    for (const dataItem of dataset) {
      if (
        typeof dataItem?.isMajorTrend !== 'undefined' &&
        dataItem?.isMajorTrend !== null
      ) {
        const label = dataItem.isMajorTrend ? 1 : 0;
        if (
          typeof dataItem?.sparkline !== 'undefined' &&
          dataItem?.sparkline !== null
        ) {
          const sparklineValues = dataItem.sparkline.match(/\d+/g).map(Number); // Use all values from sparkline as features
          features.push(sparklineValues);
          labels.push(label);
        }
      }
    }
    console.log('features', features.length);
    console.log('labels', labels.length);
    return { features, labels };
  }

  async loadAllDataAndPreprocess(
    directoryPath: string,
  ): Promise<{ features: number[][]; labels: number[] }> {
    const allData: any[] = [];

    try {
      const files = fs.readdirSync(directoryPath);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(directoryPath, file);
          const fileData = fs.readFileSync(filePath, 'utf8');
          const jsonData = JSON.parse(fileData);
          allData.push(...jsonData);
        }
      }
    } catch (err) {
      console.error('Error while loading data:', err);
    }

    // Preprocess the data
    const { features, labels } = this.preprocessData(allData);
    return { features, labels };
  }

  preprocessRealTimeTrend(trend: any): number[] {
    let features = [];
    try {
      // Extract numeric values from sparkline
      const sparklineValues = trend.sparkline.match(/\d+/g).map(Number);
      // Assuming that the sparklineValues have two elements, create a 2D array for the features
      features = [sparklineValues];
    } catch (err) {
      console.log('preprocessRealTimeTrend =====');
      console.log('err', err);
      console.log('for trend', trend);
    }
    return features;
  }

  constructPath(name: string, type: string, dir: string) {
    const fileName = name + type;
    const currentDirectory = process.cwd();
    const dataPath = path.join(currentDirectory, dir);
    const filePath = path.join(dataPath, fileName);
    return filePath;
  }

  async saveModel(model: tf.Sequential): Promise<void> {
    const modelPath = this.constructPath('test-model', '.json', 'models');
    console.log('using', modelPath);
    try {
      const modelJSON = model.toJSON();
      const modelData = JSON.stringify(modelJSON);
      await fs.promises.writeFile(modelPath, modelData);
      console.log(`Model saved to ${modelPath}`);
    } catch (err) {
      console.error('Error while saving the model:', err);
    }
  }

  async loadModel(): Promise<tf.LayersModel | null> {
    const modelPath = this.constructPath('test-model', '.json', 'models');
    // the above worked one, then gave an error: Only absolute URLs are supported

    const absolutePath =
      'C:/Users/timof/repos/node/google-trend-predictor/models/test-model.json';
    try {
      const modelData = fs.readFileSync(absolutePath, 'utf8');
      const modelJSON = JSON.parse(modelData);
      console.log(`Model loaded from ${absolutePath}`);
      return await tf.loadLayersModel(modelJSON);
    } catch (err) {
      console.error('Error while loading the model:', err);
      return null;
    }
  }
}
