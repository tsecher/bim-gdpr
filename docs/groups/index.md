# Groups

## Principle
Services can be wrapped into groups. Groups are made to facilitate the choice of a user. 
In general, users don't have the experience to conscientiously know the impact of enabling or disabling each service. 
On another side, most of the service can display the same philosophy. For example, you can have several services that "track" the visit, and several services that "provides content".
Most of the time, users are attached to the global philosophy of services. That's why grouping services by philosophy can facilitate and speed up the user choice.

The philosophy of services are not service dependant, they are project dependant. That's why groups are the project and developper responsabilities.


## How to create groups.
You can create group with the methods `createGroup`. Each group is created with 3 properties :
- id<string> : The id of the group.
- name<string> : The name of the group.
- description<string>: The description of the group.

You can also set the weight of a group once creates to order them.

Once a group is created, you can add services to a group. Services can be added to several groups.

Here is an example how to handle groups : 
```javascript
import bgdpr from "bim-gdpr"

// Create services
const s1 = bgdpr.createService(new MyService1('s1'))
const s2 = bgdpr.createService(new MyService2('s2'))
const s3 = bgdpr.createService(new MyService2('s3'))
const s4 = bgdpr.createService(new MyService2('s4'))

// Create groups
const group1 = bgdpr.createGroup('group1', 'Group 1', 'List of services with philosophy 1')
const group2 = bgdpr.createGroup('group2', 'Group 2', 'List of services with philosophy 2')


// Add services.
group1
    .addService(s1)
    .addService(s2)
    .addService(s3)
    
group2 
    .addService(s3)
    
// set weight.
group2.setWeight(1)
group1.setWeight(0)
```


Service that are not added to a group will be added to an automatically created group.
