/* eslint-disable prettier/prettier */
// import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';

export class TrendPredictor {
  // private model: tf.LayersModel;

  constructor() {
    // this.model = tf.sequential();
    // this.model.add(
    //   tf.layers.dense({ units: 16, inputShape: [your_input_shape_here] }),
    // );
    // // Add more layers and configure your model based on the data you'll use for prediction

    // this.model.compile({
    //   optimizer: 'adam',
    //   loss: 'meanSquaredError',
    // });
  }

  async trainModel(
    xTrain: number[],
    yTrain: number[],
    epochs: number,
  ): Promise<void> {
    // const xs = tf.tensor2d(xTrain, [xTrain.length, your_input_shape_here]);
    // const ys = tf.tensor2d(yTrain, [yTrain.length, 1]);

    // await this.model.fit(xs, ys, {
    //   epochs,
    // });

    // xs.dispose();
    // ys.dispose();
  }

//   async predict(xTest: number[]): Promise<number[]> {
//     // const xInput = tf.tensor2d(xTest, [xTest.length, your_input_shape_here]);
//     // const predictions = this.model.predict(xInput) as tf.Tensor;
//     // const result = Array.from(predictions.dataSync());
//     // xInput.dispose();
//     // predictions.dispose();
//     // return result;
//   }
}
