# Column Choice Template

## Features
|Features|Status|Comment|
|---|---|---|
| User can access the view at any moment |  __Yes__ | There is an implicite button on the bottom right of the window |
| User can access the content even if he does not explecitly valid the view form | __Yes__ |  |
| Groups are available | __Yes__ |  |

## How to use

### Install
Install the template as you normally do with bim-gdpr
```javascript
    import { ColumnChoiceTemplate } from "bim-gdpr/templates/column_choice/column_choice"

    const column_choice = new ColumnChoiceTemplate()
    bGDPR
        .setTemplate(column_choice)
        .init()
```

### Reinit css
You can reinit the css using the `setCssLinks` method.
```javascript
    import { ColumnChoiceTemplate } from "bim-gdpr/templates/column_choice/column_choice"

    const column_choice = new ColumnChoiceTemplate()
    column_choice.setCssLinks(['./your_own.css'])

    bGDPR
        .setTemplate(column_choice)
        .init()
```
