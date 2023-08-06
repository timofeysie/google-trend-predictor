# Unit tests

## Fixing the tests

This one wont go away:

```err
 FAIL  src/predictions/predictions.controller.spec.ts (8.765 s)                                                                                  
  ● PredictionsController › should be defined › should be defined

    Nest can't resolve dependencies of the PredictionsController (?, TrendsDataService). Please make sure that the argument PredictionsService at index [0] is available in the RootTestModule context.

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If PredictionsService is a provider, is it part of the current RootTestModule?
    - If PredictionsService is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing PredictionsService */ ]
      })

       7 |
       8 |   beforeEach(async () => {
    >  9 |     const app: TestingModule = await Test.createTestingModule({
         |                                ^
      10 |       controllers: [PredictionsController],
      11 |       providers: [PredictionsService],
      12 |     }).compile();

      at TestingInjector.lookupComponentInParentModules (../node_modules/@nestjs/core/injector/injector.js:254:19)
      ...
```

After the initial rush of development to get the scraping of data and model training underway, the unit tests were out of date with 7 failing.  Hearing that ChatGPT was a good fit for writing unit tests, I gave it a try to see how it stacks up.  In general it was a little bit quicker than doing it the old fashioned way, which is reading the error, trying to understand that and the code causing it and trying to fix it with google/stack overflow.

However, ChatGPT failed in two cases to resolve the issues.  This is one case.

ChatGPT said this about the above error: *Apologies for the confusion. It seems there might be an issue with the test setup or module imports.*

*Let's try a different approach to mocking the PredictionsService and make sure it's properly provided in the test module. Here's how you can do it:*

*Create a mock class for PredictionsService with the necessary methods:*

We already have the mock in place.

*Update the test module to use the mock class for the PredictionsService:*

We are already doing that:

```js
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PredictionsController],
      providers: [
        { provide: 'PredictionsService', useClass: PredictionsServiceMock },
      ],
    }).compile();
```

*By using the { provide: 'PredictionsService', useClass: PredictionsServiceMock } syntax in the test module, you are providing the mock class as a replacement for the actual PredictionsService.*

*With this change, the test should pass without the error related to PredictionsService. If you still encounter any issues, please double-check your imports and ensure that all the necessary modules and dependencies are being provided correctly in the test module*

The imports are all good but the error is still the same.  So leaving it for now.  What we came for is to test the function below without the overhead of running the whole parsing process.

## Testing the trends-data.service preprocessRealTimeTrend function

I'm seeing this error in the trends-data.service preprocessRealTimeTrend function:

```err
[Nest] 30348  - 05/08/2023, 2:06:28 pm   ERROR [ExceptionsHandler] Cannot read properties of undefined (reading 'match')
TypeError: Cannot read properties of undefined (reading 'match')
    at TrendsDataService.preprocessRealTimeTrend (C:\Users\timof\repos\node\google-trend-predictor\src\predictions\trends-data.service.ts:108:45)

    at C:\Users\timof\repos\node\google-trend-predictor\src\predictions\predictions.service.ts:56:32
    at Array.forEach (<anonymous>).  Lets write a unit test to debug this function without having to run the app.  Can you show the spec for that?
```

Using a unit test, the function works when provided with a real-time trend in this format:

However, when the app is run, it fails like this:

```err
preprocessRealTimeTrend =====
err TypeError: Cannot read properties of undefined (reading 'match')
    at TrendsDataService.preprocessRealTimeTrend (C:\Users\timof\repos\node\google-trend-predictor\src\predictions\trends-data.service.ts:110:47)
    at C:\Users\timof\repos\node\google-trend-predictor\src\predictions\predictions.service.ts:56:32
    at Array.forEach (<anonymous>)
    at PredictionsService.findPossibleMajorTrends (C:\Users\timof\repos\node\google-trend-predictor\src\predictions\predictions.service.ts:54:24)
    at AppController.processData (C:\Users\timof\repos\node\google-trend-predictor\src\app.controller.ts:25:37)
    ...
```

The trend passed in:

```js
{
  title: {
    query: 'Sophia Bush',
    exploreLink: '/trends/explore?q=Sophia+Bush&date=now+7-d&geo=US'
  },
  formattedTraffic: '50K+',
  relatedQueries: [],
  image: {
    newsUrl: 'https://www.latimes.com/entertainment-arts/tv/story/2023-08-04/sophia-bush-divorce-split-grant-hughes-marriage',
    source: 'Los Angeles Times',
    imageUrl: 'https://t3.gstatic.com/images?q=tbn:ANd9GcQh74EqZ2W8AJcBfuntMdCHaZNrU67tJ6Saq-uy19UPGqglKZEdErupy-RCwAk9CAlHas62viZ8'        
  },
  articles: [
    {
      title: 'Sophia Bush files for divorce from husband Grant Hughes',
      timeAgo: '22h ago',
      source: 'Los Angeles Times',
      image: [Object],
      url: 'https://www.latimes.com/entertainment-arts/tv/story/2023-08-04/sophia-bush-divorce-split-grant-hughes-marriage',
      snippet: 'Sophia Bush has filed for divorce from husband Grant Hughes. The news comes seven weeks after Hughes and the &#39;One Tree Hill&#39; alum celebrated their first&nbsp;...'
    },
    {
      title: 'Sophia Bush Divorcing Husband Grant Hughes After 13 Months of ...',
      timeAgo: '1d ago',
      source: 'PEOPLE.com',
      image: [Object],
      url: 'https://people.com/sophia-bush-is-divorcing-husband-grant-hughes-exclusive-7570105',
      snippet: 'Sophia Bush has filed for divorce from her husband Grant Hughes after 13 months of marriage, PEOPLE can exclusively confirm.'
    },
    {
      title: 'Who is Sophia Bush&#39;s Husband Grant Hughes?',
      timeAgo: '21h ago',
      source: 'Today.com',
      image: [Object],
      url: 'https://www.today.com/popculture/news/sophia-bush-husband-grant-hughes-rcna98270',
      snippet: 'Sophia Bush has filed for divorce from husband Grant Hughes after 13 months of marriage. Here is everything we know about the actor&#39;s husband.'
    },
    {
      title: 'Sophia Bush files for divorce after 13 months of marriage',
      timeAgo: '22h ago',
      source: 'EW.com',
      image: [Object],
      url: 'https://ew.com/celebrity/sophia-bush-files-for-divorce-13-months/',
      snippet: '&#39;One Tree Hill&#39; star Sophia Bush has filed for divorce from husband Grant Hughes after 13 months of marriage, according to PEOPLE.'
    },
    {
      title: 'Chicago PD&#39;s Sophia Bush makes bold move hours after divorce news',
      timeAgo: '13h ago',
      source: 'HELLO!',
      image: [Object],
      url: 'https://www.hellomagazine.com/brides/499416/chicago-pd-sophia-bush-bold-move-hours-after-divorce-news/',
      snippet: 'Chicago PD actress Sophia Bush made a bold move only hours after news of her divorce from Grant Hughes was revealed.'       
    }
  ],
  shareUrl: 'https://trends.google.com/trends/trendingsearches/daily?geo=US&tt=Sophia+Bush#Sophia%20Bush'
}
```

That's a trend result, not a real-time trend.

This function is called from the findPossibleMajorTrends() in the predictions.service.

There was a naming issue in the app.controller which was doing both get real-time trends and get daily trends.  I thought this was a two step process.  Really, the real-time trends should be run every hour or so.

The daily trends can happen daily, whenever a day in the target local turns over and is complete.  For the US that's the end of the day on the West Coast, or would it be Hawaii?

Anyhow, I think we need to separate these.

But I'm confused.  I understand how  @Get('/process-data') gets done, but what about the /predictions API?

LOgically that would be the  @Get() async findAll() { } fn in the predictions.controller.  Harder to find when it's wired that way.

After removing the daily trends work from the app.controller however, this API runs its course without actually saving the file with the isMajorTrend flag:

```txt
/predictions API called
call googleTrends.dailyTrends with data 2023-08-04T15:00:00.000Z
formattedDate: Friday, August 4, 2023 contains 18
dailyTrendsObj[0] 18
googleDailyTrendsData 18
loaded US West Coast Yesterday Date data trends_data_2023-08-03.json
major trend: true - Steve McMichael
major trend: true - Alvin Kamara
2 saveTrendsDataToJsonWithFilename: writing to filePath C:\Users\timof\repos\node\google-trend-predictor\data\trends_data_2023-08-03.json.json
Trends data saved to C:\Users\timof\repos\node\google-trend-predictor\data\trends_data_2023-08-03.json.json using US WestCoastDate
```

Well, there's your problem: .json.json

In the compareDailyAndRealtimeTrendsData function, there is still some old code that reads the file in the function instead of using a shared util version.

This fixes the issue:

```js
     const fileName = `trends_data_${yesterdayDateWithoutTime}`;
      const fileNameWithExt = `trends_data_${yesterdayDateWithoutTime}.json`;
      const filePath = path.join(dataPath, fileNameWithExt);
      const savedData = fs.readFileSync(filePath, 'utf8');
```

Later, when we save the file, we use the util to construct the path, which should be used by all places.

Worth committing the working code first.
