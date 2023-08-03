/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TrendsDataService {
  saveTrendsDataToJson(data: any): void {
    const currentDirectory = process.cwd();
    const currentDate = new Date();
    const dateWithoutTime = currentDate.toISOString().split('T')[0];
    const fileName = `trends_data_${dateWithoutTime}.json`;
    const filePath = path.join(currentDirectory, fileName);
// console.log('writing data', data);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data));
      console.log(`Trends data saved to ${filePath}`);
    } catch (err) {
      console.error('Error while saving trends data:', err);
    }
  }
}
