import { Service } from "easy-gdpr/src/core/services/Service";
import { CDN } from "easy-gdpr/src/core/tools/Tools";

export class GTAGService extends Service {

    constructor(guaid, id, name, description){
        super(id || 'gtag', name || 'Google Analytics', description || 'Les services de suivi des utilisateurs par Google')
        this.guaid = guaid
    }

    getDefaultTranslations(){
        return [
            CDN + `src/services/gtag/translations/${this.localManager.token}.json`,
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
