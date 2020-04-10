# YoutubeEmbed

## Introduction
Allow you to access the Youtube Embed videos
[https://developers.google.com/youtube/iframe_api_reference](https://developers.google.com/youtube/iframe_api_reference)

## How to use

### Declare service
Add the service as you normally do with bim-gdpr
```javascript
    import { YoutubeEmbedService } from "../bim-gdpr/services/youtube_embed/youtube_embed"

    const youtube_embed = new YoutubeEmbedService()
    bGDPR
        .addService(youtube_embed)
```

### Use the place holders to disable youtube iframes.

Bim-GDPR allows you to manage the DOM content depending on a service. For example, you want to add an iframe that should be visible only when a specific service has been enabled by the user. In this case, you can use the power of the `noscript` tag and the attribute `data-bgdpr-visible-if-enabled`. 
The content of the noscript tag will not be played because javascript is enabled. Bim-GDPR will turn this tag into a div when the related service will be enabled. Then the content will be display.

In the following example, we add a youtube embed iframe. In this case, the iframe will only be displayed when the `youtube` service runs. : 
```html
<body>
    <!-- the hidden content until the youtube service is not enabled -->
    <noscript data-bgdpr-visible-if-enabled="youtube_embed">
        <iframe width="90%" height="315" src="https://www.youtube.com/embed/YOUTUBE_ID" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </noscript>

<!-- the visible content used as a placeholder until the youtube service is not enabled -->
    <div data-bgdpr-hidden-if-enabled="youtube_embed">
        Please enable the youtube service to play this video.
        <div data-bgdpr-service-enable="youtube_embed">Enable</div>
    </div>
</body>
```
