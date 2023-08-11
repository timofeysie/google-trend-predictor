# Real-time data parsing

## Source data

The source retrieved from the https://trends.google.com/trends/trendingsearches/realtime?geo=US&hl=en-AU&category=all call will have a list of trending searches that we want to parse to collect structured data for training the model.

The list of trends is contained within a div element containing the  css class "homepage-trending-stories"

Each trend will have a title that will be in an element like this:

```html
<a ng-href="/trends/explore?q=/m/023fb&amp;date=now+7-d&amp;geo=US" ng-attr-title="{{::titlePart.hoverMessage}}" track="['Trending Searches ' + ctrl.currentFeedItemType, 'click', 'item title: ' + titlePart.text]" href="/trends/explore?q=/m/023fb&amp;date=now+7-d&amp;geo=US" title="Explore Chelsea F.C.">Chelsea F.C.
</a>
```

## The sparkline

It is a small graph and will be in an associated svg path tag that looks like this:

```html
<path ng-attr-d="M{{ ::svgPath }}" ng-attr-stroke-width="{{ thickness }}" stroke="#4284f3" vector-effect="non-scaling-stroke" d="M0,98L8.695652173913043,98L17.391304347826086,98L26.08695652173913,99L34.78260869565217,99L43.47826086956522,99L52.17391304347826,99L60.86956521739131,99L69.56521739130434,97L78.26086956521739,96L86.95652173913044,95L95.65217391304348,96L104.34782608695652,95L113.04347826086956,95L121.73913043478262,95L130.43478260869566,94L139.1304347826087,93L147.82608695652172,93L156.52173913043478,91L165.2173913043478,87L173.91304347826087,45L182.6086956521739,0L191.30434782608697,24L200,6" stroke-width="2"></path>
```

We need to create a list of titles and the x/y data contained in the sparkline which represents a graph showing the number of searches for the trend over the past 24 hours.

### The big graph

The big data chart starts at the fe-combo-chart-directive chart.

```html
<fe-combo-chart-directive
    class="fe-combo-chart-directive"
    options="ctrl.options"
    columns="ctrl.chartColumns"
    data="ctrl.chartRows"
    >
```

## Getting the title

The trend items are a list of html elements that can be targeted by their class names.

```html
<div class="feed-item-header">
  <div class="details">
      <div class="details-top">
          <div class="title"
```

However, the content retrieved from using cheerio $.html() looks like this:

```js
{"id":"WS","name":"Samoa"},{"id":"SM","name":"San Marino"},{"id":"ST","name":"São Tomé \u0026 Príncipe"},{"id":"SA","name":"Saudi Arabia"},{"id":"SN","name":"Senegal"},{"id":"RS","name":"Serbia"},{"id":"SC","name":"Seychelles"},{"id":"SL","name":"Sierra Leone"},{"id":"SG","name":"Singapore"},{"id":"SX","name":"Sint Maarten"},{"id":"SK","name":"Slovakia"},
...
]; var localePicker = {"en_US":"English (United States)","en_GB":"English (United kingdom)","ar":"العربية","iw":"עברית","zh_CN":"中文（中国）","zh_TW":"中文（台灣）"}; var catPicker = [{"id":"all","name":"All categories"},{"id":"b","name":"Business"},{"id":"e","name":"Entertainment"},{"id":"m","name":"Health"},{"id":"t","name":"Sci/Tech"},{"id":"s","name":"Sports"},{"id":"h","name":"Top stories"}]; var weekPicker = [{"id":"2023-07-25","name":"Tue, 25 July"},{"id":"2023-07-24","name":"Mon, 24 July"},{"id":"2023-07-23","name":"Sun, 23 July"},{"id":"2023-07-22","name":"Sat, 22 July"},{"id":"2023-07-21","name":"Fri, 21 July"},{"id":"2023-07-20","name":"Thu, 20 July"},{"id":"2023-07-19","name":"Wed, 19 July"},{"id":"2023-07-18","name":"Tue, 18 July"},{"id":"2023-07-17","name":"Mon, 17 July"}]; var locale = 'en-AU'; var xsrfToken = "xsrfToken"; var analyticsAccount = 'UA-4401283-1'; var tagManagerAccount = 'G-VWZPXDNJJB'; var userEmail = ''; var gvizMapDomain = ''; var electionsPresidentStoryId = 'election2016'; var electionsVpStoryId = 'election2016vp'; var electionsTicketStoryId = 'election2016ticket'; var useTremoloTheme =  true ; var serpLinkInExplore =  true ; var serpLinkInFeeds =  true ; var uxrSurveyLink = ''; var uxrSurveyLinkSupportedLanguages = ''; var yearInSearchVideoEmbedUrls = {"2010":{"default":"https://www.youtube.com/embed/F0QXB5pw2qE"},"2011":{"default":"https://www.youtube.com/embed/SAIEamakLoY"},"2012":{"default":"https://www.youtube.com/embed/xY_MUB8adEQ"},"2013":{"default":"https://www.youtube.com/
...
9241c8167d546d5636877134746ef5817af50458a3332f9cbc15778609a58a3e.jpg"}; var enableAdvancedComparison =  false ; var clientSideCacheStrategy = 'disabled'; var clientSideCacheDurationInMilliseconds =   3600000.0 ; var clientSideCacheBuildHash = '3349_RC01' || 'constant-resource-version'; var defaultGeo = 'KR'; var recaptchaSiteKey = '6LfnfJYaAAAAAGZJh3AZH1Xmkg7dIj3IP5-xz19W'; var enableRecaptcha =  true ; var enableRisingItemsByDefaultExperiment = true; CLOSURE_NO_DEPS = true; null </script><link href="https://fonts.googleapis.com/css?family=Roboto:100%2C300%2C400%2C500" rel="stylesheet" type="text/css" nonce="x5jv-wdgmnqNC7QVf1K9aA"><link href="https://fonts.googleapis.com/css?family=Roboto+Mono:500" rel="stylesheet" type="text/css" nonce="x5jv-wdgmnqNC7QVf1K9aA"><link href="https://fonts.googleapis.com/css?
...
position:relative;text-align:center;text-decoration:none;text-transform:uppercase;white-space:nowrap;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none} 
...
-webkit-transform:scale(0.5);-ms-transform:scale(0.5);-o-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:left 0;-webkit-transform-origin:left 0;-ms-transform-origin:left 0;-o-transform-origin:left 0;transform-origin:left 0}.gb_A .gb_6a::before{-webkit-transform:scale(scale(0.416666667));-webkit-transform:scale(scale(0.416666667));-ms-transform:scale(scale(0.416666667));-o-transform:scale(scale(0.416666667));transform:scale(scale(0.416666667))}}.gb_k:hover,.gb_k:focus{-webkit-box-shadow:0 1px 0 rgba(0,0,0,.15);-moz-box-shadow:0 1px 0 rgba(0,0,0,.15);
...
null,null,["5061451","google\\.(com|ru|ca|by|kz|com\\.mx|com\\.tr)$",1]],[1,1,null,27043,60,"KOR","en","548603857.0",8,0.009999999776482582,0,0,null,null,null,null,"",null,null,null,"BNO-ZIaSHbOGseMPzfa3IA",0,0,0,null,2,5,"sd",39,0,0,0,0,1],[[null,null,null,"https://www.gstatic.com/og/_/js/k=og.qtm.en_US.LOF-_SR_9oM.es5.O/rt=j/m=qabr,q_dnp,qapid,q_dg/exm=qaaw,qadd,qaid,qein,qhaw,qhba,qhbr,qhch,qhga,qhid,qhin/d=1/ed=1/rs=AA2YrTubZvrOeMnz8IvxIXc1wDm-q0tgxA"]]]],};this.gbar_=this.gbar_||{};(function(_){var window=this;
try{
/*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var sa,Ja,Ka,La,Ma,Ua,Wa,Va,Za,ab,$a,bb,cb,jb,nb,ob,pb,qb,rb,sb,ub,vb,zb;_.aa=function(a,b){if(Error.captureStackTrace)Error.captureStackTrace(this,_.aa);else{var c=Error().stack;c&&(this.stack=c)}a&&(this.message=String(a));void 0!==b&&(this.cause=b)};
...
_.Ca=function(a){return Ba&&null!=a&&a instanceof Uint8Array};_.Da=function(a){return Array.prototype.slice.call(a)};_.Ga=function(a){var b=(0,_.Ea)(a);1!==(b&1)&&(Object.isFrozen(a)&&(a=_.Da(a)),(0,_.Fa)(a,b|1));return a};_.Ia=function(a){(0,_.Ha)(a,1);return a};Ja=function(a,b){(0,_.Fa)(b,(a|0)&-51)};Ka=function(a,b){(0,_.Fa)(b,(a|18)&-41)};La=function(a)
...
wb=yb.a;break a}catch(a){}wb=!1}vb=wb?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError("e`"+a);return a}:null}zb=vb;
_.y=function(a,b){a.prototype=ub(b.prototype);a.prototype.constructor=a;if(zb)zb(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.U=b.prototype};
```

This is becuase the page is an app with Javascript that makes API calls and reacts accordingly to the responses.  It appears to be an Angular application by all the "ng-if" statements I see.  So just getting the source for the page doesn't give us the markup it eventually produces.

To get past this hurdle, we can use Puppeteer, a Node.js library that provides a high-level API to control headless Chrome or Chromium browsers. It allows you to programmatically interact with a page, including executing JavaScript, waiting for dynamic content to load, and extracting data after the page has fully rendered.  The steps before using Cheerio would be:

1. Load the Page: Puppeteer can open a headless browser and navigate to the Google Trends page.
2. Wait for Dynamic Content: Since the search trend data is dynamically loaded, we can use Puppeteer to wait until the content is fully loaded before extracting it.
3. Extract Data: Puppeteer can access and manipulate the page's DOM, allowing us to extract the search trend data once it's available.

## The Sinead example

There is only one path that has a large amount of data.

```html
<path
    d="M36.08974358974359,263.523102310231L49.26923076923077,263.523102310231L62.44871794871795,263.523102310231L75.62820512820512,263.523102310231L88.8076923076923,263.523102310231L101.98717948717949,263.523102310231L115.16666666666666,263.523102310231L128.34615384615384,263.523102310231L141.52564102564102,263.523102310231L154.7051282051282,263.523102310231L167.8846153846154,263.523102310231L181.06410256410257,263.523102310231L194.24358974358972,263.523102310231L207.4230769230769,263.523102310231L220.6025641025641,263.523102310231L233.78205128205127,263.523102310231L246.96153846153845,263.523102310231L260.14102564102564,263.523102310231L273.3205128205128,263.523102310231L286.5,263.523102310231L299.6794871794872,263.523102310231L312.85897435897436,263.523102310231L326.03846153846155,263.523102310231L339.21794871794873,263.523102310231L352.39743589743586,263.523102310231L365.57692307692304,263.523102310231L378.7564102564102,263.523102310231L391.9358974358974,263.523102310231L405.1153846153846,263.523102310231L418.29487179487177,263.523102310231L431.47435897435895,263.523102310231L444.65384615384613,263.523102310231L457.8333333333333,263.523102310231L471.0128205128205,263.523102310231L484.1923076923077,263.523102310231L497.37179487179486,263.523102310231L510.55128205128204,263.523102310231L523.7307692307693,113.35808580858088L536.9102564102564,32.5"
    stroke="#4285f4"
    stroke-width="4"
    fill-opacity="1"
    fill="none"
></path>
```

I suppose there must be some indication that will differentiate it from other paths that are part of the chart structure like axis details like this one:

```html
<path
    d="M530,263.523102310231L543,263.523102310231"
    stroke="#eeeeee"
    stroke-width="4"
    fill-opacity="1"
    fill="none"
></path>
```

## The Sinéad O'Connor example

Although in the browser, I can capture the tag which contains the Sinéad example, when I save the file as html, it's not there.  When I save the file scraped by puppeteer, the the string "Sinéad O'Connor" is not there.  So why does the inspected html in the browser not match the file save as html data or the puppeteer markup data?

There could be a few reasons for this discrepancy:

Dynamic Content: As mentioned before, the content on the page might be loaded dynamically using JavaScript. Puppeteer, by default, only captures the initial HTML content, and it might not wait for dynamic content to load fully. This can result in the <md-content> tag not being present in the content retrieved by Puppeteer.

Asynchronous Content Loading: The content inside the <md-content> tag might be loaded asynchronously after the initial page load. Puppeteer's page.content() method may not reflect those changes if they occur after the initial page retrieval.

User Agent or Device Detection: Some websites serve different content based on the user agent or device type. It's possible that the website serves different HTML to Puppeteer, which could be missing the <md-content> tag.

Geolocation-based Content: Websites may show different content based on the user's geolocation. If Puppeteer is not set up to use a specific geolocation, the website might provide different content.

To further investigate the issue, you can try the following:

Wait for Dynamic Content: Use Puppeteer's page.waitForSelector() or page.waitForFunction() with appropriate conditions to wait for the <md-content> tag to be present in the DOM. This ensures that Puppeteer waits for dynamic content to load before capturing the page content.

Check for iFrames: The content you are trying to scrape might be inside an iframe. In such cases, you need to navigate to the iframe first using page.frames() and then try to access the content.

Inspect Network Requests: Use Puppeteer's page.setRequestInterception(true) and listen to network events to see if there are any additional requests fetching the content you are missing. This will help identify any asynchronous loading mechanisms.

Custom Headers and User Agent: Check if the website is using specific headers or user agents to serve content. You may need to set custom headers or user agents in Puppeteer to mimic a regular browser request.

### Realtime search trends are not available for this region

Setting const browser = await puppeteer.launch({ headless: false }); opens the browser in Edge.  Then I can see this text:

Realtime search trends are not available for this region. Try a different region or SEE DAILY TRENDS.

## using human-like interaction.

<a href="https://trends.google.com/trends/trendingsearches/daily?geo=KR&amp;hl=en-US" class="MCs1Pd UbEQCe VfPpkd-rymPhb-ibnC6b VfPpkd-rymPhb-ibnC6b-OWXEXe-SfQLQb-M1Soyc-Bz112c VfPpkd-rymPhb-ibnC6b-OWXEXe-SfQLQb-Woal0c-RWgCYc" jsaction="keydown:RDtNu; keyup:JdS61c; focusin:MeMJlc; focusout:bkTmIf;mousedown:teoBgf; mouseup:NZPHBc; mouseenter:SKyDAe; mouseleave:xq3APb; touchstart:jJiBRc; touchmove:kZeBdd; touchend:VfAz8; change:uOgbud;" role="menuitem" aria-label="Trending now Link" tabindex="-1"><span class="VfPpkd-rymPhb-pZXsl"></span><span class="VfPpkd-rymPhb-KkROqb" aria-hidden="true"><i class="google-material-icons VfPpkd-rymPhb-Abojl" aria-hidden="true" data-mt="8F6486BF-D2A5-410E-91C9-E13489332881">trending_up</i></span><span class="VfPpkd-rymPhb-Gtdoyb" aria-hidden="true"><span class="VfPpkd-rymPhb-fpDzbe-fmcmS" jsname="K4r5Ff">Trending now</span></span></a>

## Using Puppeteer

Due to the above reasons, we use Puppeteer to load the page, click on the more results button until there is no more results, then load the html.

Then we use Cheerio to parse the following data:

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
    "sparkline": "M0,98L8.695652173913043,98L17.391304347826086,98L26.08695652173913,99L34.78260869565217,99L43.47826086956522,99L52.17391304347826,99L60.86956521739131,99L69.56521739130434,99L78.26086956521739,99L86.95652173913044,99L95.65217391304348,99L104.34782608695652,99L113.04347826086956,98L121.73913043478262,98L130.43478260869566,98L139.1304347826087,98L147.82608695652172,97L156.52173913043478,96L165.2173913043478,95L173.91304347826087,93L182.6086956521739,89L191.30434782608697,46L200,0"
  },
]
```

## Comparing real-time trends with daily trends

### Real-time trend data

The real-time trends are a somewhat fuzzy list of what's going on with searches at the time the request is made.

It simply says at the top of the page: *Past 24 hours*

### Daily trend data

We have to wait for the daily trends data to be complete to see what the final total of the searches was.

The src\predictions\predictions.service.ts calls the googleTrends.dailyTrends() lib API to get the daily list.  

```js
  trendingSearchesDays: [
    {
      date: '20230802',
      formattedDate: 'Wednesday, August 2, 2023',
      trendingSearches: [Array]
    }
  ],
  endDateForNextRequest: '20230801',
  rssFeedPageUrl: 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=US'
}
```

The [docs for the google-trends-api](https://www.npmjs.com/package/google-trends-api#dailyTrends) say: *Daily Search Trends highlights searches that jumped significantly in traffic among all searches over the past 24 hours and updates hourly. These search trends show the specific queries that were searched, and the absolute number of searches made. 20 daily trending search results are returned*

At some point, this will have two objects.  We want to use the completed day to compare agains the real-time results saved previously for that same period.

We are allowed to also send a date in the request, so this should be for yesterday's date.

### What dates to use

Call googleTrends.dailyTrends with getUsWestCoastYesterdayDate:
formattedDate: Monday, July 31, 2023 contains 13
formattedDate: Sunday, July 30, 2023 contains 6

Call googleTrends.dailyTrends with getUsWestCoastDate:
formattedDate: Tuesday, August 1, 2023 contains 19

Call googleTrends.dailyTrends with today's date, Korean timezone:
formattedDate: Wednesday, August 2, 2023 contains 20

The idea is to run these APIs once a day.

- Get a list of real-time trends.
- Get the daily trends for yesterday using getUsWestCoastDate.
- Compare them to the real-time trends from the previous day.

Really, we should be using all available data to check the results against.

So we open all data directory files, say for the past week, and check the daily trends for any day against all of them.

Still a ways to go with this project!

## Multiple calls a day

Since the real-time trends are real-time, they get updated throughout the day.  It's possible to call this say every hour and get many different results.

Some are the same, but some are new.  This will become an important feature, as we want to test them all against our model.

We could:

- keep adding new ones to the same file
- combine objects with the same title in the single file
- create new files each time we run the API

I'm not sure what is the best appraoch.  Currently, we have two files for the same date.  With our existing setup, we kind of want to be able to load multiple real-time trend files and check them all agains the daily trend results.

We already have a function to load all the files for training, so we can use that as a starting point to say load the last week of files.  It might be the case that a trend could take time to build steam.  In this case it would be great if we could predict that this was about to happen.

Originally, we save the file with the full date and time.  Then when we realized that the files weren't saving because the ":" character in the time string is not an allowed character for file names.

But then it complicates saving the files again.  Currently where the file is loaded and the file is saved is in different parts of the app, just using the same date function.  Maybe we should just add the new real-time search results to the same file each time.

Now we have an issue like this:

```log
realTimeTrendsData 2909965
realTimeTrendsData err TypeError: realTimeTrendsData.forEach is not a function
    at PredictionsService.findPossibleMajorTrends (C:\Users\timof\repos\node\google-trend-predictor\src\predictions\predictions.service.ts:56:26)
    at AppController.processData (C:\Users\timof\repos\node\google-trend-predictor\src\app.controller.ts:27:39)
    at C:\Users\timof\repos\node\google-trend-predictor\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at C:\Users\timof\repos\node\google-trend-predictor\node_modules\@nestjs\core\router\router-proxy.js:9:17
realTimeTrendsPageData 2909965
```

At least with the try catch block we can write out file.

## Major trend erased

If a trend is not on the list, but was previously marked as true, we need to preserve this.

So we should check this before we mark the real-time trend false.

Where does this happen again?

src\predictions\predictions.controller.ts

The logic there will be:

```js
if (matchingTrend) {
  savedTrend.isMajorTrend = true;
} else {
  if (!savedTrend.isMajorTrend) {
    savedTrend.isMajorTrend = false;
  }
}
```

## Trend without sparkline

Just happened to see this one and wondered how big this issue is:

```json
  {
    "title": "Hervé Renard",
    "titles": [
      "Hervé Renard",
      "Morocco national football team",
      "Reynald Pedros",
      "France",
      "Olympique Lyonnais",
      "World Cup",
      "Morocco",
      "Eugénie Le Sommer"
    ],
    "trendSearchUrl": "https://frenchfootballweekly.com/2023/08/07/herve-renard-the-amazing-confidence/",
    "isMajorTrend": false
  }
```

## Todo

- Open the last three days of trends_data and mark the trends as major if they appear on the daily trend results.
- Save the daily trend results for future reference.
- Create puppeteer function to click on suspected major trends and capture the details for post creation.
- Fix the predictor error.
- When a major trend is found during the puppeteer work, click on the open trend and capture the full details.
