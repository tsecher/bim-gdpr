# Events

Events are managed with rxjs subjects. You can find further information on [the officiel website of rxjs](https://rxjs-dev.firebaseapp.com/guide/subject)

## Principle
The bGDPR is an event manager. You can listen and dispatch events using it. 

Only listened events are dispatched. So no event is dispatched until a related event is declared.

## How to listen an event
To listen an event, you can use the `on` method. It returns a RXJS subject that has to be subscribed. The subscription function get a parameters that contains the name of the event and contetual data.

```javascript
import { ServiceEvents } from 'bim-gdpr/src/services/ServiceEvents'

bGDPR.on(ServiceEvents.serviceStart).subscribe( data => {
        console.log('data', data);
    })
```

A list of available events can be found :

- Service events [here](./service_events.md)
- View events [here](./view_events.md)
- Group events [here](./group_events.md)


## How to dispatch an event
You can dispatch your own events using the `trigger` method. This methods needs the name of the event trigger. You can also send contextual data.

For better use, please export the name of your custom event. By this way, you facilitate the use of your event by third-party users.

```javascript
    export const MY_OWN_EVENT='bgdpr-my-own-event'
    bGDPR.trigger(
        MY_OWN_EVENT, 
        { 
            my_own_data_1: 'my_own_value_1',
            my_own_data_2: 'my_own_value_2'
        })
```
