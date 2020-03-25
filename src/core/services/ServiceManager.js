import { Service } from "./Service";
import { ServiceEvents } from "./ServiceEvents";
import { sortByWeight, checkInterface } from "../tools/Tools";
import { Wrapper } from "../Wrapper";
import { ServiceStatusManager, ServiceStatus, Cookies} from "./ServiceStatusManager";

/**
 * The service interface.
 */
const ServiceInterface = {
    id: 'id',
    name: 'Name',
    description: 'description',
    start: function(){},
}

/**
 * The service manager.
 */
class ServiceManagerClass{

    constructor(){
        this.services = []
    }

    /**
     * Return the list of services.
     */
    getServicesList(){
        return this.services
    }

    /**
     * Return the list of enabled services.
     */
    getEnabledServicesList(){
        return this.services.filter( service => {
            return service.isEnabled()
        })
    }

    /**
     * Return the list of disabled services
     */
    getDisabledServicesList(){
        return this.services.filter( service => {
            return service.isDisabled()
        })
    }

    /**
     * Return the list of pending services
     */
    getPendingServices(){
        return this.services.filter( service => {
            return service.isPending()
        })
    }

    /**
     * Return the list of mandatory services.
     */
    getMandatoryServicesList(){
        return this.services.filter( service => {
            return service.isMandatory()
        })
    }

    /**
     * Init the default behaviors
     */
    init(){
        Wrapper.on( ServiceEvents.serviceListHasChanged ).subscribe((name, data) => this.sortServices())
    }
    
    /**
     * Add a service
     * 
     * @param {object} serviceData 
     */
    createService(serviceData){
        let service = serviceData

        // Check if service is a class.
        if( !(this.isService(serviceData))){
            service = this.overrideService(serviceData)
            if( !service ){
                return null
            }
        }

        if( !this.getServiceById(service.id) ){
            // Add weight to service
            service.weight = typeof(serviceData.weight) !== 'undefined'  ? service.weight : this.services.length
            service.init()
            this.services.push(service)

            // Init mandatory services.
            if(!service.isEnabled() && service.isMandatory()){
                this.enableService(service)
            }
            // Init enabled services.
            if( service.isEnabled() ){
                this.startService(service)
            }

            // Dispatch event.
            Wrapper.trigger( ServiceEvents.serviceListHasChanged, {
                    services: this.services
                })
            return service
        }
        else {
            throw `Service ${id} already exists`
        }
        return null
    }

    /**
     * Return a service from obj that match Service Interface
     * @param {*} serviceData 
     */
    overrideService(serviceData){
        let service = null
        if( checkInterface( ServiceInterface, serviceData, Wrapper.logsAreEnabled()) ){
            service = new Service()
            // Pseudo extension from object.
            for( let i in serviceData){
                service[i] = serviceData[i]
            }

            // Proto
            if(  Object.getOwnPropertyNames(Object.getPrototypeOf(serviceData)).indexOf('start') > -1 ){
                Object.getOwnPropertyNames(Object.getPrototypeOf(serviceData)).map(
                    propertyName => {
                        service[propertyName] = serviceData[propertyName]
                    }
                )

                if( 'function' === typeof(serviceData.getDefaultTranslations) ){
                    service.setTranslations( serviceData.getDefaultTranslations() )
                }
            }
            
            
        }
        
        return service
    }

    /**
     * Return a service by id.
     *
     * @param {string} id 
     * 
     * @returns {Service}
     */
    getServiceById(id){
        return this.services.filter(service => {
            return service.id === id
        })[0]
    }

    /**
     * Sort services
     */
    sortServices(){
        if( this.services.length > 1 ){
            this.services = this.services.sort((a,b) => sortByWeight(a,b))            
        }
        return this
    }

    /**
     * Return true if data is a service.
     * @param {*} serviceData 
     */
    isService(serviceData){
        return serviceData instanceof Service
    }

    /**
     * Enable all services.
     */
    enableAll(){
        this.enableService(this.services)
    }

    /**
     * Enable the service
     * 
     * @param {Service} service 
     */
    enableService(service, dispacth=true){
        if(Array.isArray(service)){
            service.map( s => { this.enableService(s, false)})
            Wrapper.trigger(ServiceEvents.serviceStatusHasChanged, {service: service})
        }
        else if( !service.isEnabled() ){
            ServiceStatusManager.setServiceStatus(service, ServiceStatus.enabled)
            service.onEnable()
            this.startService(service)
            if( dispacth ){
                Wrapper.trigger(ServiceEvents.serviceStatusHasChanged, {service: service})
            }
        }
    }

    /**
     * Start the service.
     *
     * @param {Service} service 
     */
    startService(service){
        service.getRelatedScripts().map(script => {
            if( typeof(script) === 'string'){
                Wrapper.addScript(script)
            }
            else{
                try {
                    if( script.path ){
                        Wrapper.addScript(script.path, script.callback)
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })

        service.start()
        Wrapper.trigger(ServiceEvents.serviceStart, {service: service})
    }

    /**
     * Disable all
     */
    disableAll(){
        this.disableService(this.services)
    }

    /**
     * Disable the service
     * 
     * @param {Service} service 
     */
    disableService(service, dispatch=true){
        if( Array.isArray(service)){
            service.map(s=>{this.disableService(s, false)})
            Wrapper.trigger(ServiceEvents.serviceStatusHasChanged, {service: service})
        }
        else{
            const serviceIsEnabled = service.isEnabled()
            if( ( serviceIsEnabled || service.isPending()) && !service.isMandatory()){
                if(service.isEnabled()){
                    this.stopService(service)
                    service.onDisable()
                }
                ServiceStatusManager.setServiceStatus(service, ServiceStatus.disabled)
                if( dispatch ){
                    Wrapper.trigger(ServiceEvents.serviceStatusHasChanged, {service: service})
                }
            } 

        } 
    }

    /**
     * Start the service.
     *
     * @param {Service} service 
     */
    stopService(service){
        service.stop()

        // Delete cookies.
        try {
            const listOfCookies = Object.keys(Cookies.get())
            const cookiesPatterns = service.getCookiePatterns()
            if( listOfCookies.length && cookiesPatterns.length ){
                listOfCookies
                    .filter( cookieName => {
                        for( let i in cookiesPatterns){
                            if( cookieName.match(cookiesPatterns[i]) ){
                                return true
                            }
                        }
                        return false
                    }) 
                    .map( cookieName => {
                        Cookies.remove(cookieName)
                    })
            }   
        } catch (error) {
            
        }
        
        // Delete scripts.
        service.getRelatedScripts().map(script => { 
            if( typeof(script) === 'string'){
                Wrapper.removeScript(script)
            }
            else if( script.path ){
                Wrapper.removeScript(script.path)
            }
        })
        
        Wrapper.trigger(ServiceEvents.serviceStop, {service: service})
    }

    /**
     * Toggle service
     */
    toggleService(service){
        if( service.isEnabled() ){
            this.disableService(service)
        }
        else{
            this.enableService(service)
        }
    }
}

export const ServiceManager = new ServiceManagerClass();