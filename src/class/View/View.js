import { Wrapper } from "easy-gdpr/src/class/Wrapper";
import { ViewEvents } from "easy-gdpr/src/class/View/ViewEvents";
import { Group } from "easy-gdpr/src/class/Groups/Group";
import { ServiceEvents } from "easy-gdpr/src/class/Services/ServiceEvents";
import { Service } from 'easy-gdpr/src/class/Services/Service';
import { GroupEvents } from "easy-gdpr/src/class/Groups/GroupEvents";
import { PREFIX, checkInterface } from "easy-gdpr/src/class/Tools/Tools";
import { DefaultTemplate } from "easy-gdpr/src/Templates/Default/DefaultTemplate";


export const TemplateInterface = {
    getNoServiceMarkup: function(){},
    getViewMarkup: function(){},
    getServiceMarkup: function(){},
    getGroupMarkup: function(){},
    defaultLanguage: 'fr',
}

class ViewClass{

    constructor(){
        this.timeoutValue = 200
        this.rebuildTimeout = null
        this.needsRebuild('all')
    }

    init(){
        this.setTemplate(new DefaultTemplate())
        
        // Add listeners for rebuild.
        Wrapper.on(ViewEvents.needsRebuild).subscribe((data)=> {
            this.needsRebuild( data.data ? data.data.type : 'all', data.data ? data.data.data: {} )
        });

        // Services events
        Wrapper.on(ServiceEvents.serviceHasChanged).subscribe(data => this.needsRebuild('service', data.data))
        Wrapper.on(ServiceEvents.serviceListHasChanged).subscribe(data => this.needsRebuild('all', {}))

        // Group events
        Wrapper.on(GroupEvents.groupHasChanged).subscribe(data => this.needsRebuild('group', data.data))
        Wrapper.on(GroupEvents.groupListHasChanged).subscribe(data => this.needsRebuild('all', {}))

        return this
    }

     /**
     * Indicates that view needs rebuild
     */
    needsRebuild(type, data){
        this._needsRebuildData = this._needsRebuildData || []
        switch(type){
            case 'all':
                if(!this.hasToRebuildAll() ){
                    this._needsRebuildData = [{'type':'all'}]
                }
                break;
            case 'group':
                if( this.hasToRebuildGroup(data.group) ){
                    this._needsRebuildData.push({'type':'group', element:data.group})
                }
                break;
            case 'service':
                if( this.hasToRebuildService(data.service) ){
                    this._needsRebuildData.push({'type':'service', element:data.service})
                }
                break;
        }

        // Launch the timeout in order to build only necessary each time
        window.clearTimeout(this.rebuildTimeout)
        this.rebuildTimeout=window.setTimeout(()=>this.rebuild(), this.timeoutValue)
        return this
    }
    
    /**
     * 
     */
    hasToRebuildAll(){         
         return this._needsRebuildData 
                    && this._needsRebuildData.filter(item => {return item.type === 'all'}).length > 0
    }

    /**
     * 
     * @param {Group} group 
     */
    hasToRebuildGroup(group){
        // If all rebuild is already asked, then no group rebuild needed
        return !this.hasToRebuildAll()
    }

    /**
     * @param {Service} service
     */
    hasToRebuildService(service){
        // If all rebuild is already asked, then no group rebuild needed
        if(this.hasToRebuildAll()){
            return false
        }
        return true
    }

    /**
     * Return the template
     */
    getTemplate(){
        return this.template
    }

    /**
     * Update the template.
     * @param {Template} template 
     */
    setTemplate(template){
        if( checkInterface(TemplateInterface, template, Wrapper.logsAreEnabled()) ){
            this.template = template
            Wrapper.setDefaultLanguage(this.template.defaultLanguage)
            Wrapper.trigger(ViewEvents.needsRebuild, {type:'all'})
        }
        return this
    }

    /**
     * Rebuild needed
     */
    rebuild(){
        if( this._needsRebuildData && this.view ){
            // IF all is needed
            if( this.hasToRebuildAll() ){
                if( Wrapper.getServiceManager().getServicesList().length ){
                    this.view.innerHTML = this.getViewMarkup()
                }
                else{
                    this.view.innerHTML = this.template.getNoServiceMarkup()
                }
                
            }
            else{
                this._needsRebuildData.map( rebuildData => {

                    // Get the view of the specific element.
                    let content = '';
                    switch( rebuildData.type ){
                        case 'service':
                            content = this.template.getServiceMarkup(rebuildData.element);
                            break
                        case 'group': 
                            content = this.template.getGroupMarkup(rebuildData.element, this.getServicesMarkupList(rebuildData.element.getServicesList()));
                            break
                    }

                    const selector = `[${PREFIX}view-${rebuildData.type}="${rebuildData.element.id}"]`
                    const elements =  this.view.querySelectorAll(selector)
                    elements.forEach( el => {
                        el.innerHTML = content
                    })
                    
                })
            }

            Wrapper.trigger(ViewEvents.hasRebuild)
            this._needsRebuildData = null
        }

        return this
    }

    /**
     * Return the view element.
     */
    getViewElement(){
        if( !this.view ){
            this.view = document.createElement('div')
            this.view.setAttribute( PREFIX+'view', '')
            this.rebuild()
        }
        return this.view
    }

    /**
     * Return the markup of the view
     */
    getViewMarkup(){
        // Organise the data for template.
        const content = this.getContentMarkupFromData(this.getViewData())
        return this.template.getViewMarkup(content)
    }

    /**
     * Return the data for the view.
     */
    getViewData(){
        const data = {}
        const groups = Wrapper.getGroupManager().getGroupsList();
        if(groups.length){
            data.type = 'group'
            data.data = {}
            data.data.groups = groups
            data.data.ungrouped_services = Wrapper.getGroupManager().getUnGroupedServices()
        }
        else{
            data.type = 'services'
            data.data = {}
            data.data.services = Wrapper.getServiceManager().getServicesList()
        }

        return data
    }

    /**
     * Return the list of service markup.
     */
    getContentMarkupFromData(data){
        let content = ''
        switch(data.type){
            case 'group':
                content = this.getContentForGroupedView(data.data)
                break
            case 'services':
                content = this.getContentForServicesView(data.data)
            break
            default: 
                content=''
        }

        return content
    }

    /**
     * Return the content markup for grouped views.
     * @param {obj} data 
     */
    getContentForGroupedView(data){
        let content = {
            type: 'groups',
            groups: []
        }
        // Display groups.
        
        data.groups.map( group => { 
            content.groups.push( this.getGroupMarkup(group) )
        })

        // Display other ungrouped services.
        if( data.ungrouped_services.length ){
            content.groups.push( this.getUngroupedMarkup(data.ungrouped_services) )
        }

        return content
    }

    /**
     * REturn the content markup for views without group
     */
    getContentForServicesView(data){    
        let content = {
            type: 'services',
            services: this.getServicesMarkupList(data.services)
        }

        return content
    }

    /**
     * 
     * @param {*} servicesList 
     */
    getServicesMarkupList(servicesList){
        return servicesList.map( service => {
            return `<div ${PREFIX}view-service="${service.id}">${this.template.getServiceMarkup(service)}</div>`
        })
    }

    /**
     * Get the markup of un^ped services using a pseudo Group 'other'
     */
    getUngroupedMarkup(ungroupedServicesList){
        const pseudoGroup = Wrapper.createGroup('default', 'Other', '')
        ungroupedServicesList.map( service => pseudoGroup.addService(service))
        return this.getGroupMarkup(pseudoGroup, this.getServicesMarkupList(ungroupedServicesList))
    }

    /**
     * Return the markup of a group
     *
     * @param {*} group 
     */
    getGroupMarkup(group){
        const servicesList = group.getServicesList();
        if( servicesList.length ){
            const serviceMarkupList = this.getServicesMarkupList(servicesList)
            return `<div ${PREFIX}view-group="${group.id}">${this.template.getGroupMarkup(group, serviceMarkupList)}</div>`
        }
        return ``
    }
}

export const View = new ViewClass()