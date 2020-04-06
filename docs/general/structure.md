# Structure
Bim-GDPR is separated in different entities.
 
 - _The core_ : the core is the object that manages the main process of Bim-GDPR. 
 - _The services_ : the services are independant of the core. They are related to third-party tools that may use personal data of the application user.
 - _The templates_ : the templates are also independant of the core. They give the markup of displayed elements (such as services, groups and placeholders) that will be added to the DOM by the core in the view. 


## Core tools
The core is separated in several tools.

- _The Service Manager_ is the object that manages service activation, starting, stoping and disactivation.
- _The Group Manager_ is the object that manages groups.
- _The View Manager_ is the object that manages the View. The View is the interface between DOM and the Bim-GDPR core.
- _The Local Manager_ is the object that manages the texts and translations. 

