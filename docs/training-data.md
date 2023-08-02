# Training data

## split the data

Training Set: The training set is the largest portion of your data and is used to train the machine learning model. It helps the model learn the underlying patterns and trends in the data. Generally, it contains the majority of the data. For example, you can use 70% of your data for training.

Validation Set: The validation set is used to tune the hyperparameters of the model and to evaluate its performance during training. It helps you to avoid overfitting by providing an independent dataset that the model hasn't seen during training. You can use 15% of your data for validation.

Test Set: The test set is used to evaluate the final performance of the trained model. This set simulates how the model will perform on new, unseen data. It is crucial for assessing the generalization ability of the model. You can also use 15% of your data for testing.

Keep in mind the following best practices:

Shuffle the data: Before splitting the data, it's essential to shuffle the data randomly. This ensures that the data points in each set come from different time periods and avoid any unintentional patterns that might arise from the original data ordering.

Preserve time order: If your data is time-series data (sequential data with a temporal order), you should split the data while preserving the time order. For example, you can use the first 70% of the timeline for training, the next 15% for validation, and the last 15% for testing.

Stratified sampling (optional): If your data is imbalanced (some classes are much rarer than others), you may consider using stratified sampling to ensure that each dataset (training, validation, test) maintains the same class distribution as the original dataset.

Once you have split your data into the training, validation, and test sets, you can use them to train your TensorFlow model, tune its hyperparameters using the validation set, and evaluate its final performance on the test set before deployment.

## How much data is needed?

Minimum Number of Search Trends: at least 1,000 to 2,000 search trends.

With around 1,000 to 2,000 diverse and relevant search trends in the dataset, we can build a simple MVP model to make initial predictions. However, please note that an MVP model may not achieve the same level of accuracy as a more robustly trained model with a larger dataset. The MVP model will serve as a starting point to test our approach, validate our assumptions, and determine the feasibility of achieving the goal.

Google publishes 20 searches over 20K+ a day.  The number of 500K+ searches varies widely, but usually only a few per day.

Adding real-time data I can see today, that Google has published 163 search trends.  Those would include the search trends over 20K+, so we don't want to double count.

At this rate, we can reach 1000 data sets in about a week, and 20000 in about two weeks.

## maximize the effectiveness of the model

Data Quality: Ensure the data the collect is clean, accurate, and properly labeled. Low-quality data can lead to poor model performance.

Feature Selection: Choose relevant features that can help capture the underlying patterns of the search trends. These features can include search volume history, time of year, keyword attributes, and any other data that might influence search trends.

Model Choice: Select a model suitable for time series forecasting or regression tasks. Linear regression, ARIMA, or simple machine learning models like Random Forest can be a good starting point.

Validation: Split the data into training and validation sets to assess the model's performance. Use metrics like Mean Absolute Error (MAE) or Root Mean Squared Error (RMSE) to evaluate how well the MVP model is doing.

Iterate and Improve: Use the insights gained from the MVP model to iterate and improve the data collection process, feature engineering, and model selection.

Remember that the MVP model is just the beginning, and achieving high accuracy for predicting rare events or extremely high search volumes like 500,000 may require additional data and more sophisticated modeling techniques. As the gather more data and validate the approach, we can gradually enhance the model's capabilities and achieve our goal more effectively.

## Decision Tree Cons

Sensitive to noisy data. It can overfit noisy data.

The small variation(or variance) in data can result in the different decision tree. This can be reduced by bagging and boosting algorithms.

Decision trees are biased with imbalance dataset, so it is recommended that balance out the dataset before creating the decision tree.

## The dataset

The current proposed data set will be the following:

```json
[
  {
    "title": "Tijjani Reijnders",
    "titles": [
      "Tijjani Reijnders",
      "A.C. Milan",
      "FC Barcelona",
      "Xavi",
      "AZ Alkmaar",
      "Stefano Pioli"
    ],
    "sparkline": "M0,98L8.695652173913043,98L17.391304347826086,98L26.08695652173913,99L34.78260869565217,99L43.47826086956522,99L52.17391304347826,99L60.86956521739131,99L69.56521739130434,99L78.26086956521739,99L86.95652173913044,99L95.65217391304348,99L104.34782608695652,99L113.04347826086956,98L121.73913043478262,98L130.43478260869566,98L139.1304347826087,98L147.82608695652172,97L156.52173913043478,96L165.2173913043478,95L173.91304347826087,93L182.6086956521739,89L191.30434782608697,46L200,0",
    "isMajorTrend": false
  },
```

The sparkline data is a time series data set for different search trends, with each entry representing a specific trend along with related search terms and a sparkline showing the trend's popularity over time.

To determine if this data set is suitable for training a Decision Tree Classifier model, consider the following points:

Data Quality: Ensure that the data is accurate, complete, and representative of the trends you want to classify.

Feature Engineering: the "isMajorTrend" boolean flag is relevant feature for classification.

Data Size: the minimum size will start at 20000 trends.

Class Balance: Check if the classes are balanced in the data set. Imbalanced classes may affect the model's performance and may require additional techniques like class weighting or resampling.

Model Evaluation: Decide on appropriate evaluation metrics to assess the performance of the Decision Tree Classifier.

Model Interpretability: Decision trees are inherently interpretable models, making it easier to understand and interpret their predictions.

The suitability of using this data for training a Decision Tree Classifier model depends on the factors mentioned above. Before proceeding with training, it's essential to preprocess the data, split it into training and testing sets, and carefully evaluate the model's performance to ensure it meets our requirements for the specific classification task.
