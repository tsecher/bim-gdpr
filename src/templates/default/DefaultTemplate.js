import { ID, PREFIX, CDN } from "easy-gdpr/src/core/tools/Tools";
import { Group } from "easy-gdpr/src/core/groups/Group";
import { html } from "easy-gdpr/src/core/local/LocalManager";
import { Wrapper } from "easy-gdpr/src/core/Wrapper";
import { TemplateAbstract } from "easy-gdpr/src/core/view/TemplateAbstract";

export class DefaultTemplate extends TemplateAbstract{

    constructor(){
        super('default-template')
    }

    getDefaultCssList(){
        return [
            CDN + `src/templates/default/css/default-template.css`
        ]
    }
    /**
     * Return the default list of translation files.
     */
    getDefaultTranslations(){
        return [
            CDN + `src/templates/default/translations/${this.localManager.token}.json`
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
            window.setTimeout(() => {resolve()}, 1000)
        })
    } 

    /**
     * Wrap the content
     * @param {*} content 
     */
    wrapper(content){
        return `
        <style>.${ID}-view{ opacity:0} </style>
        <div class="${ID}-view-wrapper">
            <div class="${ID}-view">
                <button ${PREFIX}view-hide>Close</button>
                <div class="${ID}-view-content">
                    <div class="title">${html('Vos données personnelles')}</div>
                    ${content}
                </div>
            </div>
        </div>`
    }
}