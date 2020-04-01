# Easy-GDPR

Easy-GDPR is a javascript tool allowing users to manage their personal data services according to the General Data Protection Regulation (GDPR). Easy-GDPR is highly customizable and allows you to integrate it easily in your website.


## Installation 

### Using NPM
    
    npm install easy-gdpr

### Using CDN 
Easy-GDPR allows you to use onlty the elements that your website need. So the user don't load the code for services you don't declare. That's why the easy-GDPR core, templates and services are in different js files. So you need to load each one of the package you will need.

```html
<!-- Add the core : -->
<script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/easy-gdpr@master/dist/egdpr.js">

<!-- Add the template you want. Here is the default template : -->
<script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/easy-gdpr@master/src/templates/default/dist/default.js">
<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/tsecher/easy-gdpr@master/src/templates/default/dist/default.css">
```


## Getting started

### Initialize easy-gdpr
To initialize the basic easy-gdpr tool you just have to load the core, set a template and then call init the function.

Using a es2015 packager like wepback
_(if you use a CDN, easy-gdpr core is available with the global variable `eGDPR`.)_
```javascript
// Import the core.
import { eGDPR } from "easy-gdpr"
// Import the default template
import { DefaultTemplate } from "easy-gdpr/src/templates/default/Default"

eGDPR
    .setTemplate( new DefaultTemplate() ) // Initialize the view
    .init() // Initialize the core
```

Here, we initialize the core and the view of easy-gdpr. However we did not add any service. So for the moment, the popup will just show a message telling there is no personal data service declared on your website.




> __Why do you have to init a template ? Why does it not implemented by default ?__
>
> Well... easy-GDPR is designed to allow you to customize the template, so you can choose any template or create your own. If a default template was loaded by default, it would also be loaded event if you wouldn't use it. This would digrease teh loading performance. So that's why, by default, there is no template defined. Yeah, that's true, there is a line code necessary before initialization, but we think it is the best compromise.

## Declare services
Now we want to declare services, so we can use the `addService` method which can be chained.
For performance, the best way is to declare services before initialisation. But you can declare services whenever you want.

```javascript
import { GTAGService } from "easy-gdpr/src/services/gtag/gtag"
import { MatomoService } from "easy-gdpr/src/services/matomo/matomo"


eGDPR
    // ----- Add services : 
    .addService( new GTAGService('U-*******') )
    .addService( new MatomoService('//matomo.php') )

    // -----
    .setTemplate( new DefaultTemplate() ) // Initialize the view
    .init() // Initialize the core
```

You can also use the `createService` method. The difference between `addService` and `createService` is : 
- `addService` declares the service and returns the egdpr core object
- `createService` declares the service and returns the service object. It can be usefull if you want to setup the service.



## Customize

### Group Services

You can group services if you want, using the `eGDPR.createGroup()` method. The group object allows you to add service into it.

```javascript
import { GTAGService } from "easy-gdpr/src/services/gtag/gtag"
import { MatomoService } from "easy-gdpr/src/services/matomo/matomo"

// Create services :
const gta = eGDPR.createService( new GTAGService('U-*******') )
const matomo = eGDPR.createService( new MatomoService('//matomo.php') )

// Create group :
const trackingGroup = eGDPR.createGroup('tracking_group', 'User Tracking', 'List of user tracking services')
// Add services to the group :
trackingGroup
    .addService(gta)
    .addService(matomo)

// Then initialize
eGDPR
    .setTemplate( new DefaultTemplate() ) // Initialize the view
    .init() // Initialize the core
```

### Handle services and groups order
By default, the services are ordered according to the order of their declaration. You can manage this order using the `setWeight()` method.


```javascript
import { GTAGService } from "easy-gdpr/src/services/gtag/gtag"
import { MatomoService } from "easy-gdpr/src/services/matomo/matomo"

// Create services :
const gta = eGDPR.createService( new GTAGService('U-*******') )
const matomo = eGDPR.createService( new MatomoService('//matomo.php') )
matomo.setWeight( -1 ) // Place matomo first.

// Then initialize
eGDPR
    .setTemplate( new DefaultTemplate() ) // Initialize the view
    .init() // Initialize the core
```

### Update texts and translations
You can easily redefine the default texts. Texts are managed with translations and you can override it easily. Each template use its own translations, such as services.
So you can override translation with an object according to the text_id : 
```json
{
    "text_id": "Your customized text"
}
```
The text ID can be found in the dom in the attribute `data-egdpr-l`.

So you can override translation using `eGDPR.addTranslation` : 
```javascript
import { GTAGService } from "easy-gdpr/src/services/gtag/gtag"
import { MatomoService } from "easy-gdpr/src/services/matomo/matomo"

// Create services :
const gta = eGDPR.createService( new GTAGService('U-*******') )
const matomo = eGDPR.createService( new MatomoService('//matomo.php') )

// Then initialize
eGDPR
    .addTranslations({
        'Your personal data': 'Manage your choice'
    })
    .setTemplate( new DefaultTemplate() ) // Initialize the view
    .init() // Initialize the core
```

### Create your service
#### Simple service.
You can create a quick service using the addService or createService with simple object : 
```javascript

// Then initialize
eGDPR
    // -------- Add a simple servuce
    .addService(
        {
            id: 'my_own_service',
            name: 'My Service',
            description: 'My own service description',
            start: function(){
                console.log('My own service is enabled')
            }
        }
    )
    // ----
    .setTemplate( new DefaultTemplate() ) // Initialize the view
    .init() // Initialize the core
```

### Create your template