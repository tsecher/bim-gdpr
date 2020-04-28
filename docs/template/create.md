# Template creation

### Create the template class
To create the template class you can use the npm command line : 

`npm run bgdpr new template`

Then the terminal will ask you. 
     
1. the id of your template : _my_template_
2. its public name : _My template_
3. the class name : _MyTemplateTemplate_ 

Once done, a new folder is created in ./bim-gdpr/templates/{your service id} (_./bim-gdpr/templates/my_template_)
In this folder you can find
    
- README.md : the documentation file (to complete),
- translations : a folder containing default translations.
- scss : a folder containing default scss.
- {your template id}.js : the file containing the class of your service.

### Defining the class
The auto generated class (./bim-gdpr/templates/{you template id}.js) allows you to define your own markup and other facilities such as translations.


### Create your markup
The template class auto generates 4 methods that allows you to render your own markup.
For some functional reasons, bim-GDPR needs to wrap some part of the markup such as service, and groups.
That's why your template must isolate these parts. To do so, the View object calls 4 methods that you can redefine.

Several constants are used in the default class : 
- `ID` is 'bgdpr'
- `PREDIX` is 'data-bgdpr'
- `CDN` is the url of the bgdpr cdn.


#### Render service markup
The `getServiceMarkup` allows you to define the markup used for a single service.

The markup should contain at least the list of elements to be functional : 
- a button with the attribute `${PREFIX}service-toggle="${service.id}"` to toggle the enabling status of the service
or 
- a button with the attribute `${PREFIX}service-enable="${service.id}"` to enable the service
- and a button with the attribute `${PREFIX}service-disable="${service.id}"` to disable the service
 

```javascript
    /**
     * Return the markup of a single service.
     *
     * @param {Service} service 
     */
    getServiceMarkup(service){        
        const doc = service.doc ? `<a href="${service.doc}" target="_blank">${service.doc}</a>` : ''
        
        return `
            <div class="${ID}-view-service line"  ${PREFIX}service="${service.id}" ${PREFIX}status="${service.status}">
                <div class="line-accept" ${PREFIX}service-toggle="${service.id}">
                    <svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#valid"></use>
                    </svg>
                </div>
                <div class="line-content">
                    <div class="${ID}-view-service-name">${this.html(service.name)}${this.getMandatoryText(service)}</div>
                    <div class="${ID}-view-service-description">${this.html(service.description)}</div>
                    ${doc}
                </div>
                <div>
                    <button data-bgdpr-service-toggle="${service.id}">
                        <span class="enable">${this.html('Enable')}</span>
                        <span class="disable">${this.html('Disable')}</span>
                    </button>  
                </div>
            </div>
        `
    }
```

#### No service is declared
The methods getNoServiceMarkup allows you to render the markup of the view when no services are delcared.

````javascript
    /**
     * Return the content when no service is declared.
     * 
     * @returns {string}
     */
    getNoServiceMarkup(){
        const content =  `
        <div class="${ID}-view-main">
            <div class="${ID}-view-head">
                ${this.html(`This site does not declare any service that could use your personal data`)}
            </div>
        </div>`

        return this.wrapper(content)
    }
````




### Interactions and behaviors.


### Strings and translations
To use translated text, you should use the `this.html` method in order to wrap texts.
This method also allows other developer to override the default text that you will define in your own template.


