# Services

Services are external or internal libraries that potentially use personal data. These tools should be declared in the bim-GDPR view in order to allow users to enable/disable their use at any time.
  
# Service principle


# More than a simple declaration
Unlike many of other tools that only declare services, bim-GDPR aims to be a centralisation tool for external services. 
bim-GDPR is not a simple enabling and disabling tool. 

When a website uses a service like Google analytics, developpers have to deals with GDPR declaration on one side and use on the other side.
bim-GDPR aims to centralize declaration and use. So when you have to use a service, you'd better use the bim-GDPR service interface.
Services are use hubs. Using the bim-GDPR dedicated service to use the service tools is a better solution that allows 
developers to discharge themselves about testing if the service is enabled or not. That also means that the service has to expose a dedicated 
api.

For example, this are two different ways to call the service features : 
```javascript

// 1. declare service.
const gaService = bgdpr.createService(new GoogleAnalyticsService('UA-******'))
// { ... }

// 2. use service 
document.querySelector('.test')
    .addEventListener('click', () =>{
    	// The bad way. This trigger an error if the service is not enabled.   
    	ga('send', 'pageview');
    	
    	// The good way  
    	gaService.push('send', 'pageview')
    })
```

 
