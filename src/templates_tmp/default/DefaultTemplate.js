import { ID, PREFIX, CDN } from "easy-gdpr/src/core/tools/Tools";
import { Group } from "easy-gdpr/src/core/groups/Group";
import { html } from "easy-gdpr/src/core/local/LocalManager";
import { LocalizedElementAbstract } from "easy-gdpr/src/core/local/LocalizedElementAbstract";

export class DefaultTemplate extends LocalizedElementAbstract{

    /**
     * Return the default list of translation files.
     */
    getDefaultTransitionFileList(){
        return [CDN + `templates/default/translations/${this.localManager.token}.po`]
    }

    /**
     * Return the content when no service is declared.
     */
    getNoServiceMarkup(){
        return `
            <div class="${ID}-view-wrapper">
                <div class="${ID}-view">
                    <div class="${ID}-view-head">
                        <div class="title">${html('Vos données personnelles')}</div>
                        <div class="intro">${html(`Nous utilisons des cookies sur ce site pour améliorer votre expérience utilisateur. Certains de ces services.`)}</div>
                    </div>
                    <div class="${ID}-view-content">
                        <div class="${ID}-view-quick">
                            <button ${PREFIX}view-hide>Close</button>
                        </div>
                    </div>
                </div>
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

        return `
            <div class="${ID}-view-wrapper">
                <div class="${ID}-view">
                    <button ${PREFIX}view-hide>Close</button>
                    <div class="${ID}-view-content">
                        <div class="${ID}-view-main">
                            <div class="${ID}-view-head">
                                <div class="title">${html('Vos données personnelles')}</div>
                                <div class="intro">${html(`Ce site utilise des services pour améliorer votre expérience utilisateur et vous proposer certains contenus externes. 
                                Certains de ces services peuvent recquérir et exploiter des données personnelles. 
                                Vous pouvez gérer leur activation via ce panneau accessible à tout moment.<br/>Vous pouvez également accéder et gérer en détail l'ensemble des services que le site propose`)}</div>
                            </div>

                            <div class="${ID}-view-quick">
                                <button ${PREFIX}all-enable="accept_all">${html('Tout accépter')}</button>
                                <button ${PREFIX}all-disable="deny_all">${html('Tout refuser')}</button>
                                <button ${PREFIX}view-toggle-detail>${html('Voir le détail')}</button>
                            </div>
                        </div>
                        <div class="${ID}-view-detail">
                            ${markup}
                        </div>
                    </div>
                </div>
            </div>`
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
                    <div class="service-name">${html(service.name)}</div>
                    <div class="service-description">${html(service.description)}</div>
                    <div>Is Mandatory : ${service.isMandatory()}</div>
                </div>
                <div>
                    <button data-egdpr-service-toggle="${service.id}">${html('Toggle')}</button>  
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
                    <div class="${ID}-view-group-title">${group.name}</div>
                    <div class="${ID}-view-group-description">${group.description}</div>
                    <div>Is Mandatory : ${group.isMandatory()}</div>
                    <div class="${ID}-view-group-detail">
                        <a href="Javascript:void();" data-egdpr-group-toggle-detail="${group.id}">Detail</a>  
                    </div>
                </div>
                <div class="${ID}-view-group-quick question">
                    <button data-egdpr-group-toggle="${group.id}">Toggle all</button>
                </div>
            </div>

            <div class="${ID}-view-group-services">
                ${serviceMarkupList.join('')}
            </div>
        </div>
        `
    }

    /**
     * Temp dom remove.
     */
    getClosePromise(){
        return new Promise((resolve) => {
            window.setTimeout(() => {resolve()}, 1000)
        })
    }
}