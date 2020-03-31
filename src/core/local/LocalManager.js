import {PREFIX, ID, LANGUAGE_TOKEN} from '../tools/Tools'

class LocalManagerClass{

    constructor(){
        this.enableCache = true
        this.tryRegionalisation = false
        const userLanguage = this.getUserLanguage()
        this.translations = {}
        this.translations[userLanguage] = {}
        this.alreadyLoaded = []
    }   
    
    /**
     * Init the localizer.
     */
    init(){
    }

    /**
     * Return true if defaultLanguage passed is different of the user language.
     * @param {*} defaultLanguage 
     */
    hasToLoadTranslation(defaultLanguage){
        const userLanguage = this.getUserLanguage()
        return ( this.tryRegionalisation && defaultLanguage !== userLanguage)
                 || (!this.tryRegionalisation && defaultLanguage.split('-')[0] !== userLanguage.split('-')[0])
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
     * @param {*} data 
     */
    addTranslation(id, data){
        if( typeof(data) === 'string' ){
            // Check if path can replace {LANGUAGE_TOKEN} by the language id.
            if(data.indexOf(LANGUAGE_TOKEN) > -1 ){
                this.loadFile(data)
                return this
            }
            throw `The translation path does not have a "${LANGUAGE_TOKEN}" to replace`
        }
        else{            
            this._doAddTranslation(id, data, true)
        }
    }

    /**
     * Load the user language.
     */
    loadUserLanguageData(isTryinRegionalisation=false){
        // Load translations.
        this.addTranslation(this.languageBaseUrl)
    }

    /**
     * Load the File.
     */
    loadFile(_path){
        let userLanguage = this.getUserLanguage()
        userLanguage = this.tryRegionalisation ? userLanguage : userLanguage.split('-')[0]
        const path = _path.split(LANGUAGE_TOKEN).join(userLanguage)

        if( this.alreadyLoaded.indexOf(path) > -1){
            return
        }

        const translation = this.getStoredTranslationByPath(path)
        if(translation){
            this._doAddTranslation(path, translation)
        }
        else{
            this._doLoadFile(path, userLanguage)
        }
    }

    /**
     * Load file.
     *
     * @param {string} path 
     */
    _doLoadFile(path, language){
        const success = (data) => {
            this.loadFileContent(data)
        }
        const error  = (data)=> {
            console.error(`Cannot load translation file ${data.path}`)
        }

        this.loadTranslationFile(path, language)
                .then(success)
                .catch((data)=>{
                    // On test en mode pas de regionalisation.
                    if( data.language.indexOf('-') > -1 && this.tryRegionalisation ){
                        this.loadFile(path)
                    }
                    else{
                        error(data)
                    }
                })
    }

    /**
     * Add the po to storage.
     */
    loadFileContent(data){
        try {
            const translation = JSON.parse(data.result)
            this.storeLanguage(data.path, translation)
            this._doAddTranslation(data.path, translation)
        } catch (error) {
            console.error( `translation file is not correct (${data.path})` )
        }
    }

    /**
     * Enable a translation from po.
     * @param {string} translation 
     */
    _doAddTranslation(path, translation, force=false){
        // hack gt to add and not replace...
        this._appendTranslation(this.getUserLanguage(), translation, force)
        this.alreadyLoaded.push(path)
        this.onLoadString()
    }

    /**
     * Hack this.gt.addTranslation to append translations.
     */
    _appendTranslation(language, translations, force = false){
        if (!this.translations[language]) {
            this.translations[language] = translations;
        }
    
        // If force, the translation is priority
        if( force ){
            this.translations[language] = {...this.translations[language], ...translations }
        }
        else{
            this.translations[language] = {...translations, ...this.translations[language] }
        }
    }

    /**
     * Store language.
     *
     * @param {string} path 
     * @param {*} translation 
     */
    storeLanguage(path, translation){
        if( !this.enableCache ){
            return
        }
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
        // Parse each translation.
        const translationList = this.translations[this.getUserLanguage()];
        if( translationList ){
            for( let id in translationList){
                this.replaceTranslationInDOM(id, translationList[id] );
            }
        }
    }


    /**
     * Replace the translation in the DOM according to id.
     */
    replaceTranslationInDOM(id, translation){
        document.querySelectorAll(`[${PREFIX}l="${this.getTranslationId(id)}"]`).forEach(
            element => {
                let replaceData = null
                try {
                    replaceData = JSON.parse( decodeURIComponent(element.getAttribute(PREFIX+'l-data')) )
                } catch (error) {
                    replaceData = null
                }
                element.innerHTML = this.translate(id, replaceData)
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
        let result = this.translations[this.getUserLanguage()][id] || id

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
        const replaceDataAttr = encodeURIComponent(JSON.stringify(replaceData)) 
        const result = `<span ${PREFIX}l="${this.getTranslationId(id)}" ${replaceData ? `${PREFIX}l-data="${replaceDataAttr}"` : ``}>${this.translate(id, replaceData)}</span>`
        return result
    }

    /**
     * Returns the translation id, for attribute value.
     */
    getTranslationId(translation){
        return translation.replace(/(<([^>]+)>)/ig,"");
    }
}

export const LocalManager = new LocalManagerClass()
export const l = function(id, replaceData){
    return LocalManager.translate(id, replaceData)
}
export const html = function(id, replaceData){
    return LocalManager.html(id, replaceData)
}
    
