import { CDN, ID, LANGUAGE_TOKEN } from "../../core/tools/Tools";


export class GTAGService {

    constructor(guaid, id, name, description){
        // Init
        this.id = id || 'gtag'
        this.name =  name || 'Google Analytics'
        this.description = description || 'Google user tracking services'
        this.doc = "https://marketingplatform.google.com/intl/fr/about/analytics/"

        this.guaid = guaid
    }

    getDefaultTranslations(){
        return [
            CDN + `src/services/gtag/translations/${LANGUAGE_TOKEN}.json`,
        ]
    }

    getCookiePatterns(){
        return [/_gid/ ,/_ga/, /_gat/, /__utma/, /__utmb/, /__utmc/, /__utmt/, /__utmz/]
    }
    
    getRelatedScripts(){
        return [
            `https://www.googletagmanager.com/gtag/js?id=${this.guaid}`,
        ]
    }

    start(){
        // GA script
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){window.dataLayer.push(arguments);}
        this._gtag = window.gtag;
        this.gtag('js', new Date());
        this.gtag('config', this.guaid);
    }

    gtag(...data){
        if( this.isEnabled() ){
            this._gtag(...data)
        }
    }
}

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID]['services_class'] = window[ID]['services_class'] || {};
window[ID]['services_class']['GTAGService'] = GTAGService;
