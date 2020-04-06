const TplManager = require('./TplManager')
const prompts = require('prompts')

class ServiceForge{

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
            name: '{ServiceId}',
            message: 'What is the ID of your service (slug please) ?'
        }).then(result => {
            prompts(this.getQuestions(result['{ServiceId}'])).then( (data)=> {
                this.process({...result, ...data})
            })
        })        
    }

    /**
     * Return the base question.
     *
     * @param {*} serviceId 
     */
    getQuestions(serviceId){
        return [
            {
                type: 'text',
                name: '{ServiceName}',
                message: 'What is the public name of the service ?',
                initial: serviceId.slice(0,1)[0].toUpperCase() + serviceId.slice(1)
            },
            {
                type: 'text',
                name: '{ServiceClass}',
                message: 'What is the class of the service ?',
                initial: serviceId.slice(0,1)[0].toUpperCase() + serviceId.slice(1) +"Service"
            },
            {
                type: 'text',
                name: '{ServiceDescription}',
                message: 'What is the public description of the service ?'
            },
            {
                type: 'text',
                name: '{ServiceDoc}',
                message: 'Is there a doc introducing the service ?'
            }
        ]
    }

    /**
     * Write files.
     */
    process(data){
        let from = `./contrib/forge/templates/service/`
        let to =  `./src/services/${data['{ServiceId}']}/`

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

module.exports = ServiceForge
