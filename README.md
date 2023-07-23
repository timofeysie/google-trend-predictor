<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Google Trends Predictor

## Workflow

```bash
npm install
nest generate resource
npm run start
npm run start:dev
npm run start:prod
npm run test
npm run test:e2e
npm run test:cov
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

http://localhost:3000/process-data

## Real Time Trends

We get the results of two data sources and merge then together for the model training data.

These two sources are the arguments to the ```processData(realTimeTrendsData: any, realTimeTrendsPageData: any)``` function.

### realTimeTrendsData

Using the [google trends api](https://www.npmjs.com/package/google-trends-api#realTimeTrends) to get current real-time trending data.

Example results:

```json
{
   "featuredStoryIds":[
      
   ],
   "trendingStoryIds":[
      "US_lnk_7E8AhgAAAADsSM_en",
      "US_lnk_VuUchwAAAABK4M_en",
      "US_lnk_6PschwAAAAD0_M_en",
      ...
      "US_lnk_ktXjhgAAAABx0M_en",
      "US_lnk_csIrhwAAAABZxM_en",
      "US_lnk_YcIFhgAAAABkxM_en"
   ],
   "storySummaries":{
      "featuredStories":[
         
      ],
      "trendingStories":[
         {
            "image":{
               "newsUrl":"https://panhandle.newschannelnebraska.com/story/49213002/severe-thunderstorm-warning-northeastern-cheyenne-county",
               "source":"PANHANDLE - NEWS CHANNEL NEBRASKA",
               "imgUrl":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcREw9IokIqdJMR1JeZyS1njGN5hUc13Di78P0Y9wRiv9w8cTcko5_eUYUCu-FQ"
            },
            "shareUrl":"https://trends.google.com/trends/trendingsearches/realtime?id=US_lnk_7E8AhgAAAADsSM_en&category=all&geo=US#US_lnk_7E8AhgAAAADsSM_en",
            "articles":[
               {
                  "articleTitle":"Severe thunderstorm warning: northeastern Cheyenne County",
                  "url":"https://panhandle.newschannelnebraska.com/story/49213002/severe-thunderstorm-warning-northeastern-cheyenne-county",
                  "source":"PANHANDLE - NEWS CHANNEL NEBRASKA",
                  "time":"2 days ago",
                  "snippet":"IMPACT...People and animals outdoors will be injured. Expect hail damage to \nroofs, siding, windows, and vehicles. Expect wind"
               }
            ],
            "idsForDedup":[
               "/m/01p90g /m/01q4np",
               "/m/01p90g /m/0jb2l",
               "/m/01q4np /m/0jb2l"
            ],
            "id":"US_lnk_7E8AhgAAAADsSM_en",
            "title":"Thunderstorm, Severe thunderstorm warning, National Weather Service",
            "entityNames":[
               "Thunderstorm",
               "Severe thunderstorm warning",
               "National Weather Service"
            ]
         },
         {
            "image":{
               "newsUrl":"https://hypebeast.com/2023/7/travis-scott-bad-bunny-the-weeknd-new-single-kpop-release-date-info",
               "source":"Hypebeast",
               "imgUrl":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQS7TmScXGUF7u2R6cDt4MgoqSjX0S0r0AN58FIbLyucXpQ4F3Bw12ADEkAEec"
            },
            "shareUrl":"https://trends.google.com/trends/trendingsearches/realtime?id=US_lnk_rTjvhgAAAABCPM_en&category=all&geo=US#US_lnk_rTjvhgAAAABCPM_en",
            "articles":[
               {
                  "articleTitle":"Travis Scott New Single \"KPOP\" Release Info",
                  "url":"https://hypebeast.com/2023/7/travis-scott-bad-bunny-the-weeknd-new-single-kpop-release-date-info",
                  "source":"Hypebeast",
                  "time":"1 day ago",
                  "snippet":"Travis Scott continues to kick off his UTOPIA rollout with the announcement \nof the first single “KPOP.” The forthcoming track is set to..."
               },
               ...
            ],
            "idsForDedup":[
               "/g/11gdq15782 /m/02yh8l",
               "/g/11gdq15782 /m/0gjdn4c",
               "/g/11gdq15782 /m/0sghzm9",
               "/m/02yh8l /m/0gjdn4c",
               "/m/02yh8l /m/0sghzm9",
               "/m/0gjdn4c /m/0sghzm9"
            ],
            "id":"US_lnk_rTjvhgAAAABCPM_en",
            "title":"Travis Scott, Bad Bunny, The Weeknd, K-pop",
            "entityNames":[
               "Travis Scott",
               "Bad Bunny",
               "The Weeknd",
               "K-pop"
            ]
         },
         {
            "image":{
               "newsUrl":"https://www.tomshardware.com/news/russian-company-presents-16-qubit-quantum-computing-qpu-to-vladimir-putin",
               "source":"Tom's Hardware",
               "imgUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbDdBnJvfmPJhxKh8Q7vlxcHaybdpXSneNIjUOISidl38A_7Vp9Dc_M_FS8A"
            },
            "shareUrl":"https://trends.google.com/trends/trendingsearches/realtime?id=US_lnk_2FkAhwAAAADYXM_en&category=all&geo=US#US_lnk_2FkAhwAAAADYXM_en",
            "articles":[
               {
                  "articleTitle":"Russian Company Presents 16-qubit Quantum Computer to Vladimir Putin",
                  "url":"https://www.tomshardware.com/news/russian-company-presents-16-qubit-quantum-computing-qpu-to-vladimir-putin",
                  "source":"Tom's Hardware",
                  "time":"1 day ago",
                  "snippet":"Rosatom at the Forum for Future Technologies in Moscow, Russia showcased \nwhat it says is a working, 16-qubit quantum computer based on..."
               }
            ],
            "idsForDedup":[
               "/m/01lps /m/069kd",
               "/m/01lps /m/06b3x",
               "/m/01lps /m/06bnz",
               "/m/01lps /m/08193",
               "/m/069kd /m/06b3x",
               "/m/069kd /m/06bnz",
               "/m/069kd /m/08193",
               "/m/06b3x /m/06bnz",
               "/m/06b3x /m/08193",
               "/m/06bnz /m/08193"
            ],
            "id":"US_lnk_2FkAhwAAAADYXM_en",
            "title":"Quantum computing, Russia, Computing, Vladimir Putin, Qubit",
            "entityNames":[
               "Quantum computing",
               "Russia",
               "Computing",
               "Vladimir Putin",
               "Qubit"
            ]
         }
      ]
   },
   "date":"Jul 21, 2023",
   "hideAllImages":false
}
```

### realTimeTrendsPageData

### ML Approach

The idea is to retrieve real-time trends from the Google Trends API and use a simple machine learning model (Decision Tree Classifier in this example) to predict if a search trend will become a major trend with over 500,000 searches.

This is a simplified example, and in a real-world scenario, you'll need to gather relevant data for training the model, fine-tune the model, and perform rigorous testing and validation to achieve accurate predictions.

#### Data Collection

Gather historical search trend data for multiple search trends. For each search trend, collect features that might be relevant for prediction. Features could include attributes like the number of searches at different time intervals, the trend's category, previous trend performance, related news articles, etc.

#### Data Preprocessing

Clean and pre-process the collected data to make it suitable for training the machine learning model. This may involve handling missing values, encoding categorical features, scaling numerical features, and splitting the data into training and testing sets.

### Mathmatical approach

Instead of using tensore-flow, isn't there a mathematical way to take sparkline data like this and determine programmatically if a trend has incremental growth potential?

One common approach is to use time series analysis techniques to identify patterns and trends in the data. Here's a high-level outline of how you can approach this programmatically:

Data Preparation:
Extract the data points from the <path> element and convert them into a time series dataset. In your case, it seems like the data points are represented as a series of (x, y) coordinates in the SVG path. You need to parse the coordinates and create a time series with the appropriate time intervals (assuming each point represents a specific time).

Time Series Analysis:
Once you have the time series data, you can perform various time series analysis techniques to determine if the trend has incremental growth potential. Some common methods include:

Moving Averages: Calculate the moving average of the time series to smooth out noise and identify trends.
Trend Decomposition: Decompose the time series into its components like trend, seasonality, and residuals to analyze the trend separately.
Autocorrelation: Check for any significant correlation between the time series and its past lags, which indicates persistence in the trend.
Incremental Growth Potential Assessment:
Based on the analysis from the time series techniques, you can programmatically determine if the trend exhibits incremental growth potential. Look for characteristics such as steady upward movement, increasing trend values over time, and minimal or no significant fluctuations.

Threshold Determination:
To identify if the trend has incremental growth potential, you might need to define specific thresholds or rules based on the domain or problem requirements. For example, you could set a minimum percentage increase over a specific time period to classify a trend as having incremental growth potential.

Alerting Mechanism:
Depending on your use case, you can implement an alerting mechanism to trigger notifications or actions when a trend is identified as having incremental growth potential. This can be useful for real-time monitoring or decision-making purposes.

It's important to note that time series analysis can be complex, and the best approach will depend on the nature of your data and the specific problem you are trying to solve. Additionally, while mathematical and statistical methods can provide valuable insights, they might not capture all aspects of more complex trends. In such cases, machine learning techniques like those offered by TensorFlow could be beneficial.

Keep in mind that analyzing and predicting trends in real-world data can be challenging, and it's often a combination of multiple approaches and domain expertise that yields the most accurate results.

### Rising  "Breakout" searches

relatedQueries: Users searching for your term also searched for these queries. The following metrics are returned:

Top - The most popular search queries. Scoring is on a relative scale where a value of 100 is the most commonly searched query, 50 is a query searched half as often, and a value of 0 is a query searched for less than 1% as often as the most popular query.
Rising - Queries with the biggest increase in search frequency since the last time period. Results marked "Breakout" had a tremendous increase, probably because these queries are new and had few (if any) prior searches.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
