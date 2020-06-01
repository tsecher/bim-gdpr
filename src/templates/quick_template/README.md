# Quick Template

## Features
|Features|Status|Comment|
|---|---|---|
| User can access the view at any moment | Yes |  |
| User can access the content even if he does not explecitly valid the view form | Yes |  |
| Groups are available | __Yes__ |  |

## How to use

### Install
Install the template as you normally do with bim-gdpr
```javascript
    import { QuickTemplate } from "bim-gdpr/templates/quick_template/quick_template"

    const quick_template = new QuickTemplate()
    bGDPR
        .setTemplate(quick_template)
        .init()
```

### Reinit css
You can reinit the css using the `setCssLinks` method.
```javascript
    import { QuickTemplate } from "bim-gdpr/templates/quick_template/quick_template"

    const quick_template = new QuickTemplate()
    quick_template.setCssLinks(['./your_own.css'])

    bGDPR
        .setTemplate(quick_template)
        .init()
```
