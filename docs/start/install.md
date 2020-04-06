# Install Bim-GDPR

## Using NPM
    
    npm install bim-gdpr

## Using CDN 
Bim-GDPR allows you to use onlty the elements that your website need. So the user don't load the code for services you don't declare. That's why the Bim-GDPR core, templates and services are in different js files. So you need to load each one of the package you will need.

```html
<!-- Add the core : -->
<script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/bim-gdpr@master/dist/bgdpr.js"></script>

<!-- Add the template you want. Here is the default template : -->
<script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/bim-gdpr@1.x/src/templates/default/dist/default.js"></script>
<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/tsecher/bim-gdpr@1.x/src/templates/default/dist/default.css"/>
```
