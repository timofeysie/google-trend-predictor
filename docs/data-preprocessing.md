# data preprocessing

Our training dataset has properties like this:

```json
 {
    "title": "Republican Party",
    "titles": [
      "Republican Party",
      "Debate",
      "Fox Nation",
      "Sweepstake",
      "Republican National Committee"
    ],
    "sparkline": "M0,83L8.695652173913043,84L17.391304347826086,83L26.08695652173913,87L34.78260869565217,89L43.47826086956522,91L52.17391304347826,87L60.86956521739131,94L69.56521739130434,94L78.26086956521739,89L86.95652173913044,84L95.65217391304348,50L104.34782608695652,83L113.04347826086956,78L121.73913043478262,86L130.43478260869566,81L139.1304347826087,84L147.82608695652172,86L156.52173913043478,85L165.2173913043478,85L173.91304347826087,73L182.6086956521739,74L191.30434782608697,68L200,0",
    "isMajorTrend": false
  },
  {
    "title": "NFL",
    "titles": [
      "NFL",
      "Wild Card Series",
      "National Football League Playoffs",
      "Playoffs",
      "Super Bowl",
      "American Football Conference",
      "Playing card game"
    ],
    "sparkline": "M0,79L8.695652173913043,79L17.391304347826086,80L26.08695652173913,79L34.78260869565217,80L43.47826086956522,79L52.17391304347826,81L60.86956521739131,82L69.56521739130434,87L78.26086956521739,89L86.95652173913044,76L95.65217391304348,78L104.34782608695652,74L113.04347826086956,75L121.73913043478262,71L130.43478260869566,68L139.1304347826087,62L147.82608695652172,62L156.52173913043478,61L165.2173913043478,60L173.91304347826087,57L182.6086956521739,49L191.30434782608697,25L200,0",
    "isMajorTrend": true
  },
```

To do this we need a pre-process function to convert the json data into the tensoflow format:

preprocessData(dataset: any[]): { features: number[][], labels: number[] } { }

And a way to load all the json files in the data directory.

loadAllDataAndPreprocess(directoryPath: string): Promise<{ features: number[][], labels: number[] }> { }

The initial response is this:

```txt
               165,  2173913043478,              63,             173,
    91304347826087,             33,             182,   6086956521739,
                 0,            191,  30434782608697,              43,
               200,            100
  ],
  ... 616 more items
]
labels [
  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
  ... 616 more items
]
[Nest] 29056  - 05/08/2023, 8:42:51 am   ERROR [ExceptionsHandler] input expected a batch of elements where each example has shape [2] (i.e.,tensor shape [*,2]) but the input received an input with 716 examples, each with shape [70] (tensor shape [716,70])
Error: input expected a batch of elements where each example has shape [2] (i.e.,tensor shape [*,2]) but the input received an input with 716 examples, each with shape [70] (tensor shape [716,70])
    at new ValueError (C:\Users\timof\repos\node\google-trend-predictor\node_modules\@tensorflow\tfjs\tfjs-layers\src\errors.ts:48:5)
    at standardizeInputData (C:\Users\timof\repos\node\google-trend-predictor\node_modules\@tensorflow\tfjs\tfjs-layers\src\engine\training.ts:170:17)
```

## Real-time trends

We want to get the Real-time trends at a certain interval.  The add them to a file of that date without too much duplication.
