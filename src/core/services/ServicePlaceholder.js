import { PREFIX } from '../tools/Tools'
import { Core } from '../Core'
import { ServiceEvents } from './ServiceEvents'

export class ServicePlaceholder{

    /**
     * Init
     */
    init(){
        // On status change.
        Core.on(ServiceEvents.serviceStatusHasChanged).subscribe((data)=>{
            if(data.data && data.data.services){
                data.data.services.map( service => this.initServiceDOM( service ) );
            }
        })

        // On dom loaded.
        window.addEventListener( 'DOMContentLoaded' , () => this.onDomLoaded())
    }

    /**
     * Init the dom associated
     *
     * @param {*} data 
     */
    initServiceDOM(service) {
        const selectorOn = `[${PREFIX}visible-if-enabled="${service.id}"]`
        const selectorOff = `[${PREFIX}hidden-if-enabled="${service.id}"]`

        if( service.isEnabled() ){
            document.querySelectorAll(selectorOn).forEach(
                element => this.showElement(element) );
            document.querySelectorAll(selectorOff).forEach(
                element => this.hideElement(element) );
        }
        else{
            document.querySelectorAll(selectorOn).forEach(
                element => this.hideElement(element) );
            document.querySelectorAll(selectorOff).forEach(
                element => this.showElement(element) );
        }   
    }
    
    /**
     * On dom loaded.
     */
    onDomLoaded(){
        // Show enabled placeholder
        const selectorOn = `${PREFIX}visible-if-enabled`
        document.querySelectorAll(`[${selectorOn}]`)
            .forEach( element => this.initDOMItem(element, selectorOn, this.showElement, this.hideElement) )

        // Hide enabled placeholder
        const selectorOff = `${PREFIX}hidden-if-enabled`
        document.querySelectorAll(`[${selectorOff}]`)
            .forEach( element => this.initDOMItem(element, selectorOff, this.hideElement, this.showElement) )
    }

    /**
     * Init a dom element according to service.
     *
     * @param {DOMElement} element 
     * @param {string} selector 
     * @param {function} enabledCallback 
     * @param {function} disabledCallback 
     */
    initDOMItem( element, selector, enabledCallback, disabledCallback ){
        const service = Core.getServiceById(element.getAttribute(selector))
        if( service && service.isEnabled() ){
            enabledCallback(element)
        }
        else{
            disabledCallback(element)
        }
    }

    /**
     * Hide element.
     *
     * @param {*} element 
     */
    hideElement(element){
        element.outerHTML = element.outerHTML.replace(/div/g,"noscript");
    }

    /**
     * Show element.
     * 
     * @param {*} element 
     */
    showElement(element){
        element.outerHTML = element.outerHTML.replace(/noscript/g,"div");
    }
}