# Bottom Banner Template

## Features
|Features|Status|Comment|
|---|---|---|
| User can access the view at any moment | __Yes__ | There is a button on the bottom right of the window. |
| User can access the content even if he does not explecitly valid the view form | __Yes__ | There is an overlay suggesting the user has to valid the form before accessing the content |
| Groups are available | __Yes__ |  |

## How to use

### Install
Install the template as you normally do with bim-gdpr
```javascript
    import { BottomBannerTemplate } from "bim-gdpr/templates/bottom_banner/bottom_banner"

    const bottom_banner = new BottomBannerTemplate()
    bGDPR
        .setTemplate(bottom_banner)
        .init()
```

### Reinit css
You can reinit the css using the `setCssLinks` method.

```javascript
    import { BottomBannerTemplate } from "bim-gdpr/templates/bottom_banner/bottom_banner"

    const bottom_banner = new BottomBannerTemplate()
    bottom_banner.setCssLinks(['./your_own.css'])

    // Reinit default css.
    bGDPR
        .setTemplate(bottom_banner)
        .init()
```
