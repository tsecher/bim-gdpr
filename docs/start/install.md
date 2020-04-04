# Install Easy-GDPR

## Using NPM
    
    npm install easy-gdpr

## Using CDN 
Easy-GDPR allows you to use onlty the elements that your website need. So the user don't load the code for services you don't declare. That's why the easy-GDPR core, templates and services are in different js files. So you need to load each one of the package you will need.

```html
<!-- Add the core : -->
<script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/easy-gdpr@master/dist/egdpr.js"></script>

<!-- Add the template you want. Here is the default template : -->
<script type="text/javascript" src="//cdn.jsdelivr.net/gh/tsecher/easy-gdpr@1.x/src/templates/default/dist/default.js"></script>
<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/tsecher/easy-gdpr@1.x/src/templates/default/dist/default.css"/>
```
