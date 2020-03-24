// import { Service } from "easy-gdpr/src/core/services/Service";
import { CDN, ID, LANGUAGE_TOKEN } from "easy-gdpr/src/core/tools/Tools";

export class GTAGService {

    constructor(guaid, id, name, description){

        // Init
        this.id = id || 'gtag'
        this.name =  name || 'Google Analytics'
        this.description = description || 'Les services de suivi des utilisateurs par Google'

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
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', this.guaid);
    }
}

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID]['services'] = window[ID]['services'] || {};
window[ID]['services']['GTAGService'] = GTAGService;
