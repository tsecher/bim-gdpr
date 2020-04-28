# Templates


## Principle
Templates are defined in a dedicated class. The core View object uses the template element to insert the user interface into the document DOM.
Templates deliver the markup of the interface with 4 methods :

| Methods | Info |
|-----|----|
| getNoServiceMarkup | Return the markup of the view when no service is declared |
| getViewMarkup(contentData) | Return the markup of the entire view.<br/> `contentData` is not object that can contain the list of services markups or groups markups if groups are defined |
| getGroupMarkup(group, serviceListMarkup) | Returns the markup of a group.<br/> `group` is the Group object and `serviceListMarkup` is the list of services markups.  |
| getServiceMarkup(service) | Returns the markup of the service.<br/> `service` is a Service object |



