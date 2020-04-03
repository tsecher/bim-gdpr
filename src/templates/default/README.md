# Default Template

## Features
|Features|Status|Comment|
|---|---|---|
| User can access the view at any moment | __Yes__ | There is a button on the bottom right of the window. |
| User can access the content even if he does not explecitly valid the view form | __No__ | There is an overlay suggesting the user has to valid the form before accessing the content |
| Groups are available | __Yes__ |  |

## How to use

### Install
Install the template as you normally do with easy-gdpr
```javascript
    import { DefaultTemplate } from "easy-gdpr/templates/default/Default"

    const default_template = new DefaultTemplate()
    eGDPR
        .setTemplate(default_template)
        .init()
```

### Reinit css
You can reinit the css using the `setCssLinks` method.

```javascript
    import { DefaultTemplate } from "easy-gdpr/templates/default/Default"

    const default_template = new DefaultTemplate()
    default.setCssLinks(['./your_own.css'])

    // Reinit default css.
    eGDPR
        .setTemplate(default_template)
        .init()
```