import { CDN, ID, LANGUAGE_TOKEN } from "{ImportPath}core/tools/Tools";

/**
 * class {ServiceClass}
 * 
 * {ServiceDescription}
 */
export class {ServiceClass} {

    constructor(id, name, description){
        this.id = id || '{ServiceId}'
        this.name =  name || "{ServiceName}"
        this.description = description || "{ServiceDescription}"
        this.defaultLanguage = 'fr'
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
            {CommentCDN}CDN + `src/services/{ServiceId}/translations/${LANGUAGE_TOKEN}.json`,
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
        return [/{ServiceId}/]
    }
    
    /**
     * Return the list of related external scripts
     * 
     * @returns {Array}
     */
    getRelatedScripts(){
        return [
            // `https://www.{ServiceId}.com/dist/js`,
        ]
    }

    /**
     * What to do when the service is enabled and is startings.
     */
    start(){
        // @todo
    }
}

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID]['services_class'] = window[ID]['services_class'] || {};
window[ID]['services_class']['{ServiceClass}'] = {ServiceClass};
