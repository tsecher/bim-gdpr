import { Group } from "./Group";
import { sortByWeight } from "../tools/Tools";
import { Wrapper } from "../Wrapper";
import { GroupEvents } from "./GroupEvents";
import { ViewEvents } from "../view/ViewEvents";


/**
 * Group manager.
 */
class GroupManagerClass{

    constructor(){
        this.groups = []
    }

    /**
     * Init behaviors when group or grouplist has changed.
     */
    init(){
        Wrapper.on(GroupEvents.groupListHasChanged).subscribe( (name, data) => this.sortGroups() )
        Wrapper.on(GroupEvents.groupHasChanged).subscribe( (name, data) => this.sortGroups() )
    }

    /**
     * Add a group.
     *
     * @param {string} id 
     * @param {string} name 
     * @param {string} description 
     */
    createGroup(id, name, description){
        if( !this.getGroupById(id) ){
            const group = new Group(id, name,description)
            group.weight = typeof(group.weight) !== 'undefined'  ? group.weight : this.groups.length
            this.groups.push(group)

            this.sortGroups()

            Wrapper.trigger(GroupEvents.groupListHasChanged, {groupManager:this})
            return group;
        }
        else{
            if (this.logs){
                throw `Group ${id} already exists`
            }
        }
        return false
    }

    /**
     * Returns the list of all groups.
     */
    getGroupsList(){
        return this.groups
    }

    /**
     * Returns the group by id.
     *
     * @param {string} id 
     */
    getGroupById(id){
        return this.groups.filter( group => { return group.id === id })[0]
    }

    /**
     * Sort the groups by weight.
     */
    sortGroups(){
        this.groups = this.groups.sort((a,b) => sortByWeight(a,b))

        // Needs rebuild.
        Wrapper.trigger(ViewEvents.needsRebuild)

        return this
    }

    /**
     * Return the list of ungrouped services.
     */
    getUnGroupedServices(){
        let groupedServices = []

        // Get all grouped Services.
        this.groups.map( group => {
            groupedServices = groupedServices.concat(group.getServicesList().map(service => { return service.id }))
        })

        // Disctinct services.
        groupedServices = [...new Set(groupedServices)]

        // unGroupedServices
        let unGroupedServices = 
            Wrapper.getServiceManager().getServicesList().map( service => {return service.id})
                 .filter( id => { return groupedServices.indexOf(id) === -1 })
                .map( id => { return Wrapper.getServiceManager().getServiceById(id)})

        return unGroupedServices
    }
}

export const GroupManager = new GroupManagerClass()