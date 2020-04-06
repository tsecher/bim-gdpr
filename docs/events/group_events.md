# Group events list

You can use events importing them with `import { GroupEvents } from 'bim-gdpr/src/groups/GroupEvents'
`

Each event can be listened with the core `on` method
```javascript
import { GroupEvents } from 'bim-gdpr/src/groups/GroupEvents'

bGDPR.on(GroupEvents.groupHasChanged).subscribe( data => {
        console.log('data', data);
    })
```

## List

| Event name | Context | Subscription data |
|---|---|---|
|   groupListHasChanged   |    After the list of group has changed. Appears when a group has been added, or the list of groups has been re-ordered. |   The groupManager object: ```{groupManager <GroupManager>}```    |
|   groupHasChanged   |   After the service has changed. The service changes when id, name or description is updated. It also changes when a service has been added to the group |  The group that has changed ```{group <Group>}```  |
