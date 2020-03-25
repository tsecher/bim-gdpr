import { ID, PREFIX, CDN } from "../tools/Tools";
import { Group } from "../groups/Group";
import { html } from "../local/LocalManager";
import { LocalizedElementAbstract } from "../local/LocalizedElementAbstract";
import { Wrapper } from "../Wrapper";

export class TemplateAbstract extends LocalizedElementAbstract{

    constructor(id){
        super(id)
        this.css = this.getDefaultCssList();
    }

    /**
     * Init the template.
     */
    initTemplate(){
        super.init()
        this.getCssList().map( css => Wrapper.addCss(css) )
        
    }

    /**
     * Return the list of default css urls.
     */
    getDefaultCssList(){
        return []
    }

    /**
     * Return css urls.
     */
    getCssList(){
        return this.css
    }

    /**
     * Update css urls list.
     *
     * @param {*} css 
     */
    setCssList(css){
        this.css = css
        return this
    }


    /**
     * Wrap the content
     * @param {*} content 
     */
    wrapper(content){
        return `
        <div class="${ID}-view-wrapper">
            <div class="${ID}-view">
                <span class="${ID}-view-hide" ${PREFIX}view-hide>close</span>
                <div class="${ID}-view-content">
                    ${content}
                </div>
            </div>
        </div>`
    }
    
    /**
     * Return the content when no service is declared.
     */
    getNoServiceMarkup(){
        return this.wrapper(`
            <div class="${ID}-view-main">
                <div class="title">${html('Vos données personnelles')}</div>
                <div class="${ID}-view-head">
                    ${html(`Ce site ne déclare pas de services qui pourraient recquérir et exploiter des données personnelles.`)}
                </div>
            </div>`)
    }

    /**
     * Return the wrapper content.
     *
     * @param {string} content 
     */
    getContent(markup){
        return `
        <div class="${ID}-view-main">
            <div class="title">${html('Vos données personnelles')}</div>
            <div class="${ID}-view-head">        
                ${html(`Ce site utilise des services pour améliorer votre expérience utilisateur et vous proposer certains contenus externes. 
                Certains de ces services peuvent recquérir et exploiter des données personnelles. 
                Vous pouvez gérer leur activation via ce panneau accessible à tout moment.<br/>Vous pouvez également accéder et gérer en détail l'ensemble des services que le site propose.`)}
            </div>

            <div class="${ID}-view-quick">
                <button ${PREFIX}all-enable="accept_all">${html('Tout accepter')}</button>
                <button ${PREFIX}all-disable="deny_all">${html('Tout refuser')}</button>
                <button ${PREFIX}view-toggle-detail>${html('Voir le détail')}</button>
            </div>
        </div>
        <div class="${ID}-view-detail">
            ${markup}
        </div>`
    }
    
     /**
     * Returns the markup of the view.
     */
    getViewMarkup(content){
        let markup = ''   

        switch(content.type){
            case 'groups':
                markup = content.groups.join('')
                break
            case 'services':
                markup = content.services.join('')
                break
        }

        return this.wrapper(this.getContent(markup))
    }

    

    /**
     * Return the markup of a single service.
     *
     * @param {*} service 
     */
    getServiceMarkup(service){        
        return `
            <div class="${ID}-view-service line"  ${PREFIX}service="${service.id}" ${PREFIX}status="${service.status}">
                <div>
                    <div class="${ID}-view-service-name">${html(service.name)}</div>
                    <div class="${ID}-view-service-description">${html(service.description)}</div>
                </div>
                <div>
                    <button data-egdpr-service-toggle="${service.id}">
                        <span class="enable">${html('Activer')}</span>
                        <span class="disable">${html('Désactiver')}</span>
                    </button>  
                </div>
            </div>
        `
    }

    /**
     * Return the markup of a group
     *
     * @param {Group} group 
     */
    getGroupMarkup(group, serviceMarkupList){
        return `
        <div class="${ID}-view-group">
            <div class="${ID}-view-group-head line" ${PREFIX}group="${group.id}" ${PREFIX}status="${group.status}">
                <div>
                    <div class="${ID}-view-group-name">${group.name} ${group.isMandatory() ? `<span class='mandatory'>${html(`(nécessaire au fonctionnement du site)`)}</span>` : ''}</div>
                    <div class="${ID}-view-group-description">${group.description}</div>
                    <div class="${ID}-view-group-detail">
                        <a class="more" href="Javascript:void();" data-egdpr-group-toggle-detail="${group.id}">Detail</a>  
                    </div>
                </div>
                <div class="${ID}-view-group-quick question">
                    <button data-egdpr-group-toggle="${group.id}">
                        <span class="enable">${html('Tout activer')}</span>
                        <span class="disable">${html('Tout désactiver')}</span>
                    </button>
                </div>
            </div>

            <div class="${ID}-view-group-services">
                ${serviceMarkupList.join('')}
            </div>
        </div>
        `
    }

    /**
     * Element to translate.
     *
     * @param {string} id 
     * @param {*} data 
     */
    html(id, data){
        return html(id, data)
    }

    /**
     * Return the pseudo group text.
     */
    getUngroupedTitle(){
        return html('Autre')
    }

    /**
     * Tempp dom add
     */
    getShowPromise(){
    }

    /**
     * Temp dom remove.
     */
    getHidePromise(){
    }
}