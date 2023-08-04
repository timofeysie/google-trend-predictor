import { Injectable } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';

@Injectable()
export class LogisticRegressionService {
  private model: tf.Sequential;

  constructor() {
    // Initialize the model
    this.model = tf.sequential();
    this.model.add(
      tf.layers.dense({ units: 1, inputShape: [2], activation: 'sigmoid' }),
    );
    this.model.compile({
      optimizer: 'sgd',
      loss: 'binaryCrossentropy',
      metrics: ['accuracy'],
    });
  }

  // Train the model with the provided training data and labels
  async trainModel(
    trainData: number[][],
    trainLabels: number[],
  ): Promise<void> {
    const xs = tf.tensor2d(trainData);
    const ys = tf.tensor1d(trainLabels);

    await this.model.fit(xs, ys, { epochs: 100 });

    xs.dispose();
    ys.dispose();
  }

  // Make predictions on new data
  predict(data: number[][]): number[] {
    const inputTensor = tf.tensor2d(data);
    const predictions = this.model.predict(inputTensor) as tf.Tensor;
    const predictionData = predictions.dataSync(); // Convert Float32Array to regular array

    predictions.dispose(); // Clean up the tensor to avoid memory leaks

    return Array.from(predictionData); // Convert Float32Array to regular array
  }
}
