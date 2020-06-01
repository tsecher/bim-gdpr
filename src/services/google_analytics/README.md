# Google Analytics

## Introduction
Google Analytics Service
[https://developers.google.com/analytics](https://developers.google.com/analytics)



## How to use

### Declare service
Add the service as you normally do with bim-gdpr
```javascript
    import { GoogleAnalyticsService } from "../bim-gdpr/services/google_analytics/google_analytics"

    const google_analytics = new GoogleAnalyticsService()
    bGDPR
        .addService(google_analytics)
```
