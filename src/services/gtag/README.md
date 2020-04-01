# Google Analytics

## Introduction
Google user tracking services
[marketingplatform.google.com/intl/fr/about/analytics/](https://marketingplatform.google.com/intl/fr/about/analytics/)



## How to use

### Declare service
You can add the service passing your Google Tag Id.
```javascript
    import { GTAGService } from "../easy-gdpr/services/gtag/gtag"

    const gtagService = new GTAGService('UA-******')
    eGDPR
        .addService(gtagService)

```
