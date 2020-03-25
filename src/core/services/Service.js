import { Wrapper } from "../Wrapper";
import { ServiceEvents } from "ServiceEvents";
import { ServiceStatusManager, ServiceStatus } from "ServiceStatusManager";
import { LocalizedElementAbstract } from "../local/LocalizedElementAbstract";

export class Service extends LocalizedElementAbstract{
    
    constructor(id, name, description){
        super(id)
        this._id = id
        this._name = name
        this._description = description
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
        return ServiceStatusManager.getServiceStatus(this)
    }

    set id(id){
        this._id = id
        Wrapper.trigger(ServiceEvents.serviceHasChanged, {service: this})
    }

    set name(name){
        this._name = name
        Wrapper.trigger(ServiceEvents.serviceHasChanged, {service: this})
    }

    set description(description){
        this._description = description
        Wrapper.trigger(ServiceEvents.serviceHasChanged, {service: this})
    }

    /**
     * Return the cookie patterns.
     * 
     * Cookies with an id matching with this pattern will be removed when
     * when service will stop.
     */
    getCookiePatterns(){
        return []
    }

    /**
     * Return the list of scripts path to add.
     */
    getRelatedScripts(){
        return []
    }

    /**
     * Return the list of css path to add.
     */
    getRelatedCss(){
        return []
    }

    /**
     * Action when service is enabled.
     */
    onEnable(){ 
    }

    /**
     * Action when service is disabled.
     */
    onDisable(){ 
    }

    /**
     * Service run
     */
    start(){
        console.log(`Start ${this.name} (${this.id})`) 
    }

    /**
     * Service stop
     */
    stop(){
        console.log(`Stop ${this.name} (${this.id})`) 
    }

    /**
     * Is Mandatory
     */
    isMandatory(){
        return false 
    }

    /**
     * Is Enabled
     */
    isEnabled(){
        return this.status === ServiceStatus.enabled
    }

    /**
     * Is disabled
     */
    isDisabled(){
        return this.status === ServiceStatus.disabled
    }
    
    /**
     * Is Pending
     */
    isPending(){
        return this.status === ServiceStatus.pending
    }

    /**
     * Set weiught
     */
    setWeight(weight){
        this.weight = weight

        // If the service is already in the added services
        // we sort the services list
        if( Wrapper.getServiceManager().getServiceById(this.id) ){
            Wrapper.trigger(ServiceEvents.serviceListHasChanged, {
                    serviceManager: Wrapper.getServiceManager()
                })
        }

        return this
    }
}