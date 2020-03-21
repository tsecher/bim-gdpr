import Gettext from 'node-gettext'
import {PREFIX, ID} from 'easy-gdpr/src/class/Tools/Tools'
import { po } from 'gettext-parser'

class LocalManagerClass{

    constructor(){
        this.tryRegionalisation = false
        this.gt = new Gettext()
        this.languageBaseUrl = `/translations/${ID}.@.po` 
        this.alreadyLoaded = []
    }   
    
    /**
     * Init the localizer.
     */
    init(){
        const userLanguage = this.getUserLanguage()
        if( 
            ( this.tryRegionalisation && this.defaultLanguage !== userLanguage)
            || (!this.tryRegionalisation && this.defaultLanguage.split('-')[0] !== userLanguage.split('-')[0])
             ){
            this.loadUserLanguageData()
        }
    }

    /**
     * Default language.
     */
    setDefaultLanguage(defaultLanguage){
        this.defaultLanguage = defaultLanguage
    }

    /**
     * Try full language file 'fr-FR' instead of 'fr'
     */
    allowTryRegionalisation(){
        this.tryRegionalisation = true
        return this
    }

    /**
     * Set the translations path.
     * 
     * @param {string} path 
     */
    setLanguagePath(path = '/translations/@.po'){
        this.languageBaseUrl = path
    }

    /**
     * Return the user language.
     */
    getUserLanguage(){
        if( !this.userLanguage ){
            this.userLanguage = navigator.language || navigator.browserLanguage ||
                    navigator.systemLanguage || navigator.userLang || null;
        }
        return this.userLanguage
    }

    /**
     * Adds a transaltion file
     *
     * @param {*} path 
     */
    addTranslation(path){
        // Check if path can replace @ by the language id.
        if(path.indexOf('@') > -1 ){
            this.loadPOFile(path)
            return this
        }
        throw 'The translation path does not have a "@" to replace'        
    }

    /**
     * Load the user language.
     */
    loadUserLanguageData(isTryinRegionalisation=false){
        // Load translations.
        this.addTranslation(this.languageBaseUrl)
    }

    /**
     * Load the PO File.
     */
    loadPOFile(_path){

        let userLanguage = this.getUserLanguage()
        userLanguage = this.tryRegionalisation ? userLanguage : userLanguage.split('-')[0]
        const path = _path.split('@').join(userLanguage)

        if( this.alreadyLoaded.indexOf(path) > -1){
            return
        }

        const translation = this.getStoredTranslationByPath(path)
        if(translation){
            this._doAddTranslation(path, translation)
        }
        else{
            this._doLoadPOFile(path, userLanguage)
        }
    }

    /**
     * Load PO file.
     *
     * @param {string} path 
     */
    _doLoadPOFile(path, language){
        const success = (data) => {
            // If the file is a po file, then load the translation.
            if( data.path.indexOf('.po') > -1 ){
                this.loadPOContent(data)
            }
        }
        const error  = (data)=> {
            console.error(`Cannot load translation file ${data.path}`)
        }

        this.loadTranslationFile(path, language)
                .then(success)
                .catch((data)=>{
                    // On test en mode pas de regionalisation.
                    if( data.language.indexOf('-') > -1 && this.tryRegionalisation ){
                        this.loadPOFile(path)
                    }
                    else{
                        error(data)
                    }
                })
    }

    /**
     * Add the po to storage.
     */
    loadPOContent(data){
        try {
            const parsedTranslations = po.parse(data.result) 
            this.storeLanguage(data.path, parsedTranslations)
            this._doAddTranslation(data.path, parsedTranslations)
        } catch (error) {
            console.error( `PO translation file is not correct (${data.path})` )
        }
    }

    /**
     * Enable a translation from po.
     * @param {string} translation 
     */
    _doAddTranslation(path, translation){
        this.gt.addTranslations(this.getUserLanguage(), 'messages', translation)
        this.gt.setLocale(this.getUserLanguage())
        this.alreadyLoaded.push(path)
        this.onLoadString()
    }

    /**
     * Store language.
     *
     * @param {string} path 
     * @param {*} translation 
     */
    storeLanguage(path, translation){
        const storedLanguages = this.getStoredLanguages()
        if( storedLanguages ){
            storedLanguages[path] = translation
            localStorage.setItem(ID+'l', JSON.stringify(storedLanguages))
        }
    }

    /**
     * Return the local stored language.
     */
    getStoredLanguages(){
        if( typeof(localStorage) !== undefined ){
            let stored = {}
            try {
                stored = JSON.parse(localStorage.getItem(ID+'l'))
            } catch (error) {
                
            }
            return stored || {}
        }
        return null
    }

    /**
     * Return the local stored translatin.
     *
     * @param {string} path 
     */
    getStoredTranslationByPath(path){
        const storedLanguages = this.getStoredLanguages()
        if( storedLanguages ){
            return storedLanguages[path]
        }
        return false
    }

    /**
     * Load a po file.
     */
    loadTranslationFile(path, language){
        return new Promise ((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            alert('xhr '+ path)
            const data = {
                path: path,
                language: language,
            }

            xhr.onload = () => {
                if( xhr.status >= 200 && xhr.status < 300 ){
                    data.result = xhr.response
                    resolve(data)
                }
                else{
                    reject(data)
                }                
            };
            
            xhr.onerror = () => {
                reject(data)
            };
            xhr.open('get', data.path) 
            xhr.send()           
        })
    }

    /**
     * When a translation is loaded.
     */
    onLoadString(){
        document.querySelectorAll(`[${PREFIX}l]`).forEach(
            element => {
                let replaceData = null
                try {
                    replaceData = JSON.parse( decodeURIComponent(element.getAttribute(PREFIX+'l-data')) )
                } catch (error) {
                    replaceData = null
                }
                element.innerHTML = this.translate(element.getAttribute(PREFIX+'l'), replaceData)
            }
        )
    }

    /**
     * Return a translated string with dynamic data.
     * 
     * @param {string} id 
     * @param {Obj} replaceData 
     */
    translate(id, replaceData){
        // Result
        let result = this.gt.gettext(id)

        // Replace
        if (replaceData){
            Object.keys(replaceData).map( key => {
                result = result.split(key).join(replaceData[key])
            })
        }
        return result
    }

    /**
     * Wrap a translated text with span in order to replace it dynamically
     *
     * @param {*} id 
     */
    html(id, replaceData){
        const result = `<span ${PREFIX}l="${id}" ${PREFIX}l-data="${encodeURIComponent(JSON.stringify(replaceData))}">${this.translate(id, replaceData)}</span>`
        return result
    }
}

export const LocalManager = new LocalManagerClass()
export const l = function(id, replaceData){
    return LocalManager.translate(id, replaceData)
}
export const html = function(id, replaceData){
    return LocalManager.html(id, replaceData)
}
    
