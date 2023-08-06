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

<div class="feed-item-header

<div class="details">
    <div class="details-top">
        <div class="title"

However, the content retrieved from using cheerio $.html() looks like this:

```js
{"id":"WS","name":"Samoa"},{"id":"SM","name":"San Marino"},{"id":"ST","name":"São Tomé \u0026 Príncipe"},{"id":"SA","name":"Saudi Arabia"},{"id":"SN","name":"Senegal"},{"id":"RS","name":"Serbia"},{"id":"SC","name":"Seychelles"},{"id":"SL","name":"Sierra Leone"},{"id":"SG","name":"Singapore"},{"id":"SX","name":"Sint Maarten"},{"id":"SK","name":"Slovakia"},{"id":"SI","name":"Slovenia"},{"id":"SB","name":"Solomon Islands"},{"id":"SO","name":"Somalia"},{"id":"ZA","name":"South Africa"},{"id":"GS","name":"South Georgia \u0026 South Sandwich Islands"},{"id":"KR","name":"South Korea"},{"id":"SS","name":"South Sudan"},{"id":"ES","name":"Spain"},{"id":"LK","name":"Sri Lanka"},{"id":"SH","name":"St Helena"},{"id":"PM","name":"St Pierre \u0026 Miquelon"},{"id":"BL","name":"St. Barthélemy"},{"id":"KN","name":"St. Kitts \u0026 Nevis"},{"id":"LC","name":"St. Lucia"},{"id":"MF","name":"St. Martin"},{"id":"VC","name":"St. Vincent \u0026 Grenadines"},{"id":"SD","name":"Sudan"},{"id":"SR","name":"Suriname"},{"id":"SJ","name":"Svalbard \u0026 Jan Mayen"},{"id":"SE","name":"Sweden"},{"id":"CH","name":"Switzerland"},{"id":"SY","name":"Syria"},{"id":"TW","name":"Taiwan"},{"id":"TJ","name":"Tajikistan"},{"id":"TZ","name":"Tanzania"},{"id":"TH","name":"Thailand"},{"id":"TL","name":"Timor-Leste"},{"id":"TG","name":"Togo"},{"id":"TK","name":"Tokelau"},{"id":"TO","name":"Tonga"},{"id":"TT","name":"Trinidad \u0026 Tobago"},{"id":"TN","name":"Tunisia"},{"id":"TR","name":"Türkiye"},{"id":"TM","name":"Turkmenistan"},{"id":"TC","name":"Turks \u0026 Caicos Islands"},{"id":"TV","name":"Tuvalu"},{"id":"UG","name":"Uganda"},{"id":"UA","name":"Ukraine"},{"id":"AE","name":"United Arab Emirates"},{"id":"GB","name":"United Kingdom"},{"id":"US","name":"United States"},{"id":"UY","name":"Uruguay"},{"id":"UM","name":"US Outlying Islands"},{"id":"VI","name":"US Virgin Islands"},{"id":"UZ","name":"Uzbekistan"},{"id":"VU","name":"Vanuatu"},{"id":"VA","name":"Vatican City"},{"id":"VE","name":"Venezuela"},{"id":"VN","name":"Vietnam"},{"id":"WF","name":"Wallis \u0026 Futuna"},{"id":"EH","name":"Western Sahara"},{"id":"YE","name":"Yemen"},{"id":"ZM","name":"Zambia"},{"id":"ZW","name":"Zimbabwe"}]; var localePicker = {"en_US":"English (United States)","en_GB":"English (United kingdom)","ar":"العربية","iw":"עברית","zh_CN":"中文（中国）","zh_TW":"中文（台灣）"}; var catPicker = [{"id":"all","name":"All categories"},{"id":"b","name":"Business"},{"id":"e","name":"Entertainment"},{"id":"m","name":"Health"},{"id":"t","name":"Sci/Tech"},{"id":"s","name":"Sports"},{"id":"h","name":"Top stories"}]; var weekPicker = [{"id":"2023-07-25","name":"Tue, 25 July"},{"id":"2023-07-24","name":"Mon, 24 July"},{"id":"2023-07-23","name":"Sun, 23 July"},{"id":"2023-07-22","name":"Sat, 22 July"},{"id":"2023-07-21","name":"Fri, 21 July"},{"id":"2023-07-20","name":"Thu, 20 July"},{"id":"2023-07-19","name":"Wed, 19 July"},{"id":"2023-07-18","name":"Tue, 18 July"},{"id":"2023-07-17","name":"Mon, 17 July"}]; var locale = 'en-AU'; var xsrfToken = "xsrfToken"; var analyticsAccount = 'UA-4401283-1'; var tagManagerAccount = 'G-VWZPXDNJJB'; var userEmail = ''; var gvizMapDomain = ''; var electionsPresidentStoryId = 'election2016'; var electionsVpStoryId = 'election2016vp'; var electionsTicketStoryId = 'election2016ticket'; var useTremoloTheme =  true ; var serpLinkInExplore =  true ; var serpLinkInFeeds =  true ; var uxrSurveyLink = ''; var uxrSurveyLinkSupportedLanguages = ''; var yearInSearchVideoEmbedUrls = {"2010":{"default":"https://www.youtube.com/embed/F0QXB5pw2qE"},"2011":{"default":"https://www.youtube.com/embed/SAIEamakLoY"},"2012":{"default":"https://www.youtube.com/embed/xY_MUB8adEQ"},"2013":{"default":"https://www.youtube.com/embed/Lv-sY_z8MNs"},"2014":{"default":"https://www.youtube.com/embed/DVwHCGAr_OE"},"2015":{"default":"https://www.youtube.com/embed/q7o7R5BgWDY"},"2016":{"default":"https://www.youtube.com/embed/KIViy7L_lo8","ID":"https://www.youtube.com/embed/3p4jGy5HTOc","RU":"https://www.youtube.com/embed/vYqn8bJbHgQ"},"2017":{"default":"https://www.youtube.com/embed/vI4LHl4yFuo","RU":"https://www.youtube.com/embed/5S70pF8TyDU"},"2018":{"default":"https://www.youtube.com/embed/6aFdEhEZQjE","ID":"https://www.youtube.com/embed/-yPJzReKuJ0","MY":"https://www.youtube.com/embed/ri0xR8LhQHY","PH":"https://www.youtube.com/embed/YejLxl8Tk2k","VN":"https://www.youtube.com/embed/e5x9hUuOkIo"},"2019":{"default":"https://www.youtube.com/embed/ZRCdORJiUgU","RU":"https://www.youtube.com/embed/n4MlDA5GYvk"},"2020":{"default":"https://www.youtube.com/embed/rokGy0huYEA","AU":"https://www.youtube.com/embed/yih2fQ14rPY","BE":"https://www.youtube.com/embed/Ho2039o9khs","BO":"https://www.youtube.com/embed/d5ZzM-4mF8w","BR":"https://www.youtube.com/embed/EeLO2gFDYqA","CL":"https://www.youtube.com/embed/d5ZzM-4mF8w","CO":"https://www.youtube.com/embed/d5ZzM-4mF8w","CR":"https://www.youtube.com/embed/d5ZzM-4mF8w","DK":"https://www.youtube.com/embed/UYDZH8rv0WI","DO":"https://www.youtube.com/embed/d5ZzM-4mF8w","EC":"https://www.youtube.com/embed/d5ZzM-4mF8w","FI":"https://www.youtube.com/embed/yDs2Chd8ut0","GB":"https://www.youtube.com/embed/0DHMhd3mZOk","GT":"https://www.youtube.com/embed/d5ZzM-4mF8w","HN":"https://www.youtube.com/embed/d5ZzM-4mF8w","ID":"https://www.youtube.com/embed/XZH9HcyAlng","JP":"https://www.youtube.com/embed/I-m7_BbBKGs","MX":"https://www.youtube.com/embed/d5ZzM-4mF8w","MY":"https://www.youtube.com/embed/V1Wp_QH1AhU","NI":"https://www.youtube.com/embed/d5ZzM-4mF8w","NL":"https://www.youtube.com/embed/q6apJhfnBGs","NO":"https://www.youtube.com/embed/olDEEz3Uuvg","NZ":"https://www.youtube.com/embed/6NWldBA6K-0","PA":"https://www.youtube.com/embed/d5ZzM-4mF8w","PE":"https://www.youtube.com/embed/d5ZzM-4mF8w","PH":"https://www.youtube.com/embed/HuhA3vH9jf0","PK":"https://www.youtube.com/embed/GmBSIfrvFLM","PR":"https://www.youtube.com/embed/d5ZzM-4mF8w","PY":"https://www.youtube.com/embed/d5ZzM-4mF8w","RU":"https://www.youtube.com/embed/5Y62GFwVszI","SE":"https://www.youtube.com/embed/nMGKjyGRRNs","SG":"https://www.youtube.com/embed/qvs5UEAvwBI","SV":"https://www.youtube.com/embed/d5ZzM-4mF8w","TH":"https://www.youtube.com/embed/YMvVwf6cRl8","UY":"https://www.youtube.com/embed/d5ZzM-4mF8w","VE":"https://www.youtube.com/embed/d5ZzM-4mF8w","VN":"https://www.youtube.com/embed/-G1zl73ZmFk"},"2021":{"default":"https://www.youtube.com/embed/EqboAI-Vk-U"},"2022":{"default":"https://www.youtube.com/embed/4WXs3sKu41I"}}; var yearInSearchBannerImgUrls = {"2010":"https://ssl.gstatic.com/trends_tpt/b7e45979ab40fcc915ac71069501a1a1f8c54fca5e1751a1ebe516cbd6f6dedb.jpg","2011":"https://ssl.gstatic.com/trends_tpt/3f83464030260902f3edc2ffa2c8605f5b32b8b046c24b93ba991ae15f57af8e.jpg","2012":"https://ssl.gstatic.com/trends_tpt/fc15f20135b8dcf340be16045c4867b56ea8405aca8638ce3a9fad0f4e78d5cb.jpg","2013":"https://ssl.gstatic.com/trends_tpt/1790c32da13cde1dbf4a55381068b9ae8a8f09835f7293b16cde3bbec732e891.jpg","2014":"https://ssl.gstatic.com/trends_tpt/2252cc735b40249b6339978ab538819c7c0c1147a10ebfb1fd70c6e46aed224c.jpg","2015":"https://www.gstatic.com/trends/yis/yis_2015_banner.jpg","2016":"https://ssl.gstatic.com/trends_tpt/8b0c5469689feed29f5ff671b0e8d53fec4d015e6746e9af2a381f78051d34be.jpg","2017":"https://ssl.gstatic.com/trends_tpt/299239c892498bb7b1043360f305ceb13b63e71be4fcdf59cdbf4e34a5d33e2d.jpg","2018":"https://ssl.gstatic.com/trends_tpt/6275fb1659df11865aff626758a02785c91751ea694797aba74cb17fe8042c0f.jpg","2019":"https://ssl.gstatic.com/trends_tpt/cea6a96340e9c7214f2b7b99a353273c2772dac066b106b5bd992caad5edebc0.jpg","2020":"https://ssl.gstatic.com/trends_tpt/cb5a640d8c866e926764f991b60fa2dbab5c74c65e7ede573766dd45a2066137.jpg","2021":"https://ssl.gstatic.com/trends_tpt/8b9ed6fbac0ced5c29034e008ab12340a7ea3b243167a02107264938f056e8d0.png","2022":"https://ssl.gstatic.com/trends_tpt/9241c8167d546d5636877134746ef5817af50458a3332f9cbc15778609a58a3e.jpg"}; var enableAdvancedComparison =  false ; var clientSideCacheStrategy = 'disabled'; var clientSideCacheDurationInMilliseconds =   3600000.0 ; var clientSideCacheBuildHash = '3349_RC01' || 'constant-resource-version'; var defaultGeo = 'KR'; var recaptchaSiteKey = '6LfnfJYaAAAAAGZJh3AZH1Xmkg7dIj3IP5-xz19W'; var enableRecaptcha =  true ; var enableRisingItemsByDefaultExperiment = true; CLOSURE_NO_DEPS = true; null </script><link href="https://fonts.googleapis.com/css?family=Roboto:100%2C300%2C400%2C500" rel="stylesheet" type="text/css" nonce="x5jv-wdgmnqNC7QVf1K9aA"><link href="https://fonts.googleapis.com/css?family=Roboto+Mono:500" rel="stylesheet" type="text/css" nonce="x5jv-wdgmnqNC7QVf1K9aA"><link href="https://fonts.googleapis.com/css?family=Heebo:100%2C300%2C400%2C500" rel="stylesheet" type="text/css" nonce="x5jv-wdgmnqNC7QVf1K9aA"><link href="https://fonts.googleapis.com/css?family=Google+Sans+Display:100%2C300%2C400%2C500" rel="stylesheet" nonce="x5jv-wdgmnqNC7QVf1K9aA"><link rel="stylesheet" type="text/css" href="https://ssl.gstatic.com/trends_nrtr/3349_RC01/css_bin.css" nonce="x5jv-wdgmnqNC7QVf1K9aA"><style rel="stylesheet" type="text/css" nonce="x5jv-wdgmnqNC7QVf1K9aA">.gb_hb:not(.gb_jd){font:13px/27px Roboto,Arial,sans-serif;z-index:986}@-webkit-keyframes gb__a{0%{opacity:0}50%{opacity:1}}@keyframes gb__a{0%{opacity:0}50%{opacity:1}}a.gb_la{border:none;color:#4285f4;cursor:default;font-weight:bold;outline:none;position:relative;text-align:center;text-decoration:none;text-transform:uppercase;white-space:nowrap;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none} 
...
-webkit-transform:scale(0.5);-ms-transform:scale(0.5);-o-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:left 0;-webkit-transform-origin:left 0;-ms-transform-origin:left 0;-o-transform-origin:left 0;transform-origin:left 0}.gb_A .gb_6a::before{-webkit-transform:scale(scale(0.416666667));-webkit-transform:scale(scale(0.416666667));-ms-transform:scale(scale(0.416666667));-o-transform:scale(scale(0.416666667));transform:scale(scale(0.416666667))}}.gb_k:hover,.gb_k:focus{-webkit-box-shadow:0 1px 0 rgba(0,0,0,.15);-moz-box-shadow:0 1px 0 rgba(0,0,0,.15);box-shadow:0 1px 0 rgba(0,0,0,.15)}.gb_k:active{-webkit-box-shadow:inset 0 2px 0 rgba(0,0,0,.15);-moz-box-shadow:inset 0 2px 0 rgba(0,0,0,.15);box-shadow:inset 0 2px 0 rgba(0,0,0,.15)}.gb_k:active::after{background:rgba(0,0,0,.1);-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;content:"";display:block;height:100%}.gb_7a{cursor:pointer;line-height:40px;min-width:30px;opacity:.75;overflow:hidden;vertical-align:middle;text-overflow:ellipsis}.gb_d.gb_7a{width:auto}.gb_7a:hover,.gb_7a:focus{opacity:.85}.gb_8a .gb_7a,.gb_8a .gb_9a{line-height:26px}#gb#gb.gb_8a a.gb_7a,.gb_8a .gb_9a{font-size:11px;height:auto}.gb_ab{border-top:4px solid #000;border-left:4px dashed transparent;border-right:4px dashed transparent;display:inline-block;margin-left:6px;opacity:.75;vertical-align:middle}.gb_Ha:hover .gb_ab{opacity:.85}.gb_Ea>.gb_b{padding:3px 3px 3px 4px}.gb_bb.gb_2a{color:#fff}.gb_y .gb_7a,.gb_y .gb_ab{opacity:1}#gb#gb.gb_y.gb_y a.gb_7a,#gb#gb .gb_y.gb_y a.gb_7a{color:#fff}.gb_y.gb_y .gb_ab{border-top-color:#fff;opacity:1}.gb_T .gb_k:hover,.gb_y .gb_k:hover,.gb_T .gb_k:focus,.gb_y .gb_k:focus{-webkit-box-shadow:0 1px 0 rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.2);-moz-box-shadow:0 1px 0 rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.2);box-shadow:0 1px 0 rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.2)}.gb_cb .gb_b,.gb_db .gb_b{position:absolute;right:1px}.gb_b.gb_x,.gb_eb.gb_x,.gb_Ha.gb_x{-webkit-flex:0 1 auto;-webkit-box-flex:0;-moz-box-flex:0;-ms-flex:0 1 auto;flex:0 1 auto}.gb_fb.gb_gb .gb_7a{width:30px!important}.gb_j{height:40px;position:absolute;right:-5px;top:-5px;width:40px}.gb_hb .gb_j,.gb_ib .gb_j{right:0;top:0}.gb_b .gb_d{padding:4px}.gb_n{display:none}sentinel{}</style><script type="text/javascript" src="https://www.gstatic.com/charts/loader.js" nonce="IEdSlq0v_eCsWwIgg9eMjA"></script><script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/3349_RC01/third_parties_min.js" nonce="IEdSlq0v_eCsWwIgg9eMjA"></script><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0-rc4/angular-material.min.js" nonce="IEdSlq0v_eCsWwIgg9eMjA"></script><link href="https://fonts.googleapis.com/icon?family=Material+Icons+Extended" rel="stylesheet" nonce="x5jv-wdgmnqNC7QVf1K9aA"><link href="https://fonts.googleapis.com/icon?family=Google+Material+Icons" rel="stylesheet" nonce="x5jv-wdgmnqNC7QVf1K9aA"><script async="" defer="" src="//www.google.com/insights/consumersurveys/async_survey?site=ynkoxcwrpztmeiz7uor4o7bd54" nonce="IEdSlq0v_eCsWwIgg9eMjA"></script><script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/3349_RC01/trends__en_au.js" nonce="IEdSlq0v_eCsWwIgg9eMjA"></script><script type="text/javascript" nonce="IEdSlq0v_eCsWwIgg9eMjA">;this.gbar_={CONFIG:[[[0,"www.gstatic.com","og.qtm.en_US.LOF-_SR_9oM.es5.O","co.kr","en","60",0,[4,2,"","","","548603857","0"],null,"BNO-ZIaSHbOGseMPzfa3IA",null,0,"og.qtm.zqNqQyS89K8.L.X.O","AA2YrTubZvrOeMnz8IvxIXc1wDm-q0tgxA","AA2YrTuD7dgTGdPUKOOtG2UyAzJVDNLFbQ","",2,1,200,"KOR",null,null,"60","60",1],null,[1,0.1000000014901161,2,1],[1,0.001000000047497451,1],[0,0,0,null,"","","","",0,0,0],[0,0,"",1,0,0,0,0,0,0,null,0,0,null,0,0,null,null,0,0,0,"","","","","","",null,0,0,0,0,0,null,null,null,"rgba(32,33,36,1)","transparent",1,0,1,null,null,1,0,0],null,null,["1","gci_91f30755d6a6b787dcc2a4062e6e9824.js","googleapis.client:gapi.iframes","","en"],null,null,null,null,["m;/_/scs/abc-static/_/js/k=gapi.gapi.en.hh2Jqle7bK0.O/d=1/rs=AHpOoo-jeiq7uVLkyqJvSohFtUkaGjEuyg/m=__features__","https://apis.google.com","","","","",null,1,"es_plusone_gc_20230704.0_p0","en",null,0],[0.009999999776482582,"co.kr","60",[null,"","0",null,1,5184000,null,null,"",null,null,null,null,null,0,null,0,null,1,0,0,0,null,null,0,0,null,0,0,0,0,0],null,null,null,0,null,null,["5061451","google\\.(com|ru|ca|by|kz|com\\.mx|com\\.tr)$",1]],[1,1,null,27043,60,"KOR","en","548603857.0",8,0.009999999776482582,0,0,null,null,null,null,"",null,null,null,"BNO-ZIaSHbOGseMPzfa3IA",0,0,0,null,2,5,"sd",39,0,0,0,0,1],[[null,null,null,"https://www.gstatic.com/og/_/js/k=og.qtm.en_US.LOF-_SR_9oM.es5.O/rt=j/m=qabr,q_dnp,qapid,q_dg/exm=qaaw,qadd,qaid,qein,qhaw,qhba,qhbr,qhch,qhga,qhid,qhin/d=1/ed=1/rs=AA2YrTubZvrOeMnz8IvxIXc1wDm-q0tgxA"]]]],};this.gbar_=this.gbar_||{};(function(_){var window=this;
try{
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var sa,Ja,Ka,La,Ma,Ua,Wa,Va,Za,ab,$a,bb,cb,jb,nb,ob,pb,qb,rb,sb,ub,vb,zb;_.aa=function(a,b){if(Error.captureStackTrace)Error.captureStackTrace(this,_.aa);else{var c=Error().stack;c&&(this.stack=c)}a&&(this.message=String(a));void 0!==b&&(this.cause=b)};
...
_.Ca=function(a){return Ba&&null!=a&&a instanceof Uint8Array};_.Da=function(a){return Array.prototype.slice.call(a)};_.Ga=function(a){var b=(0,_.Ea)(a);1!==(b&1)&&(Object.isFrozen(a)&&(a=_.Da(a)),(0,_.Fa)(a,b|1));return a};_.Ia=function(a){(0,_.Ha)(a,1);return a};Ja=function(a,b){(0,_.Fa)(b,(a|0)&-51)};Ka=function(a,b){(0,_.Fa)(b,(a|18)&-41)};La=function(a){a=a>>10&1023;return 0===a?536870912:a};Ma=function(a){return null!==a&&"object"===typeof a&&!Array.isArray(a)&&a.constructor===Object};
_.Na=function(a){if(a&2)throw Error();};_.Oa=function(a){if(null!=a&&"string"!==typeof a)throw Error();return a};_.Pa=function(a){return null==a||"string"===typeof a?a:void 0};_.Ra=function(a,b,c){var d=!1;if(null!=a&&"object"===typeof a&&!(d=Array.isArray(a))&&a.He===Qa)return a;if(d){var e=d=(0,_.Ea)(a);0===e&&(e|=c&16);e|=c&2;e!==d&&(0,_.Fa)(a,e);return new b(a)}};_.Ta=function(a,b){Sa=b;a=new a(b);Sa=void 0;return a};
_.v=function(a,b,c){null==a&&(a=Sa);Sa=void 0;if(null==a){var d=48;c?(a=[c],d|=256):a=[];b&&(d=d&-1047553|(b&1023)<<10)}else{if(!Array.isArray(a))throw Error();d=(0,_.Ea)(a);if(d&32)return a;d|=32;if(c&&(d|=256,c!==a[0]))throw Error();a:{c=a;var e=c.length;if(e){var f=e-1,g=c[f];if(Ma(g)){d|=128;b=(d>>8&1)-1;e=f-b;1024<=e&&(Ua(c,b,g),e=1023);d=d&-1047553|(e&1023)<<10;break a}}b&&(g=(d>>8&1)-1,b=Math.max(b,e-g),1024<b&&(Ua(c,g,{}),d|=128,b=1023),d=d&-1047553|(b&1023)<<10)}}(0,_.Fa)(a,d);return a};
Ua=function(a,b,c){for(var d=1023+b,e=a.length,f=d;f<e;f++){var g=a[f];null!=g&&g!==c&&(c[f-b]=g)}a.length=d+1;a[d]=c};Wa=function(a,b){return Va(b)};Va=function(a){switch(typeof a){case "number":return isFinite(a)?a:String(a);case "boolean":return a?1:0;case "object":if(a&&!Array.isArray(a)){if(_.Ca(a))return _.Aa(a);if("function"==typeof _.Xa&&a instanceof _.Xa)return a.fh()}}return a};
Za=function(a,b,c){var d=_.Da(a),e=d.length,f=b&128?d[e-1]:void 0;e+=f?-1:0;for(b=b&256?1:0;b<e;b++)d[b]=c(d[b]);if(f){b=d[b]={};for(var g in f)b[g]=c(f[g])}(a=_.Ya?a[_.Ya]:void 0)&&(d[_.Ya]=_.Da(a));return d};ab=function(a,b,c,d,e,f){if(null!=a){if(Array.isArray(a))a=e&&0==a.length&&(0,_.Ea)(a)&1?void 0:f&&(0,_.Ea)(a)&2?a:$a(a,b,c,void 0!==d,e,f);else if(Ma(a)){var g={},h;for(h in a)g[h]=ab(a[h],b,c,d,e,f);a=g}else a=b(a,d);return a}};
$a=function(a,b,c,d,e,f){var g=d||c?(0,_.Ea)(a):0;d=d?!!(g&16):void 0;a=_.Da(a);for(var h=0;h<a.length;h++)a[h]=ab(a[h],b,c,d,e,f);c&&c(g,a);return a};bb=function(a){return a.He===Qa?a.toJSON():Va(a)};
cb=function(a,b,c){c=void 0===c?Ka:c;if(null!=a){if(Ba&&a instanceof Uint8Array)return b?a:new Uint8Array(a);if(Array.isArray(a)){var d=(0,_.Ea)(a);if(d&2)return a;if(b&&!(d&32)&&(d&16||0===d))return(0,_.Fa)(a,d|18),a;a=$a(a,cb,d&4?Ka:c,!0,!1,!0);b=(0,_.Ea)(a);b&4&&b&2&&Object.freeze(a);return a}a.He===Qa&&(b=a.H,c=(0,_.db)(b),a=c&2?a:_.eb(a,b,c,!0));return a}};
_.eb=function(a,b,c,d){var e=d||c&2?Ka:Ja,f=!!(c&16);b=Za(b,c,function(g){return cb(g,f,e)});(0,_.Ha)(b,16|(d?2:0));return _.Ta(a.constructor,b)};_.fb=function(a){var b=a.H,c=(0,_.db)(b);return c&2?_.eb(a,b,c,!1):a};_.gb=function(a,b,c,d,e){var f=La(b);if(c>=f||e){e=b;if(b&128)f=a[a.length-1];else{if(null==d)return;f=a[f+((b>>8&1)-1)]={};e|=128}f[c]=d;e&=-513;e!==b&&(0,_.Fa)(a,e)}else a[c+((b>>8&1)-1)]=d,b&128&&(d=a[a.length-1],c in d&&delete d[c]),b&512&&(0,_.Fa)(a,b&-513)};
_.hb=function(a,b){return null!=a?a:b};
jb=function(a,b,c){var d=a.constructor.ta,e=La((0,_.db)(c?a.H:b)),f=!1;if(d){if(!c){b=_.Da(b);var g;if(b.length&&Ma(g=b[b.length-1]))for(f=0;f<d.length;f++)if(d[f]>=e){Object.assign(b[b.length-1]={},g);break}f=!0}e=b;c=!c;g=(0,_.db)(a.H);a=La(g);g=(g>>8&1)-1;for(var h,l,m=0;m<d.length;m++)if(l=d[m],l<a){l+=g;var n=e[l];null==n?e[l]=c?_.ib:_.Ia([]):c&&n!==_.ib&&_.Ga(n)}else h||(n=void 0,e.length&&Ma(n=e[e.length-1])?h=n:e.push(h={})),n=h[l],null==h[l]?h[l]=c?_.ib:_.Ia([]):c&&n!==_.ib&&_.Ga(n)}d=b.length;
if(!d)return b;var q;if(Ma(h=b[d-1])){a:{var t=h;e={};c=!1;for(var u in t)a=t[u],Array.isArray(a)&&a!=a&&(c=!0),null!=a?e[u]=a:c=!0;if(c){for(var z in e){t=e;break a}t=null}}t!=h&&(q=!0);d--}for(;0<d;d--){h=b[d-1];if(null!=h)break;var P=!0}if(!q&&!P)return b;var Q;f?Q=b:Q=Array.prototype.slice.call(b,0,d);b=Q;f&&(b.length=d);t&&b.push(t);return b};_.w=function(a,b){return null!=a?!!a:!!b};_.x=function(a,b){void 0==b&&(b="");return null!=a?a:b};
_.kb=function(a,b){void 0==b&&(b=0);return null!=a?a:b};_.mb=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<lb.length;f++)c=lb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};nb=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};ob="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
pb=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("a");};qb=pb(this);rb=function(a,b){if(b)a:{var c=qb;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&ob(c,a,{configurable:!0,writable:!0,value:b})}};
rb("Symbol",function(a){if(a)return a;var b=function(f,g){this.i=f;ob(this,"description",{configurable:!0,writable:!0,value:g})};b.prototype.toString=function(){return this.i};var c="jscomp_symbol_"+(1E9*Math.random()>>>0)+"_",d=0,e=function(f){if(this instanceof e)throw new TypeError("b");return new b(c+(f||"")+"_"+d++,f)};return e});
rb("Symbol.iterator",function(a){if(a)return a;a=Symbol("c");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=qb[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&ob(d.prototype,a,{configurable:!0,writable:!0,value:function(){return sb(nb(this))}})}return a});sb=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};
_.tb=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if("number"==typeof a.length)return{next:nb(a)};throw Error("d`"+String(a));};ub="function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b};
if("function"==typeof Object.setPrototypeOf)vb=Object.setPrototypeOf;else{var wb;a:{var xb={a:!0},yb={};try{yb.__proto__=xb;wb=yb.a;break a}catch(a){}wb=!1}vb=wb?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError("e`"+a);return a}:null}zb=vb;
_.y=function(a,b){a.prototype=ub(b.prototype);a.prototype.constructor=a;if(zb)zb(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.U=b.prototype};
```

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