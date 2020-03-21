import { Wrapper } from "easy-gdpr/src/class/Wrapper";
import { View } from "easy-gdpr/src/class/View/View";
import { PREFIX, ID } from "easy-gdpr/src/class/Tools/Tools";
import { ViewEvents } from "easy-gdpr/src/class/View/ViewEvents";

class ViewManagerClass{

    /**
     * 
     */
    constructor(){
        this.view = View
    }

    /**
     * REturn body element.
     */
    get body(){
        if( !this._body ){
            this._body = document.querySelector('body')    
        }
        return this._body
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
            Wrapper.getServiceManager().enableAll()
            if( !this.detailPanelIsOpen()){
                this.hide()
            }            
        })
        this.addAction('all-disable', () => { 
            Wrapper.getServiceManager().disableAll()
            if( !this.detailPanelIsOpen()){
                this.hide()
            }            
        })

        // View
        this.addAction('view-toggle-detail', () => this.toggleDetailPanel())
        this.addAction('view-hide', () => this.hide())

        // Group
        this.addAction('group-toggle-detail', (data) => {
            this.view.view.querySelector(`[${PREFIX}view-group="${data.elemId}"]`).classList.toggle(ID+'-detail')
        })
        this.addAction('group-toggle', (data) => {
            data.group.toggleAll()
        })

        // Service.
        this.addAction( 'service-enable', (data) => { Wrapper.getServiceManager().enableService(data.service) })
        this.addAction( 'service-disable', (data) => { Wrapper.getServiceManager().disableService(data.service) })
        this.addAction( 'service-toggle', (data) => { Wrapper.getServiceManager().toggleService(data.service) })
    }

    /**
     * Return the template manager
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
            this.body.append(this.view.getViewElement())
            Wrapper.trigger(ViewEvents.showView, {})
            window.setTimeout(()=>{
                this.body.classList.add(ID+'-on')
            }, 1)
        }
    }

    /**
     * Hide interface
     */
    hide(){
        if( this.isDisplayed() ){
            window.setTimeout(()=>{
                this.body.classList.remove(ID+'-on')
                this.body.classList.remove(ID + '-detail')
                this.body.querySelectorAll('.'+ID + '-detail').forEach( item => {
                    item.classList.remove(ID + '-detail')
                })
            })

            try {
                this.getView().getTemplate().getClosePromise().then(() => {
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
        // Considering that pending elements are now disabled, because no explicit consentment but 
        // user has been prompted.
        if( !Wrapper.testMode ){
            Wrapper.getServiceManager().disableService(Wrapper.getServiceManager().getPendingServices())
        }
        Wrapper.trigger(ViewEvents.hideView, {})
        this.body.removeChild(this.view.getViewElement())
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
            evt.path.map( item => {
                // Parse all attributes
                for (let att, i = 0, atts = item.attributes, n = (atts ? atts.length : 0 ); i < n; i++){
                    att = atts[i];
                    // If attributes has matching prefix
                    if( att.nodeName.indexOf(PREFIX) === 0 ){
                        let attrData = att.nodeName.split('-'),
                            type = attrData.slice(2).join('-')

                        switch( attrData[2] ){
                            case 'service':
                                const service = Wrapper.getServiceManager().getServiceById(att.nodeValue)
                                this.callAction(type, {service:service, elemId:att.nodeValue})
                                break
                            case 'group':
                                const group = Wrapper.getGroupManager().getGroupById(att.nodeValue)
                                this.callAction(type, {group:group, elemId:att.nodeValue})
                                break
                            case 'view':
                            case 'all':
                                this.callAction(type, {} )
                                break
                        }
                    }
                } 
            } )  
        })
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
        this.body.classList.toggle(ID + '-detail')
    }

    /**
     * Return true if the detail panel is open.
     */
    detailPanelIsOpen(){
        return this.body.classList.contains(ID + '-detail')
    }

    /**
     * Init dom data.
     */
    initDomData(){
        // Service
        window.setTimeout( () => {
            document.querySelectorAll(`[${PREFIX}service][${PREFIX}status]`).forEach(item => {
                const service = Wrapper.getServiceManager().getServiceById(item.getAttribute(PREFIX + 'service'))
                if( service ){
                    item.setAttribute(`${PREFIX}status`, service.status)    
                }            
            })
            document.querySelectorAll(`[${PREFIX}group][${PREFIX}status]`).forEach(item => {
                const service = Wrapper.getGroupManager().getGroupById(item.getAttribute(PREFIX + 'group'))
                if( service ){
                    item.setAttribute(`${PREFIX}status`, service.status)    
                }            
            })
        }, 10)
    }
}

export const ViewManager = new ViewManagerClass()