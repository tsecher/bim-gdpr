import { Core } from "../Core";
import { sortByWeight } from "../tools/Tools";
import { GroupEvents } from "./GroupEvents";
import { ServiceStatus } from "../services/ServiceStatusManager";

export class Group{

    constructor(id, name, description){
        this._id = id
        this._name = name
        this._description = description
        this.services = []
    }

    get id(){
        return this._id
    }

    get name(){
        return this._name
    }

    get description(){
        return this._description
    }

    get status(){
        const nbServices = this.services.length
        if( this.services.filter( service => {return service.isEnabled()}).length === nbServices ){
            return ServiceStatus.enabled
        }
        if( this.services.filter( service => {return service.isDisabled()}).length === nbServices ){
            return ServiceStatus.disabled
        }
        return ServiceStatus.pending
    }

    set id(id){
        this._id = id
        Core.trigger(ServiceEvents.groupHasChanged, {group: this})
    }

    set name(name){
        this._name = name
        Core.trigger(GroupEvents.groupHasChanged, {group: this})
    }

    set description(description){
        this._description = description
        Core.trigger(GroupEvents.groupHasChanged, {group: this})
    }

    /**
     * Return tru of all elements are mandatory.
     */
    isMandatory(){
        return this.services.filter( service => {
            return service.isMandatory()
        }).length === this.services.length
    }

    /**
     * Add a service into the group.
     *
     * @param {*} services 
     * 
     * @returns {Group}
     */
    addService(services){
        if(services){
            if( Array.isArray(services) ){
                services.map( service => this._doAddService(service) )
            }
            else{
                this._doAddService(services)
            }
        }
        return this
    }

    /**
     * Return the list of services.
     */
    getServicesList(){
        return this.services
    }

    /**
     * Add a service if possible.
     * 
     * @returns {Group}
     */
    _doAddService(serviceData){
        let service = Core.getServiceManager().getServiceById(serviceData.id)
        
        if( service ){
            this.services.push(service)
            this.services = this.services.sort((a,b) => sortByWeight(a,b))

            // View needs rebuild
            Core.trigger(GroupEvents.groupHasChanged, {group: this})
        }

        return this
    }

    /**
     * Accept all services
     * 
     * @returns {Group}
     */
    enableAll(){
        Core.getServiceManager().enableService(this.services)
        return this
    }

    /**
     * Deny ALl services.
     * 
     * @returns {Group}
     */
    disableAll(){
        Core.getServiceManager().disableService(this.services)
        return this
    }

    /**
     * Toggle all services.
     */
    toggleAll(){
        const status = this.status
        if( status !== ServiceStatus.enabled ){
            this.enableAll()
        }
        else{
            this.disableAll()
        }
        return this
    }

    /**
     * Set weight of group.
     * @param {*} weight 
     * 
     * @returns {Group}
     */
    setWeight(weight){
        this.weight = weight
        if( Core.getGroupManager().getGroupById(this.id) ){
            Core.trigger(GroupEvents.groupHasChanged, {group:this})
        }

        return this
    }
}