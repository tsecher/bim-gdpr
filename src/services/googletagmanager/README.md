# Google Tag Manager

## Introduction
Google Tag tracking service

[tagmanager.google.com](https://tagmanager.google.com)

## How to use

### Declare service
You can add the service passing your Google Tag Manager Id.
```javascript
    import { YoutubeService } from "../bim-gdpr/services/googletagmanager/googletagmanager"

    const gtmService = new GoogleTagManagerService('GTM-******')
    bGDPR
        .addService(gtmService)

```


### Use the service to push data.
You can use the service to push data to GoogleTagManager using the `push` method. It deals with the service activation by the user.

```javascript
    import { YoutubeService } from "../bim-gdpr/services/googletagmanager/googletagmanager"

    const gtmService = new GoogleTagManagerService('GTM-******')
    bGDPR
        .addService(gtmService)

        // {...}

        // Push event
        gtmService.push({
            {
                'event': 'my_event',
                'other': 'other_data'
            }
        })

```

> You'd better use `gtmService.push` to push events because if you don't do that, data will still be stocked even if the service is not enabled. And if the service is enabled, all the data stored previously will be sent Google Tag Manager, and it may not be what the user want.
