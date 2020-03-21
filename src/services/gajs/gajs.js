import { Service } from "easy-gdpr/src/core/services/Service";

export class GTMService extends Service {

    constructor(guaid, id, name, description){
        super(id || 'gajs', name || 'Google Analytics', description || 'Les services de suivi des utilisateurs par Google')
        this.guaid = guaid
    }

    getTranslationFileList(){
        return [CDN + `services/gajs/${this.localManager.token}.po`]
    }

    getCookiePatterns(){
        return [/_gid/ ,/_ga/, /_gat/, /__utma/, /__utmb/, /__utmc/, /__utmt/, /__utmz/]
    }
    
    start(){
        // Wrapper.addScript(`https://www.googletagmanager.com/gtag/js?id=${this.guaid}`)

        // GA script
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', this.guaid);
    }
}
