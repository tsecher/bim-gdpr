import { Wrapper } from "easy-gdpr/src/class/Wrapper";
import { Service } from "easy-gdpr/src/class/Services/Service";

export class ServiceAbstract extends Service{
    
    /**
     * Init the service and add a tool for translation.
     */
    constructor(id, name, description){
        super(id, name, description)

        try {
            const localManager = Wrapper.getLocalManager()
            this.getTranslationFile().map( url => {
                localManager.addTranslation(url)
            })       
        } catch (error) {
            console.error( error)
        }
    }

    /**
     * Return the list of translation fiels url.
     * 
     * According to the LocalManager, the url needs to contain the @ character
     * that will be replaced by the user language.
     * As an example, '/translations/service.@.po' will load 
     *  - the file '/translations/services.fr.po' for french user
     *  - the file '/translations/services.en.po' for english user
     */
    getTranslationFile(){
        return []
    }
}