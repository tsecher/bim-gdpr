# {ServiceName}

## Introduction
{ServiceDescription}
[{ServiceDoc}]({ServiceDoc})



## How to use

### Declare service
Add the service as you normally do with bim-gdpr
```javascript
    import { {ServiceClass} } from "../bim-gdpr/services/{ServiceId}/{ServiceId}"

    const {ServiceId} = new {ServiceClass}()
    bGDPR
        .addService({ServiceId})
```
