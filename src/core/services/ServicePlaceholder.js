import { PREFIX } from '../tools/Tools'
import { Core } from '../Core'
import { ServiceEvents } from './ServiceEvents'
import { Service } from './Service';

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
            .forEach( element => {
                const service = this.getServiceFromElement(element, selectorOn)
                this.initDOMItem(element, service, this.showElement, this.hideElement)
             } )

        // Hide enabled placeholder
        const selectorOff = `${PREFIX}hidden-if-enabled`
        document.querySelectorAll(`[${selectorOff}]`)
            .forEach( element => {
                const service = this.getServiceFromElement(element, selectorOff)
                this.initDefaultPlacehoder(element, service)
                this.initDOMItem(element, service, this.hideElement, this.showElement)
             })
    }

    /**
     * Init a dom element according to service.
     *
     * @param {DOMElement} element 
     * @param {Service} selector 
     * @param {function} enabledCallback 
     * @param {function} disabledCallback 
     */
    initDOMItem( element, service, enabledCallback, disabledCallback ){
        if( service && service.isEnabled() ){
            enabledCallback(element)
        }
        else{
            disabledCallback(element)
        }
    }

    /**
     * Return the service related to the element
     * 
     * @param {Element} element 
     * @param {string} selector 
     */
    getServiceFromElement(element, selector){
        return Core.getServiceById(element.getAttribute(selector))
    }

    /**
     * Add a default placeholder if needed
     *
     * @param {Element} element 
     * @param {*} service 
     */
    initDefaultPlacehoder(element, service){
        if(element.innerHTML.trim().length == 0){
            try {                
                const content = Core.getTemplate().initDefaultPlaceholder(element, service)
                if( content ){
                    element.innerHTML = content
                }
            } catch (error) {   
            }
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
