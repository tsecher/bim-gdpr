import { LocalManager } from "./LocalManager";

export class LocalizedElementAbstract{

    constructor(id){
        this.id = id
        this.localManager = LocalManager
        this.defaultLanguage = 'en'
        this.translations = this.getDefaultTranslations()
    }


    /**
     * Load transaltions.
     */
    init(){
        this.getTranslations().map( (data, key) => {
            let id = `${this.id}-${key}`
            if( typeof(data) === 'string'){
                if(this.localManager.hasToLoadTranslation(this.getDefaultLanguage()) ){
                    this.localManager.addTranslation(id, data)
                }
            }
            else{
                this.localManager.addTranslation(id, data)
            }
        })
        return this
    }

    /**
     * Set the default language.
     *
     * @param {string} language 
     */
    setDefaultLanguage(language){
        this.defaultLanguage = language
        return this
    }

    /**
     * Return the default language of the item.
     */
    getDefaultLanguage(){
        return this.defaultLanguage
    }

    /**
     * Return the default translation file list.
     */
    getDefaultTranslations(){
        return []
    }

    /**
     * Return the translation file list
     */
    getTranslations(){
        return this.translations
    }
    
    /**
     * Set the translation file list
     */
    setTranslations(fileList){
        this.translations = fileList
        return this
    }

    /**
     * Add a translation if user language is different of the default language
     * 
     * @param {*} data 
     *   po file path or json data
     */
    addTranslation(data){
        this.translations.push(data)
        return this
    }
}