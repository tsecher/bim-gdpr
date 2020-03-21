import { LocalManager } from "easy-gdpr/src/core/local/LocalManager";

export class LocalizedElementAbstract{

    constructor(){
        this.localManager = LocalManager
        this.defaultLanguage = 'fr'
        this.translationFileList = this.getDefaultTransitionFileList()
    }

    init(){
        this.getTranslationFileList().map( path => this.addTranslation(path))
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
    getDefaultTransitionFileList(){
        return []
    }

    /**
     * Return the translation file list
     */
    getTranslationFileList(){
        return this.translationFileList
    }
    
    /**
     * Set the translation file list
     */
    setTranslationFileList(fileList){
        return this.translationFileList = fileList
    }

    /**
     * Add a translation if user language is different of the default language
     */
    addTranslation(path){
        if( this.localManager.hasToLoadTranslation(this.getDefaultLanguage()) ){
            this.localManager.addTranslation(path)
        }
    }
}