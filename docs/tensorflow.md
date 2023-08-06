# tensorflow


```sh
[Nest] 5644  - 06/08/2023, 10:34:02 pm     LOG [NestFactory] Starting Nest application...
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

============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================
```

The url leads to a repo with this message: *This repository has been archived in favor of tensorflow/tfjs.*

This is the [new location](https://github.com/tensorflow/tfjs).
