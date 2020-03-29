import { ID, PREFIX, CDN, LANGUAGE_TOKEN } from "{ImportPath}core/tools/Tools";

/**
 * Class for the {TemplateId} template.
 */
export class {TemplateClass}{

    constructor(){
        this.id = '{TemplateId}'
        // Indicates the default language of the template.
        this.defaultLanguage = 'en'
    }

    /**
     * Init the template when loaded.
     * 
     * @returns {{TemplateClass}}
     */
    init(){
        try {
            this.initPersistentButton()
        } catch (error) {
            document.addEventListener('DOMContentLoaded', () => this.initPersistentButton())
        }

        return this
    }

    /**
     * Add a persistent button
     * 
     * @returns {{TemplateClass}}
     */
    initPersistentButton(){
        const button = document.createElement('div')
        button.classList.add( `${ID}-persistent`)
        button.setAttribute(`${PREFIX}view-show`, '')
        button.innerHTML = this.html('Your personal data')
        document.querySelector('body').append(button)

        return this
    }

    /**
     * Return the default css list.
     * 
     * Must return a list of css files that will be loaded on initTemplate
     * 
     * @returns {Array}.
     */
    getDefaultCssList(){
        return [
            {CommentCDN}CDN + `src/templates/{TemplateId}/dist/{TemplateId}.css`
        ]
    }
    
    /**
     * Return the default list of translation files.
     * 
     * Must return a list of translations files url. Each url should contain a ${LANGUAGE_TOKEN} char, that 
     * will be replaced by the user language. For instance, a french user will load the file
     *  'CDN + `src/templates/{TemplateId}/translations/fr-FR.json`'
     * 
     * @returns {Array}.
     */
    getDefaultTranslations(){
        return [
            {CommentCDN}CDN + `src/templates/{TemplateId}/translations/${LANGUAGE_TOKEN}.json`
        ]
    }

    /**
     * Return a promise that allow you to differ the view visibility.
     * 
     * When the ViewManager.show() function is called:
     *  - first, the template is added in dom.
     *  - second, the `${ID}-on` class is added to the body.
     * 
     * Return a promise that resolves after a particular time allows you to defer these
     * two steps, and easily add css transitions.
     *
     * @returns {Promise}
     */
    getShowPromise(){
        return new Promise((resolve) => {
            window.setTimeout(() => {resolve()}, 100)
        })
    }

     /**
     * Return a promise that allow you to differ the view invisibility.
     * 
     * When the ViewManager.hide() function is called:
     *  - first, the `${ID}-on` class is removed from the body.
     *  - second, the view is removed from the dom.
     * 
     * Return a promise that resolves after a particular time allows you to defer these
     * two steps, and easily add css transitions.
     * 
     * @returns {Promise}
     */
    getHidePromise(){
        return new Promise((resolve) => {
            window.setTimeout(() => {resolve()}, 100)
        })
    }

    /**
     * Wrap the content of the view.
     *
     * @param {string} content 
     * 
     * @return {string}
     */
    wrapper(content){
        return `
        <div class="${ID}-view-wrapper">
            <div class="${ID}-view">
                <span class="${ID}-view-hide" ${PREFIX}view-hide>${this.html('Close')}</span>
                <div class="${ID}-view-content">
                    ${content}
                </div>
            </div>
        </div>`
    }

    /**
     * Return the content when no service is declared.
     * 
     * @returns {string}
     */
    getNoServiceMarkup(){
        const content = `
            <div class="${ID}-view-main">
                <div class="title">${this.html('Your personal data')}</div>
                <div class="${ID}-view-head">
                    ${this.html(`his site does not declare any service that could use your personal data`)}
                </div>
            </div>`

        return this.wrapper(content)
    }

    /**
     * Return the content when services are declared.
     *
     * @param {*} contentData
     *      The list of elements that has been populated from getServiceMarkup and/or getGroupMarkup.
     * 
     * @returns {string}
     */
    getViewMarkup(contentData){
        let markup = ''   

        // Handle different case of render, in case of group or not.
        switch(contentData.type){
            case 'groups':
                markup = contentData.groups.join('')
                break
            case 'services':
                markup = contentData.services.join('')
                break
        }

        // Create the whole content of the view.
        const content = `
            <div class="${ID}-view-main">
                <div class="${ID}-view-head">        
                    ${this.html(`This site uses some services that enhance your user experience or add some external content. Some of these can require and use personal data. You can manage their activation through this pannel at any moment.<br/>You can also manage theme by clicking on \"Detail\".`)}
                </div>

                <div class="${ID}-view-quick">
                    <button ${PREFIX}all-enable="accept_all">${this.html('Enable all')}</button>
                    <button ${PREFIX}all-disable="deny_all">${this.html('Disable all')}</button>
                    <button ${PREFIX}view-toggle-detail>${this.html('Detail')}</button>
                </div>
            </div>
            <div class="${ID}-view-detail">
                ${markup}
            </div>`

        return this.wrapper(content)
    }

    /**
     * Return the markup of a single group
     *
     * @param {Group} group
     *      The group to render.
     * @param {Array} serviceMarkupList
     *      The list of markups of the group's service 
     */
    getGroupMarkup(group, serviceMarkupList){
        return `
            <div class="${ID}-view-group">
                <div class="${ID}-view-group-head line" ${PREFIX}group="${group.id}" ${PREFIX}status="${group.status}">
                    <div>
                        <div class="${ID}-view-group-name">${group.name} ${group.isMandatory() ? `<span class='mandatory'>${this.html(`(mandatory for the basic features)`)}</span>` : ''}</div>
                        <div class="${ID}-view-group-description">${group.description}</div>
                        <div class="${ID}-view-group-detail">
                            <a class="more" href="Javascript:void(0);" data-egdpr-group-toggle-detail="${group.id}">${this.html('Detail')}</a>  
                        </div>
                    </div>
                    <div class="${ID}-view-group-quick question">
                        <button data-egdpr-group-toggle="${group.id}">
                            <span class="enable">${this.html('Enable all')}</span>
                            <span class="disable">${this.html('Disable all')}</span>
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
     * Return the markup of a single service.
     *
     * @param {Service} service 
     */
    getServiceMarkup(service){        
        return `
            <div class="${ID}-view-service line"  ${PREFIX}service="${service.id}" ${PREFIX}status="${service.status}">
                <div>
                    <div class="${ID}-view-service-name">${this.html(service.name)}${service.isMandatory() ? `<span class='mandatory'>${this.html(`(mandatory for the basic features)`)}</span>` : ''}</div>
                    <div class="${ID}-view-service-description">${this.html(service.description)}</div>
                </div>
                <div>
                    <button data-egdpr-service-toggle="${service.id}">
                        <span class="enable">${this.html('Enable')}</span>
                        <span class="disable">${this.html('Disable')}</span>
                    </button>  
                </div>
            </div>
        `
    }
}

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID]['template_class'] = window[ID]['template_class'] || {};
window[ID]['template_class']['{TemplateClass}'] = {TemplateClass};
