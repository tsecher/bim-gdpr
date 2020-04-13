import { CDN, ID, LANGUAGE_TOKEN } from "../../core/tools/Tools";

/**
 * class FacebookPixelService
 * 
 * Facebook tracking system
 */
export class FacebookPixelService {

    /**
     * @param {string} facebookId
     *      The facebookId
     * @param {string} id 
     *      The id of the service
     * @param {string} name 
     *      The name of the service
     * @param {string} description 
     *      The description of the service
     */
    constructor(facebookId, id, name, description){
        this.facebookId = facebookId
        this.id = id || 'facebook_pixel'
        this.name =  name || "Facebook Pixel"
        this.description = description || "Facebook tracking system"
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
            CDN + `src/services/facebook_pixel/translations/${LANGUAGE_TOKEN}.json`,
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
        return [/datr/, /fr/, /reg_ext_ref/, /reg_fb_gate/, /reg_fb_ref/, /sb/, /wd/, /x-src/]
    }
    
    /**
     * Return the list of related external scripts
     * 
     * @returns {Array}
     */
    getRelatedScripts(){
        return [
            'https://connect.facebook.net/en_US/fbevents.js',
        ]
    }

    /**
     * What to do when the service is enabled and is starting.
     */
    start(){
        // Already define.
        if (window.fbq) return

        // Queue events
        let n;
        n=window.fbq=function(){
            n.callMethod? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
        };
        if(!window._fbq)window._fbq=n;
        n.push=n;
        n.loaded=!0;n.version='2.0';
        n.queue=[]


        this.fbq('init', this.facebookId);
        this.fbq('track', 'PageView');
    }

    /**
     * Send facebook events if service is enabled.
     *
     * @param params
     */
    fbq(...params){
        if (!this.isEnabled() && window.fbq ) {
            window.fbq(...params)
        }
    }
}

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID]['services_class'] = window[ID]['services_class'] || {};
window[ID]['services_class']['FacebookPixelService'] = FacebookPixelService;
