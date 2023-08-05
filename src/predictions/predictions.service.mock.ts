/* eslint-disable prettier/prettier */
export class PredictionsServiceMock {
  async findAll(): Promise<any> {
    // Return a predefined value that simulates the real behavior of the service
    return [];
  }

  async findPossibleMajorTrends(data: any): Promise<any> {
    // Return a predefined value that simulates the real behavior of the service
    return [];
  }
}
