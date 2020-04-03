# {TemplateId} Template

## Features
|Features|Status|Comment|
|---|---|---|
| User can access the view at any moment |  |  |
| User can access the content even if he does not explecitly valid the view form |  |  |
| Groups are available | __Yes__ |  |

## How to use

### Install
Install the template as you normally do with easy-gdpr
```javascript
    import { {TemplateClass} } from "easy-gdpr/templates/{TemplateId}/{TemplateId}"

    const {TemplateId} = new {TemplateClass}()
    eGDPR
        .setTemplate({TemplateId})
        .init()
```

### Reinit css
You can reinit the css using the `setCssLinks` method.
```javascript
    import { {TemplateClass} } from "easy-gdpr/templates/{TemplateId}/{TemplateId}"

    const {TemplateId} = new {TemplateClass}()
    {TemplateId}.setCssLinks(['./your_own.css'])

    eGDPR
        .setTemplate({TemplateId})
        .init()
```