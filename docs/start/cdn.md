#Use CDN

## Installation

You can use a cdn to implement bim-GDPR easily but be careful, the CDN is not Internet Explorer compatible. 
Bim-GDPR allows you to use onlty the elements that your website needs. So the user don't load the code for services you don't declare. That's why the Bim-GDPR core, templates and services are in different js files. 

You need to load each one of the package you will need.

```html
<!-- Add the core : -->
<script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/bim-gdpr@master/dist/bgdpr.js"></script>

<!-- Add the template you want. Here is the default template : -->
<script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/bim-gdpr@master/src/templates/default/dist/default.js"></script>
```



## Initialisation
The philosophy of bim-GDPR is to deliver only what will be used by your user. That's why most of elements you use in bim-GDPR are modular entities.
So you have to load each part of elements you use.

For example : 

```html
    <!-- Add the core : -->
    <script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/bim-gdpr@master/dist/bgdpr.js"></script>
    
    <!-- Add the template you want. Here is the default template : -->
    <script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/bim-gdpr@master/src/templates/default/dist/default.js"></script>

    <script type="text/javascript">
        bgdpr
            .setTemplate( new bgdpr.template_class.DefaultTemplate() ) // Initialize the view
            .init() // Initialize the core
    </script>
```

Here, we initialize the core and the view of bim-gdpr. However we did not add any service. So for the moment, the popup will just show a message telling there is no personal data service declared on your website.




> __Why do you have to init a template ? Why is it not implemented by default ?__
>
> Well... Bim-GDPR is designed to allow you to customize the template, so you can choose any template or create your own. If a default template was loaded by default, it would also be loaded event if you wouldn't use it. This would digrease teh loading performance. So that's why, by default, there is no template defined. Yeah, that's true, there is a line code necessary before initialization, but we think it is the best compromise.
 



## Declare services
You can use the `addService` method which can be chained. 
For performance, the best way is to declare services before initialisation. But you can declare services whenever you want.


```html
    <!-- Add the core : -->
    <script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/bim-gdpr@master/dist/bgdpr.js"></script>
    
    <!-- Add the template you want. Here is the default template : -->
    <script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/bim-gdpr@master/src/templates/default/dist/default.js"></script>
        
    <!-- Add the services you use. Here is the default template : -->
    <script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/bim-gdpr@master/src/services/gtag/dist/gtag.js"></script>
    <script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/bim-gdpr@master/src/services/matomo/dist/matomo.js"></script>

    <script type="text/javascript">
        bgdpr
            // ----- Add services :
            .addService( new bgdpr.services_class.GTAGService('U-*******') )
            .addService( new bgdpr.services_class.MatomoService('//matomo.php') )

            .setTemplate( new bgdpr.template_class.DefaultTemplate() ) // Initialize the view
            .init() // Initialize the core
    </script>
```


## Why CDN is not compatible with Internet Explorer
On February 2020, Internet Explorer world usage is about 6%. IE javascript interpretation is getting old an many of new features used by bim-gdpr must be polyfilled.
Polyfills are part of code loaded uselessly by all the users, including 94% of users that use recent browsers that don't need polyfills. 
In that way, polyfills increase the size of loaded files, and that is underperforming for users, and ecology. 
That's why we don't want that 6% of users penalize 94% of other users. 

If you want a full IE compatibility, please use your own polyfills or tools like [babel](https://babeljs.io/)  
