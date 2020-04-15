import { CDN, ID, LANGUAGE_TOKEN } from "../../core/tools/Tools";
const MatomoTracker = require('matomo-tracker');


/**
 * class MatomoService
 * 
 * Matomo tracking service
 */
export class MatomoService {
    
    /**
     * @param {string} matomoUrl 
     *      The url of the matomo service. Do not add '/matomo.php'
     * @param {string} id 
     *      The id of the service
     * @param {string} name 
     *      The name of the service
     * @param {string} description 
     *      The description of the service
     */
    constructor(matomoUrl, siteId, serviceId, name, description){
        this.matomoUrl = matomoUrl + '/matomo.php'
        this.siteId = siteId || 1
        this.id = serviceId || 'matomo'
        this.name =  name || "Matomo"
        this.description = description || "Matomo tracking service."
        this.doc = ""
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
            CDN + `src/services/matomo/translations/${LANGUAGE_TOKEN}.json`,
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
        return [/_pk_/]
    }
    
    /**
     * Return the list of related external scripts
     * 
     * @returns {Array}
     */
    getRelatedScripts(){
        return [
            // `https://www.matomo.com/dist/js`,
        ]
    }

    /**
     * What to do when the service is enabled and is starting.
     */
    start(){
        // Initialize with your site ID and Matomo URL
        this.matomoTracker = new MatomoTracker(this.siteId, this.matomoUrl);
        // Optional: Respond to tracking errors
        this.matomoTracker.on('error', (err) => {
            console.warn('error tracking request: ', err);
        });
        // Track url.
        this.track(window.location.href)
    }

    /**
     * Remove matomo tracking tool.
     */
    stop(){
        this.matomoTracker = null
    }

    /**
     * Track
     */
    track(data){
        if(this.matomoTracker){
            this.matomoTracker.track(data);
        }
    }

    /**
     * shortcut to track events.
     *
     * @param category
     * @param action
     * @param name
     * @param value
     */
    trackEvent(category, action, name, value) {
        this.track(
            {
                ...this._getDefaultData(),
                ...{
                    e_c: category,
                    e_a: action,
                    e_n: name,
                    e_v: value
                }
            })
    }

    /**
     * Return default data for events.
     * @returns {{idsite: (*|number), rec: number, url: string}}
     * @private
     */
    _getDefaultData() {
        return {
            idsite: this.siteId,
            rec: 1,
            url: window.location.href,
        }
    }
}

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID]['services_class'] = window[ID]['services_class'] || {};
window[ID]['services_class']['MatomoService'] = MatomoService;
