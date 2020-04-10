const prompts = require('prompts')
const glob = require('glob')
const fs = require('fs')

class TranslationForge{

    constructor(sharedType){
        this.sharedType = sharedType
    }

    /**
     * Start process.
     */
    run(destination){
        this.destination = destination;
        this.askForType()
    }

    askForType(){
        prompts([
            {
                type: 'multiselect',
                name: 'type',
                message: 'Type of element to translate ?',
                choices: [
                    { value: 'services', title: 'Service' },
                    { value: 'templates', title: 'Template' },
                ],
            }
        ]).then( result => {
            this.getElementList(result.type[0]).then( listOfElements => {
                this.askForElement(listOfElements)
            })
        })
    }

    askForElement(listOfElements){
        prompts([
            {
                type: 'multiselect',
                name: 'element',
                message: 'Element to translate ?',
                choices: listOfElements.map( element => {
                    return {
                        title: element.split('/').slice(-1),
                        value: element
                    }
                }),
            }
        ]).then( result => this.createTranslation(result.element[0]) )
    }

    getElementList(type){
        return new Promise( resolve => {

            glob.glob(this.getSrcDir(type), (er, files)=>{
                resolve(files)
            })
        })
    }

    getSrcDir(type){

        return this.sharedType ? `./src/${type}/*` : `./bim-gdpr/${type}/*`
    }

    createTranslation(dir){
        this.translation = {};

        glob.glob( dir+'/*.js', (er, files) => {
            files.map( file => {
                this.treatFile(fs.readFileSync(file, 'utf8'));
            } )
            fs.writeFile(dir+'/translations/'+ this.destination +'.json', JSON.stringify(this.translation, null, 2), (err)=>{

            })
        } )
    }

    treatFile(data){
        this.matchAll(data, /html\((.*?)\)/g).map( item => {
            item = item.slice(1,-1)
            if( !this.translation[item] ){
                this.translation[item] = item
            }
        })
    }

    matchAll(string, reg){
        let m
        const result = []

        do {
            m = reg.exec(string);

            if (m) {
                result.push( m[1] )
            }
        } while (m);

        return result
    }

}

module.exports = TranslationForge
