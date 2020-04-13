You can declare services with the two methods `bim.addService` and `bim.createService`. Each one of them are waiting for a parametter that is an object containing the properties of the ServiceInterface.
The ServiceInterface contains at least 4 properties :

- id (string) : the slug id of the service 
- name (string) : the public name of the service 
- description (string) : the public description of the service 
- start (function): the method called when the service is launched.
     
You can also override other methods that are used by the Service object ([Services methods](./methods.md))


`bim.addService` and `bim.createService` both build a Service object that is overriden with the properties of the parameter you give.
These two methods throw an error if at least one of the four mandatory property is missing.  

 

## Simple service

You can declare a simple service passing an object to the method `bim.addService`.
This object must contains at least 4 elements according to the ServiceInterface object :
```javascript
{
    id <String>,
    name <String>,
    description <String>,
    start <function>
}
```

For example : 
```javascript
bim.addService{
	{
		id: 'my_service',
		name: 'My public service name',
		description: 'My service public description',
		start: function() {
			alert('My service is starting');
		}
	}
}
```

This method is made for quick declaration of a custom service, but it is not appropriate for a sreusable service. That's why bim-GDPR comes with some tools to create more reusable services.

## Reusable service

bim-GDPR is made for reusability. So you can create a base class that will allow you to declare a type of service. It also provides you facilities to add translations.


For example, we want to declare a service that allows users to display a Facebook pixel. This Facebook pixel comes with a Facebook ID that may be different between websites, but it is the only thing that will change between them. The run process will be exactly the same.

In this case we will create a class where the constructor will have a Facebook ID parameter. It will then be easier to add this service on your different websites.

### Create the service class
To create the service class you can use the npm command line : 

`npm run bgdpr new service`

Then the terminal will ask you. 
     
1. the id of your service : _facebook_pixel_
2. its public name : _Facebook Pixel_
3. the class name : _FacebookPixelService_
4. the public description _Facebook tracking system_
5. the url of an official documentation of the service _https://developers.facebook.com/docs/marketing-api/audiences-api/pixel/_ 

Once done, a new folder is created in ./bim-gdpr/services/{your service id} (_./bim-gdpr/services/facebook_pixel_)
In this folder you can find
    
- README.md : the documentation file (to complete),
- translations : a folder containing default translations.
- {your service id}.js : the file containing the class of your service.

### Defining the class
The created class contains by default a list of methods. You can add your own process in each methods.

#### Example of constructor redefinition.
For example, we will create a new property in the constructor so that it will be easier to implement an object of our class FacebookPixelService.
Here we only add the facebookId property. 

```javascript
    /**
     * @param {string} facebookId
     *      The facebookId
     * @param {string} id 
     *      The id of the service
     * @param {string} name 
     *      The name of the service
     * @param {string} description 
     *      The description of the service
     */
    constructor(facebookId, id, name, description){
        this.facebookId = facebookId
        this.id = id || 'facebook_pixel'
        this.name =  name || "Facebook Pixel"
        this.description = description || "Facebook tracking system"
        this.doc = ""
        this.defaultLanguage = 'en'
    }
```

#### Example of start process
Here we redefine the start method that will be called every page load if the service is enabled.
```javascript
    /**
     * What to do when the service is enabled and is starting.
     */
    start(){
        // Already define.
        if (window.fbq) return

        // Queue events
        let n;
        n=window.fbq=function(){
            n.callMethod? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
        };
        if(!window._fbq)window._fbq=n;
        n.push=n;
        n.loaded=!0;n.version='2.0';
        n.queue=[]


        this.fbq('init', this.facebookId);
        this.fbq('track', 'PageView');
    }
```


#### Example of cookies pattern redefinition.
If you know the list of cookies names that are related to your service, you can define them in the `getCookiePatterns` method.
Theses cookies will be removed when the service will be disabled.

```javascript
    /**
     * Return the list of pattern that match the possible service cookie name.
     * 
     * All the cookies which name matches any of these pattern will be removed, when
     * service is disabled.
     * 
     * @returns {Array}
     */
    getCookiePatterns(){
        return [/datr/, /fr/, /reg_ext_ref/, /reg_fb_gate/, /reg_fb_ref/, /sb/, /wd/, /x-src/]
    }
```

#### Example of related scripts redefinition
If your service load external scripts, you can declare them in the `getRelatedScripts`method. :

```javascript
    /**
     * Return the list of related external scripts
     * 
     * @returns {Array}
     */
    getRelatedScripts(){
        return [
            'https://connect.facebook.net/en_US/fbevents.js',
        ]
    }
```

You can also define callbacks when script is loaded : 

```javascript
    /**
     * Return the list of related external scripts
     * 
     * @returns {Array}
     */
    getRelatedScripts(){
        return [
        	{
        	    'path' : 'https://connect.facebook.net/en_US/fbevents.js', 
                'callback' : ()=>{
                    console.log('Script loaded')
                }
        	}
        ]
    }
```




### String and translations
The service public name and description are displayed in the view. Then it could be great to add translations to the information text of your service.
The more your information is understandable, the more your service will be enabled.

That's why you can define the translations json file location in the method `getDefaultTranslations`
This method should return a list of translations files that a user will load according to its browser language.
That's why the path of the translation file should contain a token that will be replaced by the user language.
For example : 
````javascript
    /**
     * Return the default list of translation files.
     * 
     * Must return a list of translations files url. Each url should contain a ${LANGUAGE_TOKEN} char, that 
     * will be replaced by the user language. For instance, a french user will load the file
     *  'CDN + `src/templates/{TemplateId}/translations/fr-FR.json`'
     * 
     * @returns {Array}
     */
    getDefaultTranslations(){
        return [
            CDN + `src/services/facebook_pixel/translations/${LANGUAGE_TOKEN}.json`,
        ]
    }
````
In this case, a german user will load the file : CDN + `src/services/facebook_pixel/translations/de.json`
The translations file are only loaded once. Then, translations are stocked in local storage (if possible).
