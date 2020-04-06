# Declare service

Now we want to declare services. Services are independant classes so you can only load services you use on your application.


## addService
We can use the `addService` method which can be chained. 
For performance, the best way is to declare services before initialisation. But you can declare services whenever you want.

```javascript
import { GTAGService } from "bim-gdpr/src/services/gtag/gtag"
import { MatomoService } from "bim-gdpr/src/services/matomo/matomo"


bGDPR
    // ----- Add services : 
    .addService( new GTAGService('U-*******') )
    .addService( new MatomoService('//matomo.php') )

    // -----
    .setTemplate( new DefaultTemplate() ) // Initialize the view
    .init() // Initialize the core
```

## createService
You can also use the `createService` method. The difference between `addService` and `createService` is : 
- `addService` declares the service and returns the bgdpr core object
- `createService` declares the service and returns the service object. It can be usefull if you want to setup the service.
