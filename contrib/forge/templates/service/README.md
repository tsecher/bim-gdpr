# {ServiceName}

## Introduction
{ServiceDescription}
[{ServiceDoc}]({ServiceDoc})



## How to use

### Declare service
Add the service as you normally do with easy-gdpr
```javascript
    import { {ServiceClass} } from "../easy-gdpr/services/{ServiceId}/{ServiceId}"

    const {ServiceId} = new {ServiceClass}()
    eGDPR
        .addService({ServiceId})
```
