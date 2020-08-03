const prompts = require('prompts')
const glob = require('glob')
const fs = require('fs')

class TranslationForge {

    constructor(sharedType) {
        this.sharedType = sharedType
    }

    /**
     * Start process.
     */
    run(destination) {
        this.destination = destination;
        this.askForLanguages()
    }

    askForType() {
        prompts([
            {
                type: 'multiselect',
                name: 'type',
                message: 'Type of element to translate ?',
                choices: [
                    {value: 'services', title: 'Service'},
                    {value: 'templates', title: 'Template'},
                ],
            }
        ]).then(result => {
            this.getElementList(result.type[0]).then(listOfElements => {
                this.askForElement(listOfElements)
            })
        })
    }

    askForLanguages() {
        prompts([
            {
                type: 'text',
                name: 'language',
                message: 'Languages (separated by ",") ?',
                initial: 'fr,en,nl,de,es',
            }
        ]).then(result => {
            this.destinationLanguages = result.language
                .split(',')
                .map(item => item.trim())
                .filter(item => item.length > 0 );

            this.destinationLanguages.push('template')
            this.askForType();
        })
    }

    askForElement(listOfElements) {
        prompts([
            {
                type: 'multiselect',
                name: 'element',
                message: 'Element to translate ?',
                choices: listOfElements.map(element => {
                    return {
                        title: element.split('/').slice(-1),
                        value: element
                    }
                }),
            }
        ]).then(result => this.createTranslation(result.element[0]))
    }

    getElementList(type) {
        return new Promise(resolve => {

            glob.glob(this.getSrcDir(type), (er, files) => {
                resolve(files)
            })
        })
    }

    getSrcDir(type) {
        return this.sharedType ? `./src/${type}/*` : `./bim-gdpr/${type}/*`
    }

    createTranslation(dir) {
        this.translation = {};

        glob.glob(dir + '/*.js', (er, files) => {
            files.map(file => {
                this.treatFile(fs.readFileSync(file, 'utf8'));
            })

            this.destinationLanguages.forEach( language => {
                fs.writeFile(dir + '/translations/' + language + '.json', JSON.stringify(this.translation, null, 2), (err) => {
                })
            })

        })
    }

    treatFile(data) {
        this.matchAll(data, /html\((.*?)\)/g).map(item => {
            item = item.slice(1, -1)
            if (!this.translation[item]) {
                this.translation[item] = {
                    value: item,
                    description: "",
                    type: item.length > 100 ? 'long' : 'short',
                }
            }
        })
    }

    matchAll(string, reg) {
        let m
        const result = []

        do {
            m = reg.exec(string);

            if (m) {
                result.push(m[1])
            }
        } while (m);

        return result
    }

}

module.exports = TranslationForge
