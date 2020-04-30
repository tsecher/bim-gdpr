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
The template class auto-generates 4 methods that allows you to render your own markup.
For some functional reasons, bim-GDPR needs to wrap some part of the markup such as service, and groups.
That's why your template must isolate these parts. To do so, the View object calls 4 methods that you can redefine.


| Methods | Info |
|-----|----|
| getNoServiceMarkup | Return the markup of the view when no service is declared |
| getViewMarkup(contentData) | Return the markup of the entire view.<br/> `contentData` is not object that can contain the list of services markups or groups markups if groups are defined |
| getGroupMarkup(group, serviceListMarkup) | Returns the markup of a group.<br/> `group` is the Group object and `serviceListMarkup` is the list of services markups.  |
| getServiceMarkup(service) | Returns the markup of the service.<br/> `service` is a Service object |



### Interactions and behaviors.
The view manager comes with an action system that allows you to execute processes by clicking on items that have a certain attribute.
For example, the persistent button that you can find on the bottom-right of a window contains the attribute data-bgpr-toggle-view. That attribute
indicates to the view manager that he has to toggle the visible state of the view.

Here you can find the list of attributes that trigger actions :

| Attributes | Info |
|------|------|
| all-enable |Enable all services|
| all-disable |Disable all services|
| view-toggle-detail |Toggle view display|
| view-hide | Hide the view |
| view-show | Show the view |
| group-toggle-detail | Toggle group detail display |
| group-toggle | Toggle enable status of all the services of a group |
| service-enable | Enable the service |
| service-disable | Disable the service |
| service-toggle | Toggle the service status |


### Strings and translations
To use translated text, you should use the `this.html` method in order to wrap texts.
This method also allows other developer to override the default text that you will define in your own template.

This code above shows you how to define a default text, and then a-how it could be overriden in particular context.

```javascript
/**
 * Class for the my_template template.
 */
export class MyTemplateTemplate{

    // {...}
    
     /**
     * Return the content when no service is declared.
     * 
     * @returns {string}
     */
    getNoServiceMarkup(){
        return  `
            <div>
                ${this.html(`This is a message`)}
            </div>`
    }

}


// Then other developpers can override this message :
bgdpr.addTranslation({
    'This is a message': 'This is a particular message'
})
```



