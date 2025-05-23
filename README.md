<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Google Trends Predictor

This NestJS application is used to predict if a Google Trends search will become a major trend.

It has used a number of ML models to predict the outcome, as well as a brute force approach by looking at the sparkline data.

It is deployed in a Docker container on an AWS EC2 instance.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

http://localhost:3001/process-data <-- parses the real-time trends and saves them to a file.

http://localhost:3001/predictions <-- loads daily trends and compares to the above

GET http://localhost:3001/logistic-regression <-- train the logistic regression model on data loaded from files

POST http://localhost:3001/logistic-regression/train <-- train the dataset from the payload body

POST http://localhost:3001/logistic-regression/predict <-- predict a major trend from the payload

GET http://localhost:3001/parse-realtime-data returns JSON data containing all the trends and their details (see service for params)

With params: https://api.mcayreserve.com/parse-realtime-data?geo=US&hours=24&category=all&type=all&sort=relevance

## Real Time Trends

We get the results of two data sources and merge then together for the model training data.

These two sources are the arguments to the ```processData(realTimeTrendsData: any, realTimeTrendsPageData: any)``` function.

## Nest Workflow

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

## Local Docker Workflow

```sh
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker image 
docker image prune -a
docker build -t google-trend-predictor . --progress=plain
docker run -p 3001:3001 google-trend-predictor
docker run -p 3001:3001 --init google-trend-predictor # when running locally
docker run -d -p 3001:3001 --init google-trend-predictor
```

Note the -d flag determines whether the container runs in the background or foreground
The --init flag adds proper process signal handling

### Container Shutdown if Ctrl+C doesn't work, in a new terminal

```sh
docker ps # list all running containers
docker stop <container_name>
```

### Clean Up Before Rebuilding

```sh
# Remove stopped containers
docker rm $(docker ps -a -q)
docker rm $(docker ps -a -q --filter ancestor=google-trend-predictor)

# Remove unused images
docker image prune -a

# Or for a complete cleanup (including volumes and networks)
docker system prune -a
docker system prune -f
```

### Rebuild and Run

```sh
# Build with no cache (when you've changed the Dockerfile)
docker build --no-cache -t google-trend-predictor .

# Run with proper shutdown signal handling
docker run -p 3001:3001 --init google-trend-predictor
```

## EC2 Docker Workflow

### Updating the EC2 instance

#### Copy to EC2

```sh
# From your local Windows PowerShell
cd C:\Users\timof\repos\node

# Create clean copy without node_modules
mkdir temp-deploy
robocopy google-trend-predictor temp-deploy /E /XD node_modules .git

# Copy to EC2
scp -i "../../gtp.pem" -r temp-deploy ec2-user@ec2-54-252-243-219.ap-southeast-2.compute.amazonaws.com:~/google-trend-predictor

# Clean up local temp folder
Remove-Item -Recurse -Force temp-deploy
```

#### Rebuild and Restart on EC2

```sh
# SSH into EC2
ssh -i "../../gtp.pem" ec2-user@ec2-54-252-243-219.ap-southeast-2.compute.amazonaws.com

# Stop existing container
docker ps  # get container ID
docker stop <container-id>

# Rebuild and run
cd google-trend-predictor
docker build -t google-trend-predictor .
docker run -d -p 3001:3001 --init google-trend-predictor
```

#### Restart everything

```sh
docker stop $(docker ps -q --filter ancestor=google-trend-predictor)
# Run Docker with CloudWatch logging
docker run -d --rm -p 3001:3001 --init \
  --log-driver=awslogs \
  --log-opt awslogs-region=ap-southeast-2 \
  --log-opt awslogs-group=/aws/ec2/google-trend-predictor \
  --log-opt awslogs-create-group=true \
  google-trend-predictor

# Restart nginx
sudo nginx -t
sudo systemctl restart nginx
docker logs $(docker ps -q --filter ancestor=google-trend-predictor) --tail 100
```

#### Edit the nginx config

```sh
sudo nano /etc/nginx/nginx.conf
```

### Decision Tree Classifier

The idea is to retrieve real-time trends from the Google Trends API and use a machine learning model to predict if a search trend will become a major trend with over 500,000 searches.

We'll need to gather relevant data for training the model, fine-tune the model, and perform testing and validation to achieve accurate predictions.

Below is an outline of the data gathering and creation process.

#### 1. Data Collection

Collect data from the Google Trends API (realTimeTrendsData) and the web page (realTimeTrendsPageData).
Match the trends in both data sources to create a unified dataset.

#### 2. Data Preprocessing

Clean the data: Handle missing values, remove duplicates, and ensure consistency.
Extract relevant features from both sources. Some possible features include:

- Trend title
- Entity names
- URLs of news articles or sources
- Image URLs (if needed for any analysis)
- Trending status (whether it crossed 500,000 searches or not)

#### 3. Data Labeling

For the unified dataset, we'll need to label each trend to indicate whether it became a major trend (with over 500,000 searches) or not. This information can be gathered using the dailyTrends API once a day.

#### 4. Data Storage

Store the preprocessed and labeled data in a structured format, such as a CSV file or a database, for easy retrieval during model training.  We will start with json files on the local for now.

#### 5. Model Training

Split the dataset into training and testing sets.
Train the Decision Tree Classifier on the training set using the relevant features as input and the trend's status (major trend or not) as the output label.

#### 6. Model Evaluation

Evaluate the trained model's performance on the testing set to assess its accuracy and other relevant metrics.

#### 7. Model Use

Once the model is trained and evaluated, we can use it to make predictions on new data.

### Brief of the Dataset

The dataset should contain rows, where each row represents a trend, and columns represent features and labels. Here's how a brief snapshot of the dataset might look:

```md
--------------------------------------------------------------------
| Trend Title              | Entity Names           | IsMajorTrend |
--------------------------------------------------------------------
| Chelsea F.C.             | Football, Sports       | 1            |
| Quantum Computing        | Technology, Science    | 0            |
| Travis Scott             | Music, Entertainment   | 1            |
| ...                      | ...                    | ...          |
--------------------------------------------------------------------
```

In this example, the dataset includes a "Trend Title" column representing the title of each trend, an "Entity Names" column containing related entities, and an "IsMajorTrend" column (the label) with a value of 1 if the trend became a major trend and 0 otherwise.

#### Data Collection

Gather historical search trend data for multiple search trends. For each search trend, collect features that might be relevant for prediction. Features could include attributes like the number of searches at different time intervals, the trend's category, previous trend performance, related news articles, etc.

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

This will be parsed using Cheerio to get the trend titles and the graph of search volume over time.

### Daily Trends

This data can be used to mark the above data as either major trend or not.  If the saved titles appear on the daily trends list, then they did indeed become major searches.

If they do not appear on the list, then the are marked as not major trends.

#### Data Preprocessing

Clean and pre-process the collected data to make it suitable for training the machine learning model. This may involve handling missing values, encoding categorical features, scaling numerical features, and splitting the data into training and testing sets.

### Mathematical approach

Instead of using tensore-flow, isn't there a mathematical way to take sparkline data like this and determine programmatically if a trend has incremental growth potential?

One common approach is to use time series analysis techniques to identify patterns and trends in the data. Here's a high-level outline of how we can approach this programmatically:

Data Preparation:
Extract the data points from the <path> element and convert them into a time series dataset. In our case, it seems like the data points are represented as a series of (x, y) coordinates in the SVG path. We need to parse the coordinates and create a time series with the appropriate time intervals (assuming each point represents a specific time).

Time Series Analysis:
Once we have the time series data, we can perform various time series analysis techniques to determine if the trend has incremental growth potential. Some common methods include:

Moving Averages: Calculate the moving average of the time series to smooth out noise and identify trends.
Trend Decomposition: Decompose the time series into its components like trend, seasonality, and residuals to analyze the trend separately.
Autocorrelation: Check for any significant correlation between the time series and its past lags, which indicates persistence in the trend.
Incremental Growth Potential Assessment:
Based on the analysis from the time series techniques, we can programmatically determine if the trend exhibits incremental growth potential. Look for characteristics such as steady upward movement, increasing trend values over time, and minimal or no significant fluctuations.

Threshold Determination:
To identify if the trend has incremental growth potential, we might need to define specific thresholds or rules based on the domain or problem requirements. For example, we could set a minimum percentage increase over a specific time period to classify a trend as having incremental growth potential.

Alerting Mechanism:
Depending on our use case, we can implement an alerting mechanism to trigger notifications or actions when a trend is identified as having incremental growth potential. This can be useful for real-time monitoring or decision-making purposes.

It's important to note that time series analysis can be complex, and the best approach will depend on the nature of our data and the specific problem we are trying to solve. Additionally, while mathematical and statistical methods can provide valuable insights, they might not capture all aspects of more complex trends. In such cases, machine learning techniques like those offered by TensorFlow could be beneficial.

Keep in mind that analyzing and predicting trends in real-world data can be challenging, and it's often a combination of multiple approaches and domain expertise that yields the most accurate results.

### Rising  "Breakout" searches

relatedQueries: Users searching for our term also searched for these queries. The following metrics are returned:

Top - The most popular search queries. Scoring is on a relative scale where a value of 100 is the most commonly searched query, 50 is a query searched half as often, and a value of 0 is a query searched for less than 1% as often as the most popular query.
Rising - Queries with the biggest increase in search frequency since the last time period. Results marked "Breakout" had a tremendous increase, probably because these queries are new and had few (if any) prior searches.

## Daily Trends implementation

Here is the call to get this data.

```js
    return googleTrends.dailyTrends(
      {
        trendDate: new Date(),
        geo: 'US',
      },
      function (err, results) {
        if (err) {
          return err;
        } else {
          const defaultObj = JSON.parse(Object(results)).default
            .trendingSearchesDays[0].trendingSearches;
          return defaultObj;
        }
      }
    );
```

It will be used to annotate the data with a IsMajorTrend boolean.

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
