import { Injectable } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';
import { TrendsDataService } from '../predictions/trends-data.service';

@Injectable()
export class LogisticRegressionService {
  private model: tf.Sequential;

  constructor(private readonly trendsDataService: TrendsDataService) {
    this.model = tf.sequential();
    this.model.add(
      tf.layers.dense({ units: 1, inputShape: [2], activation: 'sigmoid' }),
    );
    const learningRate = 0.1;
    const optimizer = tf.train.sgd(learningRate);
    this.model.compile({ optimizer, loss: 'binaryCrossentropy' });
  }

  async train(trainData: number[][], trainLabels: number[]): Promise<void> {
    const xs = tf.tensor2d(trainData);
    const ys = tf.tensor1d(trainLabels);
    await this.model.fit(xs, ys, { epochs: 100 });
    await this.trendsDataService.saveModel(this.model);
  }

  predict(features: number[][]): number[] {
    const inputs = tf.tensor2d(features);
    const predictions = this.model.predict(inputs) as tf.Tensor;
    const predictedLabels = Array.from(predictions.dataSync());
    predictions.dispose();
    inputs.dispose();
    return predictedLabels;
  }
}
