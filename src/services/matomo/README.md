# Matomo

## Introduction
Matomo tracking service.
[matomo.org](https://matomo.org/)


## Dependencies
- https://www.npmjs.com/package/matomo-tracker


## Install
You have to install [www.npmjs.com/package/matomo-tracker](https://www.npmjs.com/package/matomo-tracker) in addition.

```npm i matomo-tracker --save```



## How to use

### Declare service
You can add the service passing your Matomo url and your site Id (optional).
```javascript
    import { MatomoService } from "../easy-gdpr/services/matomo/matomo"

    const matomoService = new MatomoService('https://my-matomo-site.com',1)
    eGDPR
        .addService(matomoService)

```


### Use the service to track data.
You can use the service to track data to Matomo using the `track` method. It deals with the service activation by the user.

```javascript
     import { MatomoService } from "../easy-gdpr/services/matomo/matomo"

    const matomoService = new MatomoService('https://my-matomo-site.com',1)
    eGDPR
        .addService(matomoService)

        // {...}

        // Track the url
        matomoService.track(window.location.href)
```

You can also get the traker object via the `matomoService.matomoTracker` ( see [www.npmjs.com/package/matomo-tracker](https://www.npmjs.com/package/matomo-tracker))
