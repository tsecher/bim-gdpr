import { CDN, ID, LANGUAGE_TOKEN } from "../../core/tools/Tools";

/**
 * class YoutubeEmbedService
 * 
 * Allow you to access the Youtube Embed videos
 */
export class YoutubeEmbedService {

    /**
     * @param {string} id 
     *      The id of the service
     * @param {string} name 
     *      The name of the service
     * @param {string} description 
     *      The description of the service
     */
    constructor(id, name, description){
        this.id = id || 'youtube_embed'
        this.name =  name || "YoutubeEmbed"
        this.description = description || "Allow you to access the Youtube Embed videos"
        this.doc = "https://developers.google.com/youtube/iframe_api_reference"
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
            CDN + `src/services/youtube_embed/translations/${LANGUAGE_TOKEN}.json`,
        ]
    }

    /**
     * What to do when the service is enabled and is starting.
     */
    start(){
        // Nothing to do, deals with noscript and data-egpdr-visible-if-enabled attribues.
        // See the README.md
    }
}

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID]['services_class'] = window[ID]['services_class'] || {};
window[ID]['services_class']['YoutubeEmbedService'] = YoutubeEmbedService;
