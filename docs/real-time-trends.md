# Real Time Trends

## The API

GET http://localhost:3000/parse-realtime-data returns JSON data containing all the trends and their details.

In google-trends.config.ts the default values are:

```ts
export default {
  geo: 'US',
  category: 'all',
  hl: "en-AU",
  recency: "active",
  hours: 24/4/48/168,
  sort: "relevance (significant & recent trends)"/search-volume"/"title"/"recency"
};
```

The defaults are shown as the first value.

To use the URL with different parameters, you can simply add query parameters to the endpoint URL. Here are some examples:

### Replace just the geo location to get trends from Australia

```http://localhost:3000/parse-realtime-data?geo=AU```

### Change multiple parameters (geo to UK and language to British English)

```http://localhost:3000/parse-realtime-data?geo=GB&hl=en-GB```

### Change the category (e.g., to "entertainment")

```http://localhost:3000/parse-realtime-data?category=e```

### Combine multiple parameters

```http://localhost:3000/parse-realtime-data?geo=IN&hl=en-IN&category=n&sort=newest```

### Some common values

- geo: US, KR, GB, AU, IN, CA, etc. (country codes)
- hl: en-US, en-GB, en-AU, es, fr, etc. (language codes)
- category:
  - all (All categories)
  - b (Business)
  - 4 (Entertainment)
  - m (Health)
  - 18 (Sci/Tech)
  - s (Sports)
  - n (Top Stories)

You can test these URLs in your browser, Postman, or any other HTTP client.

## Sample Result

```json
{
    "timestamp": "2024-11-20T11:04:44.151Z",
    "data": [
        {
            "title": "jay leno",
            "sparkline": "-10,48 0,47 1,47 3,47 4,47 6,47 7,47 9,47 10,47 11,47 13,46 14,46 16,45 17,45 18,45 20,45 21,44 23,44 24,44 26,44 
            ...
            118,12 119,15 121,18 122,20 124,19 125,17 127,16 128,17 138,48",
            "details": {
                "title": "jay leno",
                "terms": [
                    "jay leno accident",
                    "jay leno fall",
                    "what happened to jay leno"
                ],
                "news": [
                    {
                        "title": "Jay Leno Says He Injured Face in Nasty Fall, Wears Eye Patch",
                        "url": "https://www.tmz.com/2024/11/19/jay-leno-injured-face-after-fall-wears-eye-patch/",
                        "imageUrl": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQVwzC1L3pVKjl2fJnY5NZgw8hNBWabjD8Of8zTitCt6jUcIz59DWrpOl5h1vk",
                        "time": "17 hours ago",
                        "source": "TMZ"
                    },
                    ...
                ],
                "graphData": "<svg width=\"100%\" aria-label=\"Search interest graph\" height=\"190\" viewBox=\"0 0 375 190\"><line class=\"fNzu9c\" x1=\"1\" y1=\"1\" x2=\"374\" y2=\"1\"></line><line class=\"fNzu9c\" x1=\"1\" y1=\"48\" x2=\"374\" y2=\"48\"></line><line class=\"fNzu9c\" x1=\"1\" y1=\"95\" x2=\"374\" y2=\"95\"></line><line class=\"fNzu9c\" x1=\"1\" y1=\"142\" x2=\"374\" y2=\"142\"></line><line class=\"vi1oL\" x1=\"1\" y1=\"189\" x2=\"374\" y2=\"189\"></line><line y1=\"1\" class=\"fNzu9c\" x1=\"1\" x2=\"1\" y2=\"189\"></line><line y1=\"1\" class=\"fNzu9c\" x1=\"125\" x2=\"125\" y2=\"189\"></line><line y1=\"1\" class=\"fNzu9c\" x1=\"250\" x2=\"250\" y2=\"189\"></line><line y1=\"1\" class=\"fNzu9c\" x1=\"374\" x2=\"374\" y2=\"189\"></line><polyline class=\"EATUte\" points=\"2,188 6,188 10,188 14,188 18,188 23,188 27,188 31,188 35,187 39,185 43,182 47,181 51,
                ...
                 340,41 344,45 348,58 352,72 357,78 361,75 365,69 369,64 373,68\"></polyline></svg>"
            },
            "sparklineAnalysis": {
                "isRising": true,
                "highestPoint": 11,
                "lastPoint": 17,
                "percentageFromPeak": 54.54545454545454
            }
        },
        ...
    ]
}
```

When collecting the results for the JSON response, we also need to include items in the main trend row before puppeteer opens the detail view, which includes Search volume, started and trend breakdown values.

```json
{
    "title": "browns vs steelers",
    "sparkline": ... 
    "searchVolume": "1M+ searches",
    "trendStatus": "Active",
    "timeAgo": "22 hrs ago",
    "trendPercentage": "1,000%",
    "breakdownTerms": [
        "browns",
        "steelers",
        "cleveland browns"
    ],
    "details": {},
    "sparklineAnalysis": {}
}
```
