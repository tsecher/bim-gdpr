# View events list

You can use events importing them with `import { ViewEvents } from 'bim-gdpr/src/view/ViewEvents'
`

Each event can be listened with the core `on` method
```javascript
import { ViewEvents } from 'bim-gdpr/src/view/ViewEvents'

bGDPR.on(ViewEvents.beforeShowView).subscribe( data => {
        console.log('data', data);
    })
```

## List

| Event name | Context | Subscription data |
|---|---|---|
|   needsRebuild    |   After an element of the view has changed and force the view to rebuild |   The type of rebuild ```{ type <String>}```
|   hasRebuild  |  After the view has been rebuilt  |  |
|   beforeShowView    |   Before the view has been added to the DOM  |   |
|   afterShowView    |   After the view has been added to the DOM    |   |
|   beforeHideView    |   Before the view has been removed from the DOM  |   |
|   afterHideView    |   After the view has been removed from the DOM    |   |
