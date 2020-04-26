import { CDN, ID, LANGUAGE_TOKEN } from "../../core/tools/Tools";

/**
 * class GoogleAnalyticsService
 * 
 * Google Analytics Service
 */
export class GoogleAnalyticsService {

    /**
     * @param {string} guaid
     *      The google analytics id
     * @param {string} id 
     *      The id of the service
     * @param {string} name 
     *      The name of the service
     * @param {string} description 
     *      The description of the service
     */
    constructor(guaid, id, name, description){
        this.guaid = guaid
        this.id = id || 'google_analytics'
        this.name =  name || "Google Analytics"
        this.description = description || "Google Analytics Service"
        this.doc = "https://developers.google.com/analytics"
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
            CDN + `src/services/google_analytics/translations/${LANGUAGE_TOKEN}.json`,
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
        return [/google_analytics/]
    }
    
    /**
     * Return the list of related external scripts
     * 
     * @returns {Array}
     */
    getRelatedScripts(){
        return [
            'https://www.google-analytics.com/analytics.js'
        ]
    }

    /**
     * What to do when the service is enabled and is starting.
     */
    start(){

        window['GoogleAnalyticsObject']='ga';
        window['ga']=window['ga']||function(){
            (window['ga'].q=window['ga'].q||[]).push(arguments)
        }
        window['ga'].l=1*new Date();
        this.ga = window['ga']


        this.push('create', this.guaid, 'auto');
        this.push('send', 'pageview');
    }

    /**
     * push data.
     *
     * @param ...data
     */
    push(...data){
        if( this.isEnabled() ){
            this.ga(...data)
        }
    }
}

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID]['services_class'] = window[ID]['services_class'] || {};
window[ID]['services_class']['GoogleAnalyticsService'] = GoogleAnalyticsService;
