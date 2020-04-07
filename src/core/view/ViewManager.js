import { Core } from "../Core";
import { PREFIX, ID } from "../tools/Tools";
import { View } from "./View";
import { ViewEvents } from "./ViewEvents";

class ViewManagerClass{

    /**
     *
     */
    constructor(){
        this.view = View
    }

    /**
     * REturn the wrapper element.
     */
    get parentElement(){
        return this.getView().getTemplate().getParentElement()
    }

    /**
     * Init.
     */
    init(){
        this.view.init();
        this.initBehaviors()
        this.initActions()
    }

    /**
     * Init behaviors
     */
    initActions(){
        // All
        this.addAction('all-enable', () => {
            Core.getServiceManager().enableAll()
            this.hide()
        })
        this.addAction('all-disable', () => {
            Core.getServiceManager().disableAll()
            this.hide()
        })

        // View
        this.addAction('view-toggle-detail', () => this.toggleDetailPanel())
        this.addAction('view-hide', () => this.hide())
        this.addAction('view-show', () => this.show())

        // Group
        this.addAction('group-toggle-detail', (data) => {
            this.view.view.querySelector(`[${PREFIX}view-group="${data.elemId}"]`).classList.toggle(ID+'-detail')
        })
        this.addAction('group-toggle', (data) => {
            data.group.toggleAll()
        })

        // Service.
        this.addAction( 'service-enable', (data) => { Core.getServiceManager().enableService(data.service) })
        this.addAction( 'service-disable', (data) => { Core.getServiceManager().disableService(data.service) })
        this.addAction( 'service-toggle', (data) => { Core.getServiceManager().toggleService(data.service) })
    }

    /**
     * Return the template manager
     *
     * @returns {View}
     */
    getView(){
        return this.view
    }

    /**
     * Return true if is displayed.
     */
    isDisplayed(){
        return document.querySelector(`[${PREFIX}view]`)
    }

    /**
     * Show interface
     */
    show(){
        if( !this.isDisplayed() ){

            this.parentElement.append(this.view.getViewElement())
            Core.trigger(ViewEvents.beforeShowView, {})
            try {
                this.getView().getTemplate().getShowPromise().then(() => {
                    this._doShow()
                })
            } catch (error) {
                this._doShow()
            }

        }
    }

    /**
     * Add class that show the element.
     */
    _doShow(){
        this.parentElement.classList.add(ID+'-on')
        Core.trigger(ViewEvents.afterShowView, {})
    }

    /**
     * Hide interface
     */
    hide(){
        if( this.isDisplayed() ){

            // Considering that pending elements are now disabled, because no explicit consentment but
            // user has been prompted.
            if( !Core.testMode ){
                Core.getServiceManager().enableService(Core.getServiceManager().getMandatoryServicesList())
                Core.getServiceManager().disableService(Core.getServiceManager().getPendingServices())
            }
            Core.trigger(ViewEvents.beforeHideView, {})

            // Remove classes
            this.parentElement.classList.remove(ID+'-on')
            this.parentElement.classList.remove(ID + '-detail')
            this.parentElement.querySelectorAll('.'+ID + '-detail').forEach( item => {
                item.classList.remove(ID + '-detail')
            })

            try {
                this.getView().getTemplate().getHidePromise().then(() => {
                    this._doHide()
                })
            } catch (error) {
                this._doHide()
            }
        }
    }

    /**
     * Remove view from dom.
     */
    _doHide(){
        this.parentElement.removeChild(this.view.getViewElement())
        Core.trigger(ViewEvents.afterHideView, {})
    }

    /**
     * Add actions callback.
     *
     * @param {string} type
     * @param {*} callback
     */
    addAction(type, callback){
        // Init actions list.
        this.actions = this.actions || []
        // Init action type liste
        this.actions[type] = this.actions[type] || []
        this.actions[type].push(callback)
    }

    /**
     * Add action to element
     */
    initBehaviors(attribute, callback){
        document.addEventListener('click', (evt)=>{
            this.initEventOnItem(evt.target, attribute, callback)
        })
    }

    initEventOnItem(item, attribute, callback){
        // Parse all attributes
        for (let att, i = 0, atts = item.attributes, n = (atts ? atts.length : 0 ); i < n; i++){
            att = atts[i];
            // If attributes has matching prefix
            if( att.nodeName.indexOf(PREFIX) === 0 ){
                let attrData = att.nodeName.split('-'),
                    type = attrData.slice(2).join('-')

                switch( attrData[2] ){
                    case 'service':
                        const service = Core.getServiceManager().getServiceById(att.nodeValue)
                        this.callAction(type, {service:service, elemId:att.nodeValue})
                        break
                    case 'group':
                        const group = Core.getGroupManager().getGroupById(att.nodeValue)
                        this.callAction(type, {group:group, elemId:att.nodeValue})
                        break
                    case 'view':
                    case 'all':
                        this.callAction(type, {} )
                        break
                }
            }
        }

        // Look up into fathers.
        if( item.parentNode ){
            this.initEventOnItem(item.parentNode, attribute, callback)
        }
    }

    /**
     * Call the list of attached action.
     *
     * @param {string} type
     * @param {*} data
     */
    callAction(type, data){
        this.actions = this.actions || []
        // Init action type liste
        this.actions[type] = this.actions[type] || []

        this.actions[type].map( callback => {
            callback(data)
        })
    }

    /**
     * Toggle detail.
     */
    toggleDetailPanel(){
        this.parentElement.classList.toggle(ID + '-detail')
    }

    /**
     * Return true if the detail panel is open.
     */
    detailPanelIsOpen(){
        return this.parentElement.classList.contains(ID + '-detail')
    }

    /**
     * Init dom data.
     */
    initDomData(){
        // Service
        window.setTimeout( () => {
            document.querySelectorAll(`[${PREFIX}service][${PREFIX}status]`).forEach(item => {
                const service = Core.getServiceManager().getServiceById(item.getAttribute(PREFIX + 'service'))
                if( service ){
                    item.setAttribute(`${PREFIX}status`, service.status)
                }
            })
            document.querySelectorAll(`[${PREFIX}group][${PREFIX}status]`).forEach(item => {
                const service = Core.getGroupManager().getGroupById(item.getAttribute(PREFIX + 'group'))
                if( service ){
                    item.setAttribute(`${PREFIX}status`, service.status)
                }
            })
        }, 10)
    }
}

export const ViewManager = new ViewManagerClass()
