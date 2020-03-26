import { CDN, ID, LANGUAGE_TOKEN } from "{ImportPath}core/tools/Tools";

/**
 * class {ServiceClass}
 * 
 * {ServiceDescription}
 */
export class {ServiceClass} {

    constructor(id, name, description){
        // Init
        this.id = id || '{ServiceId}'
        this.name =  name || "{ServiceName}"
        this.description = description || "{ServiceDescription}"
    }

    /**
     * Return the list of translation files. 
     * 
     * Each path should contain the {LANGUAGE_TOKEN} that will be replaced
     * by the user language.
     * Please, try to use CDN.
     */
    getDefaultTranslations(){
        return [
            {CommentCDN}CDN + `src/services/{ServiceId}/translations/${LANGUAGE_TOKEN}.json`,
        ]
    }

    /**
     * Return the list of pattern that match the possible service cookie name.
     */
    getCookiePatterns(){
        return [/{ServiceId}/]
    }
    
    /**
     * Return the list of related external scripts
     */
    getRelatedScripts(){
        return [
            // `https://www.{ServiceId}.com/dist/js`,
        ]
    }

    /**
     * What to do when the service is enabled and starts up.
     */
    start(){
        // @todo
    }
}

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID]['services_class'] = window[ID]['services_class'] || {};
window[ID]['services_class']['{ServiceClass}'] = {ServiceClass};
