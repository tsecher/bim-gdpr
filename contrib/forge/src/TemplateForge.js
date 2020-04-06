const TplManager = require('./TplManager')
const prompts = require('prompts')

class TemplateForge{

    constructor(sharedType){
        this.sharedType = sharedType
    }

    /**
     * Start process.
     */
    run(){
        this.askForData()
    }

    /**
     * Ask for data.
     */
    askForData(){
        prompts({
            type: 'text',
            name: '{TemplateId}',
            message: 'What is the ID of your template (slug please) ?'
        }).then(result => {
            prompts(this.getQuestions(result['{TemplateId}'])).then( (data)=> {
                this.process({...result, ...data})
            })
        })        
    }

    /**
     * Return the base question.
     *
     * @param {*} templateId 
     */
    getQuestions(templateId){
        return [
            {
                type: 'text',
                name: '{TemplateName}',
                message: 'What is the public name of the template ?',
                initial: templateId.slice(0,1)[0].toUpperCase() + templateId.slice(1)
            },
            {
                type: 'text',
                name: '{TemplateClass}',
                message: 'What is the class of the template ?',
                initial: templateId.slice(0,1)[0].toUpperCase() + templateId.slice(1) +"Template"
            }
        ]
    }

    /**
     * Write files.
     */
    process(data){
        let from = `./contrib/forge/templates/template/`
        let to =  `./src/templates/${data['{TemplateId}']}/`

        if( !this.sharedType ){
            to = to.replace('/src/', '/bim-gdpr/')
            from = './node_modules/bim-gdpr/' + from
        }

        this.tpl = new TplManager()
            .run(
                from,
                to,
                {...{
                    '{ImportPath}': this.sharedType ? '../../' : 'bim-gdpr/src/',
                    '{CommentCDN}': this.sharedType ? '' : '//',
                    },
                    ...data
                }
            );
    }
}

module.exports = TemplateForge
