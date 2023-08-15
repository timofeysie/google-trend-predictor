
[Nest] 23036  - 14/08/2023, 4:11:01 am     LOG [NestFactory] Starting Nest application...
Model loaded from C:\Users\timof\repos\node\google-trend-predictor\models\test-model.json
Error while loading the model: TypeError: Only absolute URLs are supported
    at getNodeRequestOptions (C:\Users\timof\repos\node\google-trend-predictor\node_modules\node-fetch\lib\index.js:1327:9)
    at C:\Users\timof\repos\node\google-trend-predictor\node_modules\node-fetch\lib\index.js:1454:19
    at new Promise (<anonymous>)
    at fetch (C:\Users\timof\repos\node\google-trend-predictor\node_modules\node-fetch\lib\index.js:1451:9)
    at HTTPRequest.PlatformNode.fetch (C:\Users\timof\repos\node\google-trend-predictor\node_modules\@tensorflow\tfjs\tfjs-core\src\platforms\platform_node.ts:61:12)
    at HTTPRequest.<anonymous> (C:\Users\timof\repos\node\google-trend-predictor\node_modules\@tensorflow\tfjs\tfjs-core\src\io\http.ts:147:43)
    at step (C:\Users\timof\repos\node\google-trend-predictor\node_modules\@tensorflow\tfjs\node_modules\tslib\tslib.es6.js:102:23)
    at Object.next (C:\Users\timof\repos\node\google-trend-predictor\node_modules\@tensorflow\tfjs\node_modules\tslib\tslib.es6.js:83:53)
    at C:\Users\timof\repos\node\google-trend-predictor\node_modules\@tensorflow\tfjs\node_modules\tslib\tslib.es6.js:76:71
    at new Promise (<anonymous>)

My absolute path:

C:\Users\timof\repos\node\google-trend-predictor\models\test-model.json
