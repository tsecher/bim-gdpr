const TplManager = require('./TplManager')
const prompts = require('prompts')

class TemplateForge{

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
        const to =  `./src/templates/${data['{TemplateId}']}/`

        this.tpl = new TplManager()
            .run(
                './contrib/forge/templates/template/',
                to,
                data
            );
    }
}

module.exports = new TemplateForge()