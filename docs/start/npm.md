#Use NPM

## Installation

Install bim-gdpr as you normally do with npm : 

`npm install bim-gdpr`


## Initialisation
The philosophy of bim-GDPR is to deliver only what will be used by your user. That's why most of elements you use in bim-GDPR are modular entities.
So you have to import each part of elements you use.

For example : 

```javascript
// Import the core.
import bgdpr from "bim-gdpr"
// Import the default template
import { DefaultTemplate } from "bim-gdpr/src/templates/default/Default"

bgdpr
    .setTemplate( new DefaultTemplate() ) // Initialize the view
    .init() // Initialize the core
```

Here, we initialize the core and the view of bim-gdpr. However we did not add any service. So for the moment, the popup will just show a message telling there is no personal data service declared on your website.




> __Why do you have to init a template ? Why is it not implemented by default ?__
>
> Well... Bim-GDPR is designed to allow you to customize the template, so you can choose any template or create your own. If a default template was loaded by default, it would also be loaded event if you wouldn't use it. This would digrease teh loading performance. So that's why, by default, there is no template defined. Yeah, that's true, there is a line code necessary before initialization, but we think it is the best compromise.
 



## Declare services
You can use the `addService` method which can be chained. 
For performance, the best way is to declare services before initialisation. But you can declare services whenever you want.


```javascript
// Import the core.
import bgdpr from "bim-gdpr"
// Import the default template
import { DefaultTemplate } from "bim-gdpr/src/templates/default/Default"
import { GTAGService } from "bim-gdpr/src/services/gtag/gtag"
import { MatomoService } from "bim-gdpr/src/services/matomo/matomo"


bgdpr
    // ----- Add services : 
    .addService( new GTAGService('U-*******') )
    .addService( new MatomoService('//matomo.php') )

    // -----
    .setTemplate( new DefaultTemplate() ) // Initialize the view
    .init() // Initialize the core
```
