import { GroupManager } from './Groups/GroupManager'
import { ServiceManager } from 'easy-gdpr/src/class/Services/ServiceManager';
import { ViewManager } from 'easy-gdpr/src/class/View/ViewManager';
import { Subject } from 'rxjs';
import { Service } from 'easy-gdpr/src/class/Services/Service';
import { Group } from 'easy-gdpr/src/class/Groups/Group';
import { ServiceEvents } from 'easy-gdpr/src/class/Services/ServiceEvents';
import { LocalManager } from 'easy-gdpr/src/class/Local/LocalManager';

const $scriptjs = require('scriptjs')


class WrapperClass{

    constructor(){
        this.logs = true
        this.testMode = false
        this.autoShow = true
        this.observables = []
        this.viewManager = ViewManager
        this.serviceManager = ServiceManager
        this.groupManager = GroupManager
        this.localManager = LocalManager

        this.autoShowCallback = () => {
            console.log('pending', this.serviceManager.getPendingServices());
            
            if( this.testMode || this.serviceManager.getPendingServices().length ){
                this.showView()
            }
        }
    }

    /**
     * Init and launch wrapper.
     */
    init(){
        this.serviceManager.init()
        this.groupManager.init()
        this.viewManager.init()
        this.localManager.init()

        // Run services.
        this.getServiceManager().getEnabledServicesList().map( service => { this.getServiceManager().startService(service)})

        // Auto show
        if( this.autoShow ){
            window.removeEventListener( 'DOMContentLoaded' , this.autoShowCallback)
            window.addEventListener( 'DOMContentLoaded' , this.autoShowCallback)
        }

        this.on(ServiceEvents.serviceStatusHasChanged).subscribe((data)=>this.initDomData());

        return this
    }

    /**
     * Set default language.
     * This language
     */
    setDefaultLanguage(language='en-UK'){
        this.localManager.setDefaultLanguage(language)
        return this
    }

    /**
     * Allow testing of 'fr-FR' instead of simply 'fr'
     */
    allowTryRegionalisation(){
        this.localManager.allowTryRegionalisation()
        return this
    }

    /**
     * Enable logs.
     */
    disableLogs(){
        this.logs = false
        return this
    }

    /**
     * Return true if logs are enabled.
     */
    logsAreEnabled(){
        return this.logs
    }

    /**
     * Returns the service manager.
     */
    getServiceManager(){
        return this.serviceManager
    }

    /**
     * Returns the group manager
     */
    getGroupManager(){
        return this.groupManager   
    }

    /**
     * Return the template Manager object.
     * 
     * @returns {ViewManager}
     */
    getViewManager(){
        return this.viewManager
    }

    /**
     * Return the local manager.
     *
     * @returns {LocalManager}
     */
    getLocalManager(){
        return this.localManager
    }

    /**
     * Allows to redefine the event that display
     * the popup at start.
     * 
     * @param {boolean} eventName 
     */
    disableAutoShow (){
        this.autoShow = false
        window.removeEventListener( 'DOMContentLoaded' , this.autoShowCallback)
        return this
    }

    /**
     * Dispatch rxjs event.
     */
    trigger(name, data){        
        if( this.logs ){
            console.log(`Trigger ${name}`, data)
        }
        
        if( this._observableIsDefined(name) ){
            this.observables[name].next({name, data})
        }

        return this
    }

    /**
     * Returns an subject.
     *
     * @param {*} name 
     * 
     * @returns {Subject}
     */
    on(name){        
        if (!this._observableIsDefined(name)) {
            this.observables[name] = new Subject()
        }
        return this.observables[name]
    }

    /**
     * Check if observable is defined and used.
     * @param {*} name 
     */
    _observableIsDefined(name){
        return this.observables
            && this.observables[name]
            && typeof (this.observables[name].next) === 'function'
    }

    /**
     * Add a service
     * 
     * @returns {Service}
     */
    createService(service){
        return this.serviceManager.createService(service)
    }

    /**
     * Returns a new group.
     *
     * @param {string} id 
     * @param {string} name 
     * @param {string} description 
     * 
     * @returns {Group}
     */
    createGroup(id, name, description){
        return this.groupManager.createGroup(id, name, description)
    }

    /**
     * Show view.
     */
    showView(){
        this.viewManager.show()
    }

    /**
     * Hide view
     */
    hideView(){
        this.viewManager.hide()
    }

    /**
     * Set the template of the view.
     *
     * @param {*} template 
     */
    setTemplate(template){
        this.viewManager.getView().setTemplate(template)
    }

    /**
     * Add a distant script
     */
    addScript(url, callback){
        $scriptjs(url, callback)
    }

    /**
     * Init dom attributes.
     */
    initDomData(){        
        this.viewManager.initDomData()
    }
}

export const Wrapper = new WrapperClass();