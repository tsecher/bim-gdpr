# Initialize Bim-GDPR

To initialize the basic bim-gdpr tool you just have to load the core, set a template and then call init the function.

Using a es2015 packager like wepback
_(if you use a CDN, bim-gdpr core is available with the global variable `bGDPR`.)_
```javascript
// Import the core.
import { bGDPR } from "bim-gdpr"
// Import the default template
import { DefaultTemplate } from "bim-gdpr/src/templates/default/Default"

bGDPR
    .setTemplate( new DefaultTemplate() ) // Initialize the view
    .init() // Initialize the core
```

Here, we initialize the core and the view of bim-gdpr. However we did not add any service. So for the moment, the popup will just show a message telling there is no personal data service declared on your website.




> __Why do you have to init a template ? Why is it not implemented by default ?__
>
> Well... Bim-GDPR is designed to allow you to customize the template, so you can choose any template or create your own. If a default template was loaded by default, it would also be loaded event if you wouldn't use it. This would digrease teh loading performance. So that's why, by default, there is no template defined. Yeah, that's true, there is a line code necessary before initialization, but we think it is the best compromise.
