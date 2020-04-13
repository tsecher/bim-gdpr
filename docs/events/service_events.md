# Service events list

You can use events importing them with `import { ServiceEvents } from 'bim-gdpr/src/services/ServiceEvents'
`

Each event can be listened with the core `on` method
```javascript
import { ServiceEvents } from 'bim-gdpr/src/services/ServiceEvents'

bGDPR.on(ServiceEvents.serviceStart).then( data => {
        console.log('data', data);
    })
```

## List

| Event name | Context | Subscription data |
|---|---|---|
|   serviceListHasChanged   |    After the list of services has changed. Appears when a service has been added, or the list of services has been re-ordered. |The serviceManager object: ```{serviceManager <ServiceManager>}```    |
|   serviceHasChanged   |   After the service has changed. The service changes when id, name or description is updated. <br/><br/>_The service is not considered updated when status or order change. So you'd better use serviceListHasChanged to track order changes or serviceStatusHasChanged to track status changes_   |  The service that has changed ```{service <Service>}```  |
|   serviceStatusHasChanged     |   After the service status has change. | The list of services that has changed : ```{services:[... <Service>]}```     |
|   serviceStart   |   After a service starts.   |  The service that has changed ```{service <Service>}```|
|   serviceStart    |   After a service stops.   |  The service that has changed ```{service <Service>}```|
