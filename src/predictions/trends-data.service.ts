/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TrendsDataService {
  saveTrendsDataToJson(data: any): void {
    const usWestCoastDate = this.getUsWestCoastDate();
      const usWestCoastDateWithoutTime = usWestCoastDate
        .toISOString()
        .split('T')[0];
    const fileName = `trends_data_${usWestCoastDateWithoutTime}.json`;
    const currentDirectory = process.cwd();
    const dataPath = path.join(currentDirectory, "data");
    const filePath = path.join(dataPath, fileName);
// console.log('writing data', data);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data));
      console.log(`Trends data saved to ${filePath} using US WestCoastDate`);
    } catch (err) {
      console.error('Error while saving trends data:', err);
    }
  }

  saveTrendsDataToJsonWithFilename(data: any, fileName: string): void {
    const currentDirectory = process.cwd();
    const dataPath = path.join(currentDirectory, "data");
    const filePath = path.join(dataPath, fileName);
// console.log('writing data', data);
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
}
