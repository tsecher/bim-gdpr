import { CDN, ID, LANGUAGE_TOKEN } from "../../core/tools/Tools";

/**
 * class GoogleTagManagerService
 * 
 * Google Tag tracking service
 */
export class GoogleTagManagerService {

    /**
     * @param {string} gtmId
     *      The GTM Id.
     * @param {string} id 
     *      The id of the service
     * @param {string} name 
     *      The name of the service
     * @param {string} description 
     *      The description of the service
     */
    constructor(gtmId, id, name, description){
        this.gtmId = gtmId
        this.id = id || 'googletagmanager'
        this.name =  name || "Google Tag Manager"
        this.description = description || "Google Tag tracking service."
        this.doc = "https://tagmanager.google.com"
        this.defaultLanguage = 'en'
    }

    /**
     * Return the default list of translation files.
     * 
     * Must return a list of translations files url. Each url should contain a ${LANGUAGE_TOKEN} char, that 
     * will be replaced by the user language. For instance, a french user will load the file
     *  'CDN + `src/templates/{TemplateId}/translations/fr-FR.json`'
     * 
     * @returns {Array}
     */
    getDefaultTranslations(){
        return [
            CDN + `src/services/googletagmanager/translations/${LANGUAGE_TOKEN}.json`,
        ]
    }

    /**
     * Return the list of pattern that match the possible service cookie name.
     * 
     * All the cookies which name matches any of these pattern will be removed, when
     * service is disabled.
     * 
     * @returns {Array}
     */
    getCookiePatterns(){
        return [
            /_ga/, /_gat/, /__utma/, /__utmb/, /__utmc/, /__utmt/, /__utmz/, /__gads/, /_drt_/, /FLC/, /exchange_uid/, /id/, /fc/, /rrs/, /rds/, /rv/, /uid/, /UIDR/, /UID/, /clid/, /ipinfo/, /acs/
        ]
    }
    
    /**
     * Return the list of related external scripts
     * 
     * @returns {Array}
     */
    getRelatedScripts(){
        return [
            `//www.googletagmanager.com/gtm.js?id=${this.gtmId}`,
        ]
    }

    /**
     * What to do when the service is enabled and is starting.
     */
    start(){
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start':new Date().getTime(),
            event:'gtm.js'
        });
    }

    /**
     * Send push dataLayer if enabled
     */
    push(data){
        if( this.isEnabled() ){
            window.dataLayer.push(data)
        }
    }
}

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID]['services_class'] = window[ID]['services_class'] || {};
window[ID]['services_class']['GoogleTagManagerService'] = GoogleTagManagerService;
