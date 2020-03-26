import { Wrapper } from "../Wrapper";
import { ViewEvents } from "../view/ViewEvents";
import { Group } from "../groups/Group";
import { ServiceEvents } from "../services/ServiceEvents";
import { Service } from '../services/Service';
import { GroupEvents } from "../groups/GroupEvents";
import { PREFIX, checkInterface } from "../tools/Tools";
import { Default } from "../../templates/default/Default";
import { TemplateAbstract } from "./TemplateAbstract";


export const TemplateInterface = {
    init: function(){},
}

class ViewClass{

    constructor(){
        this.timeoutValue = 200
        this.rebuildTimeout = null
        this.template = this.overrideTemplate(new Default())
        this.template.force = true
        this.needsRebuild('all')
    }

    init(){
        // init template.
        this.setTemplate(this.template)

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
     * @param {*} templateData
     */
    setTemplate(templateData){
        let template = templateData
        if( !this.isTemplate(templateData) ){
            template = this.overrideTemplate(templateData, Wrapper.logsAreEnabled())
            if( !template ){
                if( Wrapper.logsAreEnabled() ){
                    console.error('Bad template')
                }
                return this
            }
        }

        if( this.template != template || template.force){
            // Init template.
            this.template = template
            this.template.initTemplate()
            this.template.init()
            Wrapper.trigger(ViewEvents.needsRebuild, {type:'all'})
        }

        
        
        return this
    }

    /**
     * Return a template from obj that match Template Interface
     * @param {*} templateData
     */
    overrideTemplate(templateData, logs=false){
        let template = null
        if( checkInterface( TemplateInterface, templateData, logs) ){
            template = new TemplateAbstract()
            // Pseudo extension from object.
            for( let i in templateData){
                template[i] = templateData[i]
            }

            // Proto
            if(  Object.getOwnPropertyNames(Object.getPrototypeOf(templateData)).indexOf('init') > -1 ){
                Object.getOwnPropertyNames(Object.getPrototypeOf(templateData)).map(
                    propertyName => {
                        template[propertyName] = templateData[propertyName]
                    }
                )

                

                if( 'function' === typeof(templateData.getDefaultTranslations) ){
                    template.setTranslations( templateData.getDefaultTranslations() )
                }
                if( 'function' === typeof(templateData.getDefaultCssList) ){
                    template.setCssList( templateData.getDefaultCssList() )
                }
            }            
        }
        
        return template
    }

    /**
     * Check if data is an eligible tempalte
     * @param {*} templateData 
     */
    isTemplate(templateData){
        return templateData instanceof TemplateAbstract
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
        const groupManager = Wrapper.getGroupManager()
        const serviceManager = Wrapper.getServiceManager()
        const groups = groupManager.getGroupsList();
        if(groups.length){
            data.type = 'group'
            data.data = {}
            data.data.groups = groups
            data.data.ungrouped_services = groupManager.getUnGroupedServices()
            if( data.data.ungrouped_services.length !== serviceManager.getServicesList().length ){
                return data;
            }
        }
        
        // If no groups or no service in group :
        data.type = 'services'
        data.data = {}
        data.data.services = Wrapper.getServiceManager().getServicesList()

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
        const pseudoGroup = Wrapper.createGroup('default', this.template.getUngroupedTitle(), '')
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