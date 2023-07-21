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

## Real Time Trends

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
      "US_lnk_64DHhQAAAAAshM_en",
      "US_lnk_g63vhgAAAABsqM_en",
      "US_lnk_x-OLhQAAAABM5M_en",
      "US_lnk_dQ1EhgAAAAAxCM_en",
      "US_lnk_nO6thQAAAAAx6M_en",
      "US_lnk_rTjvhgAAAABCPM_en",
      "US_lnk_PN4jhgAAAAAf2M_en",
      "US_lnk_DRcfhwAAAAASEM_en",
      "US_lnk_5dMbhwAAAAD-1M_en",
      "US_lnk_wQ_XhgAAAAAWCM_en",
      "US_lnk_0VEghwAAAADxVM_en",
      "US_lnk_S3H6hgAAAACxdM_en",
      "US_lnk_MCj2hQAAAADGLM_en",
      "US_lnk_zQ7ehQAAAAATCM_en",
      "US_lnk_ECX5hQAAAADpIM_en",
      "US_lnk_GR0ZhwAAAAAAGM_en",
      "US_lnk_2FkAhwAAAADYXM_en",
      "US_lnk_5XMihwAAAADHdM_en",
      "US_lnk_c0OBhgAAAADyRM_en",
      "US_lnk_7oTuhgAAAAAAgM_en",
      "US_lnk_CTjphAAAAADgPM_en",
      "US_lnk_caONhQAAAAD8pM_en",
      "US_lnk_RBnmhQAAAACiHM_en",
      "US_lnk_jeJThQAAAADe5M_en",
      "US_lnk_Cy85hgAAAAAyKM_en",
      "US_lnk_eEHihgAAAACaRM_en",
      "US_lnk_QKYOhwAAAABOoM_en",
      "US_lnk_OahihgAAAABbrM_en",
      "US_lnk_ABTPhgAAAADPEM_en",
      "US_lnk_Hi4MhwAAAAASKM_en",
      "US_lnk_mZ82hgAAAACvmM_en",
      "US_lnk_5QVqhQAAAACPAM_en",
      "US_lnk_kEqyhQAAAAAiTM_en",
      "US_lnk_whXehgAAAAAcEM_en",
      "US_lnk_Gu0dhwAAAAAH6M_en",
      "US_lnk_HPKPhgAAAACT9M_en",
      "US_lnk_Syj8hQAAAAC3LM_en",
      "US_lnk_IPPfhgAAAAD_9M_en",
      "US_lnk_A8d9hQAAAAB-wM_en",
      "US_lnk_O5yMhgAAAAC3mM_en",
      "US_lnk_OHHhhgAAAADZdM_en",
      "US_lnk_zPfKgwAAAAAG9M_en",
      "US_lnk_K3MIhwAAAAAjdM_en",
      "US_lnk_VGsQhwAAAABEbM_en",
      "US_lnk_3AzohgAAAAA0CM_en",
      "US_lnk_Mz5HgwAAAAB0PM_en",
      "US_lnk_JUL2hAAAAADTRM_en",
      "US_lnk_PX1ihgAAAABfeM_en",
      "US_lnk_05ARhwAAAADClM_en",
      "US_lnk_iSIkhwAAAACtJM_en",
      "US_lnk_Cwz7hgAAAADwCM_en",
      "US_lnk_1EZohgAAAAC8QM_en",
      "US_lnk_lsIrhwAAAAC9xM_en",
      "US_lnk_EydUhAAAAABHIM_en",
      "US_lnk_ao8GhwAAAABsiM_en",
      "US_lnk_ZN8LhwAAAABv2M_en",
      "US_lnk_gyDAhQAAAABDJM_en",
      "US_lnk_JynbhQAAAAD8LM_en",
      "US_lnk_x48nhwAAAADgiM_en",
      "US_lnk_ie-8hQAAAAA16M_en",
      "US_lnk_ys_rhgAAAAAhyM_en",
      "US_lnk_pR20hgAAAAARGM_en",
      "US_lnk_ZboYhgAAAAB9vM_en",
      "US_lnk_HHkYhwAAAAAEfM_en",
      "US_lnk_razrhgAAAABGqM_en",
      "US_lnk_OtsBhwAAAAA73M_en",
      "US_lnk_UDN4hAAAAAAoNM_en",
      "US_lnk_mAKVhgAAAAANBM_en",
      "US_lnk__j8ZhwAAAADnOM_en",
      "US_lnk_HULXhgAAAADKRM_en",
      "US_lnk_4SlLhQAAAACqLM_en",
      "US_lnk__v3shQAAAAAS-M_en",
      "US_lnk_XEpLhQAAAAAXTM_en",
      "US_lnk_sQcmhwAAAACXAM_en",
      "US_lnk_qQDlhgAAAABMBM_en",
      "US_lnk_JeIahgAAAAA_5M_en",
      "US_lnk_zgzohgAAAAAmCM_en",
      "US_lnk_nQsYhwAAAACFDM_en",
      "US_lnk_3oN2hgAAAACohM_en",
      "US_lnk_07K2hgAAAABltM_en",
      "US_lnk_CdS3hgAAAAC-0M_en",
      "US_lnk_3O63hQAAAABr6M_en",
      "US_lnk_3zX4hgAAAAAnMM_en",
      "US_lnk_4DJXhQAAAAC3NM_en",
      "US_lnk_8zWFhgAAAAB2MM_en",
      "US_lnk_2h6lhgAAAAB_GM_en",
      "US_lnk_OAcMhwAAAAA0AM_en",
      "US_lnk_cEhehQAAAAAuTM_en",
      "US_lnk_cEMvhwAAAABfRM_en",
      "US_lnk_CfLRhQAAAADY9M_en",
      "US_lnk_qpe7hgAAAAARkM_en",
      "US_lnk_NrLChQAAAAD0tM_en",
      "US_lnk_Yd4fhwAAAAB-2M_en",
      "US_lnk_HBP5hgAAAADlFM_en",
      "US_lnk_I_jjhQAAAADA_M_en",
      "US_lnk_Q_rshgAAAACv_M_en",
      "US_lnk_-MgQhwAAAADozM_en",
      "US_lnk_cJwthwAAAABdmM_en",
      "US_lnk_MOjphgAAAADZ7M_en",
      "US_lnk_1dHxhgAAAAAk1M_en",
      "US_lnk_2vfPhQAAAAAV8M_en",
      "US_lnk_sAW_hgAAAAAPAM_en",
      "US_lnk_HyghhgAAAAA-LM_en",
      "US_lnk_wGvjhgAAAAAjbM_en",
      "US_lnk_4L_JhAAAAAApuM_en",
      "US_lnk_q4PuhAAAAABFhM_en",
      "US_lnk_008phwAAAAD6SM_en",
      "US_lnk_ea5PhgAAAAA2qM_en",
      "US_lnk_HBTPhgAAAADTEM_en",
      "US_lnk_oywRhQAAAACyKM_en",
      "US_lnk_A_wuhwAAAAAt-M_en",
      "US_lnk_Mzd3hQAAAABEMM_en",
      "US_lnk_8RpXhgAAAACmHM_en",
      "US_lnk_-MSYhQAAAABgwM_en",
      "US_lnk_HQgUhwAAAAAJDM_en",
      "US_lnk_8wMWhwAAAADlBM_en",
      "US_lnk_soAPhwAAAAC9hM_en",
      "US_lnk_wTrEhgAAAAAFPM_en",
      "US_lnk_ENjNhgAAAADd3M_en",
      "US_lnk_L0HBhQAAAADuRM_en",
      "US_lnk_CaFZhgAAAABQpM_en",
      "US_lnk_YVj4hgAAAACZXM_en",
      "US_lnk_Fwa_hgAAAACoAM_en",
      "US_lnk_s8iyhgAAAAABzM_en",
      "US_lnk_d85yhgAAAAAFyM_en",
      "US_lnk_J6PyhgAAAADVpM_en",
      "US_lnk_33erhgAAAAB0cM_en",
      "US_lnk_9J-FhQAAAABxmM_en",
      "US_lnk_yXrmhgAAAAAvfM_en",
      "US_lnk_LI7vhgAAAADDiM_en",
      "US_lnk_YSfvhAAAAACOIM_en",
      "US_lnk_FL_vhgAAAAD7uM_en",
      "US_lnk_Dy_YhgAAAADXKM_en",
      "US_lnk_xqLChgAAAAAEpM_en",
      "US_lnk_jV7PhgAAAABCWM_en",
      "US_lnk_1so9hgAAAADrzM_en",
      "US_lnk_QF7ChgAAAACCWM_en",
      "US_lnk_6hMThwAAAAD5FM_en",
      "US_lnk_3zXzhQAAAAAsMM_en",
      "US_lnk_u18lhwAAAACeWM_en",
      "US_lnk_BXHJhQAAAADMdM_en",
      "US_lnk_oA81hwAAAACVCM_en",
      "US_lnk_TtLJhQAAAACH1M_en",
      "US_lnk_M3afhgAAAACscM_en",
      "US_lnk_3DrEhQAAAAAYPM_en",
      "US_lnk_MMpbhQAAAABrzM_en",
      "US_lnk_DVwqhwAAAAAnWM_en",
      "US_lnk_2RPBhgAAAAAYFM_en",
      "US_lnk_1p4fhwAAAADJmM_en",
      "US_lnk_58_kgwAAAAADzM_en",
      "US_lnk_owcMhwAAAACvAM_en",
      "US_lnk_9eLxhgAAAAAE5M_en",
      "US_lnk_YBf1hgAAAACVEM_en",
      "US_lnk_6ZIghwAAAADJlM_en",
      "US_lnk_H-r8hgAAAADj7M_en",
      "US_lnk_q0bohgAAAABDQM_en",
      "US_lnk_BS_IhgAAAADNKM_en",
      "US_lnk_hXarhQAAAAAucM_en",
      "US_lnk_53erhgAAAABMcM_en",
      "US_lnk_KnLahgAAAADwdM_en",
      "US_lnk_XGy3hgAAAADraM_en",
      "US_lnk_rLhQhQAAAAD8vM_en",
      "US_lnk_CvW3hgAAAAC98M_en",
      "US_lnk_1so0hwAAAADizM_en",
      "US_lnk_TH66hgAAAAD2eM_en",
      "US_lnk_SCG6hQAAAADyJM_en",
      "US_lnk_IDWDhgAAAACjMM_en",
      "US_lnk_lAuMhAAAAAAYDM_en",
      "US_lnk_oj9NhgAAAADvOM_en",
      "US_lnk_iIP-hgAAAAB2hM_en",
      "US_lnk_seK9hQAAAAAM5M_en",
      "US_lnk_CXv7hgAAAADyfM_en",
      "US_lnk_lKe9hgAAAAApoM_en",
      "US_lnk_ch2ohAAAAADaGM_en",
      "US_lnk_k3ZnhAAAAAD0cM_en",
      "US_lnk_rqvghQAAAABOrM_en",
      "US_lnk_BBQThwAAAAAXEM_en",
      "US_lnk_t08mhgAAAACRSM_en",
      "US_lnk_89cWhwAAAADl0M_en",
      "US_lnk_QtykhgAAAADm2M_en",
      "US_lnk_IRzYhQAAAAD5GM_en",
      "US_lnk_LtbFhgAAAADr0M_en",
      "US_lnk_Opq_hgAAAACFnM_en",
      "US_lnk_BUcyhwAAAAA3QM_en",
      "US_lnk_TU0ohQAAAABlSM_en",
      "US_lnk_NkPvhAAAAADZRM_en",
      "US_lnk_RT2ahQAAAADfOM_en",
      "US_lnk_mcIUhwAAAACNxM_en",
      "US_lnk_zo8dhQAAAADTiM_en",
      "US_lnk_fgzLhQAAAAC1CM_en",
      "US_lnk_poTLhgAAAABtgM_en",
      "US_lnk_5KQIhwAAAADsoM_en",
      "US_lnk_GRc2hgAAAAAvEM_en",
      "US_lnk_Mx8ShwAAAAAhGM_en",
      "US_lnk_3OeshQAAAABw4M_en",
      "US_lnk_Ng6AhQAAAAC2CM_en",
      "US_lnk_HOykhQAAAAC46M_en",
      "US_lnk_g34ahwAAAACZeM_en",
      "US_lnk_nMIUhwAAAACIxM_en",
      "US_lnk_9YbFhQAAAAAwgM_en",
      "US_lnk_U0HBhQAAAACSRM_en",
      "US_lnk_Yv_yhQAAAACQ-M_en",
      "US_lnk_UckQhwAAAABBzM_en",
      "US_lnk_HN8lhwAAAAA52M_en",
      "US_lnk_-lrEhgAAAAA-XM_en",
      "US_lnk_yPtzhgAAAAC7_M_en",
      "US_lnk_b0nrhgAAAACETM_en",
      "US_lnk_IGjZhgAAAAD5bM_en",
      "US_lnk_WcIrhwAAAAByxM_en",
      "US_lnk_3a7JhgAAAAAUqM_en",
      "US_lnk_-tnThgAAAAAp3M_en",
      "US_lnk_8ynfhQAAAAAsLM_en",
      "US_lnk_y-cahwAAAADR4M_en",
      "US_lnk_L37YhQAAAAD3eM_en",
      "US_lnk_AtR6hgAAAAB40M_en",
      "US_lnk_dnJXhgAAAAAhdM_en",
      "US_lnk_0cAkhwAAAAD1xM_en",
      "US_lnk_skPChgAAAABwRM_en",
      "US_lnk_T_fvhgAAAACg8M_en",
      "US_lnk_SXyohgAAAADheM_en",
      "US_lnk_TPrlhQAAAACp_M_en",
      "US_lnk_tv04hQAAAACO-M_en",
      "US_lnk_phcdhwAAAAC7EM_en",
      "US_lnk_d8wvhwAAAABYyM_en",
      "US_lnk_KppBhgAAAABrnM_en",
      "US_lnk_XWTShgAAAACPYM_en",
      "US_lnk_AGvwhAAAAADwbM_en",
      "US_lnk_Q3JvhgAAAAAsdM_en",
      "US_lnk_xGxnhgAAAACjaM_en",
      "US_lnk_cUKRhQAAAADgRM_en",
      "US_lnk_MeC-hgAAAACP5M_en",
      "US_lnk_kKD3hgAAAABnpM_en",
      "US_lnk_81SdhQAAAABuUM_en",
      "US_lnk_xrM8hgAAAAD6tM_en",
      "US_lnk_pO2IhQAAAAAs6M_en",
      "US_lnk_kcMZhwAAAACIxM_en",
      "US_lnk_3u_ihQAAAAA86M_en",
      "US_lnk_o0jhhgAAAABCTM_en",
      "US_lnk_RTkXhwAAAABSPM_en",
      "US_lnk_-fR7hQAAAACC8M_en",
      "US_lnk_h8BMhAAAAADLxM_en",
      "US_lnk_gVrvhQAAAABuXM_en",
      "US_lnk_AQKGhgAAAACHBM_en",
      "US_lnk_tFRjhQAAAADXUM_en",
      "US_lnk_cR0DhwAAAAByGM_en",
      "US_lnk_5bIfhwAAAAD6tM_en",
      "US_lnk_bGyRhQAAAAD9aM_en",
      "US_lnk_a3FRhgAAAAA6dM_en",
      "US_lnk_UAWEhQAAAADUAM_en",
      "US_lnk_XOpehgAAAAAC7M_en",
      "US_lnk_YxGbhQAAAAD4FM_en",
      "US_lnk_fo5qhgAAAAAUiM_en",
      "US_lnk_n99HhQAAAADY2M_en",
      "US_lnk_Otm4hgAAAACC3M_en",
      "US_lnk_zNcphQAAAADl0M_en",
      "US_lnk_Lx_GhQAAAADpGM_en",
      "US_lnk_PBgPhwAAAAAzHM_en",
      "US_lnk_OwyohgAAAACTCM_en",
      "US_lnk_lUiWhgAAAAADTM_en",
      "US_lnk_RV5phAAAAAAsWM_en",
      "US_lnk_3C3NhQAAAAARKM_en",
      "US_lnk_28wQhgAAAADLyM_en",
      "US_lnk_IcDehgAAAAD_xM_en",
      "US_lnk_genUgwAAAABV6M_en",
      "US_lnk_wfhOhQAAAACP_M_en",
      "US_lnk_dOrQgwAAAACk6M_en",
      "US_lnk_9qxfhAAAAACpqM_en",
      "US_lnk_2Tx_hgAAAACmOM_en",
      "US_lnk_lK1yhQAAAADmqM_en",
      "US_lnk_E-e3hgAAAACk4M_en",
      "US_lnk_RUjhhgAAAACkTM_en",
      "US_lnk_6afphQAAAAAAoM_en",
      "US_lnk_rZcWhgAAAAC7kM_en",
      "US_lnk_i5KXhQAAAAAclM_en",
      "US_lnk_HkPihQAAAAD8RM_en",
      "US_lnk_EYWmhQAAAAC3gM_en",
      "US_lnk_N6YihgAAAAAVoM_en",
      "US_lnk_tbjhhgAAAABUvM_en",
      "US_lnk_m7ivhgAAAAA0vM_en",
      "US_lnk_JKZJhQAAAABtoM_en",
      "US_lnk_Mh9phgAAAABbGM_en",
      "US_lnk_5oUChwAAAADkgM_en",
      "US_lnk_wTLOhgAAAAAPNM_en",
      "US_lnk__IWXhgAAAABrgM_en",
      "US_lnk_6rbfhgAAAAA1sM_en",
      "US_lnk_hESHhQAAAAADQM_en",
      "US_lnk_-pNQhQAAAACqlM_en",
      "US_lnk_w6ItgwAAAADuoM_en",
      "US_lnk_TS8XhgAAAABaKM_en",
      "US_lnk_sSz1hgAAAABEKM_en",
      "US_lnk_4td7hQAAAACZ0M_en",
      "US_lnk_yr7-hgAAAAA0uM_en",
      "US_lnk_W2JThgAAAAAIZM_en",
      "US_lnk_cgXUhgAAAACmAM_en",
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
               {
                  "articleTitle":"Travis Scott, Bad Bunny, and the Weeknd Share New Song “K-Pop”: Listen",
                  "url":"https://pitchfork.com/news/travis-scott-bad-bunny-the-weeknd-announce-new-song-kpop/",
                  "source":"Pitchfork",
                  "time":"3 hours ago",
                  "snippet":"The new song follows Scott's pre-Astroworld tracks “Escape Plan” and \n“Mafia,” as well as the more recent “Down in Atlanta” and “Ring Ring”"
               },
               {
                  "articleTitle":"Travis Scott, Bad Bunny & The Weeknd – K-POP",
                  "url":"https://genius.com/Travis-scott-bad-bunny-and-the-weeknd-k-pop-lyrics",
                  "source":"Genius",
                  "time":"2 days ago",
                  "snippet":"K-POP Lyrics: Gonna pop, baby / Vemo' / Swish, uh (Uh) / Move that shit out \nhere (Here) / You full off one sip (Sip) / Fallin' off but I got..."
               },
               {
                  "articleTitle":"Travis Scott's Upcoming Song \"KPOP\" Is Slammed For Cultural Appropriation \nAnd Artwork Resembling The Japanese ...",
                  "url":"https://www.koreaboo.com/news/travis-scott-kpop-korean-netizens-react-appropriation/",
                  "source":"Koreaboo",
                  "time":"1 day ago",
                  "snippet":"Korean netizens are enraged over the artwork and title of Travis Scott's \nupcoming song \"KPOP.\" The song features The Weeknd and Bad Bunny."
               },
               {
                  "articleTitle":"Travis Scott, The Weeknd & Bad Bunny Team Up on ‘KPOP’ Single: Stream It Now",
                  "url":"https://www.billboard.com/music/rb-hip-hop/travis-scott-the-weeknd-bad-bunny-kpop-single-listen-1235375440/",
                  "source":"Billboard",
                  "time":"3 hours ago",
                  "snippet":"Travis Scott, The Weeknd and Bad Bunny have cracked open the 'Utopia' \nbriefcase just a tad Friday (July 21) to release their new single..."
               },
               {
                  "articleTitle":"Travis Scott, The Weeknd, & Bad Bunny – “KPOP”",
                  "url":"https://www.stereogum.com/2230713/travis-scott-the-weeknd-bad-bunny-kpop/music/",
                  "source":"Stereogum",
                  "time":"2 days ago",
                  "snippet":"Utopia is almost here. Although its launch event at the pyramids in Egypt \nseemed to be in jeopardy earlier this week, Travis Scott's first..."
               },
               {
                  "articleTitle":"KPOP: Is Travis Scott, The Weeknd, Bad Bunny's DISS TRACK to K-music? \nNetizens divided over upcoming collab",
                  "url":"https://www.pinkvilla.com/entertainment/kpop-is-travis-scott-the-weeknd-bad-bunnys-diss-track-to-k-music-netizens-divided-over-upcoming-collab-1231054",
                  "source":"Pinkvilla",
                  "time":"23 hours ago",
                  "snippet":"The Weeknd, Travis Scott, and Bad Bunny teased their collaboration song \ntitled KPOP, the collaboration attracts mixed reactions from K-pop..."
               },
               {
                  "articleTitle":"Travis Scott Releases ‘K-POP, Recruits The Weeknd and Bad Bunny",
                  "url":"https://www.rollingstone.com/music/music-news/travis-scott-k-pop-the-weeknd-bad-bunny-song-1234792160/",
                  "source":"Rolling Stone",
                  "time":"3 hours ago",
                  "snippet":"Following the news that, yes, his Utopia concert will take place at the \nPyramids of Giza, Travis Scott released “K-POP” with The Weeknd and..."
               },
               {
                  "articleTitle":"Travis Scott, Bad Bunny and The Weeknd announce 'K-POP' collaboration",
                  "url":"https://www.latimes.com/delos/story/2023-07-20/travis-scott-bad-bunny-the-weeknd-astroworld-music-collaboration",
                  "source":"Los Angeles Times",
                  "time":"8 hours ago",
                  "snippet":"The Astroworld rapper announced he would be releasing a new song featuring \ncollaborations with two Grammy award-winning artists."
               },
               {
                  "articleTitle":"Travis Scott Teases New 'Utopia' Single With The Weeknd & Bad Bunny",
                  "url":"https://hiphopdx.com/news/travis-scott-utopia-single-weeknd-bad-bunny",
                  "source":"HipHopDX",
                  "time":"13 hours ago",
                  "snippet":"Travis Scott has announced a new single slated to land on his Utopia album, \nand it features a pair of music titans in The Weeknd and Bad..."
               }
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
