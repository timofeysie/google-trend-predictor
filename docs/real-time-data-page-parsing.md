The source retrieved from the https://trends.google.com/trends/trendingsearches/realtime?geo=US&hl=en-AU&category=all call will have a list of trending searches that we want to parse to collect structured data for training the model.

The list of trends is contained within a div element containing the  css class "homepage-trending-stories"

Each trend will have a title that will be in an element like this:

```html
<a ng-href="/trends/explore?q=/m/023fb&amp;date=now+7-d&amp;geo=US" ng-attr-title="{{::titlePart.hoverMessage}}" track="['Trending Searches ' + ctrl.currentFeedItemType, 'click', 'item title: ' + titlePart.text]" href="/trends/explore?q=/m/023fb&amp;date=now+7-d&amp;geo=US" title="Explore Chelsea F.C.">Chelsea F.C.
</a>
```

The sparkline will be in an associated svg path tag that looks like this:

```html
<path ng-attr-d="M{{ ::svgPath }}" ng-attr-stroke-width="{{ thickness }}" stroke="#4284f3" vector-effect="non-scaling-stroke" d="M0,98L8.695652173913043,98L17.391304347826086,98L26.08695652173913,99L34.78260869565217,99L43.47826086956522,99L52.17391304347826,99L60.86956521739131,99L69.56521739130434,97L78.26086956521739,96L86.95652173913044,95L95.65217391304348,96L104.34782608695652,95L113.04347826086956,95L121.73913043478262,95L130.43478260869566,94L139.1304347826087,93L147.82608695652172,93L156.52173913043478,91L165.2173913043478,87L173.91304347826087,45L182.6086956521739,0L191.30434782608697,24L200,6" stroke-width="2"></path>
```

We need to create a list of titles and the x/y data contained in the sparkline which represents a graph showing the number of searches for the trend over the past 24 hours.
