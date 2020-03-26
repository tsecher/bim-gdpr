import { ID, PREFIX, CDN, LANGUAGE_TOKEN } from "{ImportPath}core/tools/Tools";

export class {TemplateClass}{

    constructor(){
        this.id = '{TemplateId}'
    }

    /**
     * Init the template when loaded.
     */
    init(){
        try {
            this.persistentButton()
        } catch (error) {
            document.addEventListener('DOMContentLoaded', () => this.persistentButton())
        }
    }

    /**
     * Add a persistent button
     */
    persistentButton(){
        const button = document.createElement('div')
        button.classList.add( `${ID}-persistent`)
        button.setAttribute(`${PREFIX}view-show`, '')
        button.innerHTML = this.html('Vos données personnelles')
        document.querySelector('body').append(button)
    }

    /**
     * Add the default css list.
     */
    getDefaultCssList(){
        return [
            {CommentCDN}CDN + `src/templates/{TemplateId}/dist/{TemplateId}.css`
        ]
    }
    /**
     * Return the default list of translation files.
     */
    getDefaultTranslations(){
        return [
            {CommentCDN}CDN + `src/templates/{TemplateId}/translations/${LANGUAGE_TOKEN}.json`
        ]
    }

    /**
     * Tempp dom add
     */
    getShowPromise(){
        return new Promise((resolve) => {
            window.setTimeout(() => {resolve()}, 100)
        })
    }

    /**
     * Temp dom remove.
     */
    getHidePromise(){
        return new Promise((resolve) => {
            window.setTimeout(() => {resolve()}, 100)
        })
    } 

    /**
     * Wrap the content
     * @param {*} content 
     */
    wrapper(content){
        return `
        <style>.${ID}-view{ opacity:0} </style>
        <div class="${ID}-view-overlay">
            <div class="${ID}-view-wrapper">
                <div class="${ID}-view">
                    <span class="${ID}-view-hide" ${PREFIX}view-hide>${this.html('Fermer')}</span>
                    <div class="${ID}-view-content">
                        ${content}
                    </div>
                </div>
            </div>
        </div>`
    }

    /**
     * Return the content of the view.
     *
     * @param {string} markup 
     */
    getContent(markup){
        return `
        <div class="${ID}-view-main">
            <div class="title">${this.html('Vos données personnelles')}</div>
            <div class="${ID}-view-head">        
                ${this.html(`Ce site utilise des services pour améliorer votre expérience utilisateur et vous proposer certains contenus externes. 
                Certains de ces services peuvent recquérir et exploiter des données personnelles. 
                Vous pouvez gérer leur activation via ce panneau accessible à tout moment.<br/>Vous pouvez également accéder et gérer en détail l'ensemble des services que le site propose.`)}
            </div>

            <div class="${ID}-view-quick">
                <button ${PREFIX}all-enable="accept_all">
                    ${this.html('Tout accepter')}
                </button>
                <button ${PREFIX}all-disable="deny_all">${this.html('Tout refuser')}</button>
                <button ${PREFIX}view-toggle-detail>${this.html('Voir le détail')}</button>
            </div>
        </div>
        <div class="${ID}-view-detail">
            ${markup}
        </div>`
    }

     /**
     * Return the markup of a single service.
     *
     * @param {*} service 
     */
    getServiceMarkup(service){        
        return `
            <div class="${ID}-view-service line ${( service.isMandatory() ? 'mandatory':'')}" ${PREFIX}service="${service.id}" ${PREFIX}status="${service.status}">
                <div class="line-accept" ${PREFIX}service-toggle="${service.id}">
                    <svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#valid"></use>
                    </svg>
                </div>
                <div class="line-content">
                    <div class="${ID}-view-service-name">${this.html(service.name)}${this.getMandatoryText(service)}</div>
                    <div class="${ID}-view-service-description">${this.html(service.description)}</div>
                </div>
                <div>
                    <button ${PREFIX}service-toggle="${service.id}">
                        <span class="enable">${this.html('Activer')}</span>
                        <span class="disable">${this.html('Désactiver')}</span>
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
            <div class="${ID}-view-group-head line ${( group.isMandatory() ? 'mandatory':'')}" ${PREFIX}group="${group.id}" ${PREFIX}status="${group.status}">
                <div class="line-accept" ${PREFIX}group-toggle="${group.id}">
                    <svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#valid"></use>
                    </svg>
                </div>
                <div class="line-content">
                    <div class="${ID}-view-group-name">${group.name}${this.getMandatoryText(group)}</div>
                    <div class="${ID}-view-group-description">${group.description}</div>
                    <div class="${ID}-view-group-detail">
                        <a class="more" href="Javascript:void();" ${PREFIX}group-toggle-detail="${group.id}">Détail</a>  
                    </div>
                </div>
                <div class="${ID}-view-group-quick question">
                    <button ${PREFIX}group-toggle="${group.id}">
                        <span class="enable">${this.html('Tout activer')}</span>
                        <span class="disable">${this.html('Tout désactiver')}</span>
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
     * Return the mandatory text.
     *
     * @param {*} element 
     */
    getMandatoryText(element){
        return element.isMandatory() ? ` <span class='mandatory-mention'>${this.html(`(nécessaire au fonctionnement du site)`)}</span>` : ''
    }
}

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID]['template_class'] = window[ID]['template_class'] || {};
window[ID]['template_class']['{TemplateClass}'] = {TemplateClass};
