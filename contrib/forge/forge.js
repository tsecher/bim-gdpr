const action =  process.argv.slice(-2)[0]
const type =  process.argv.slice(-1)[0]
let forge;

// Identify the context.
let sharedType = true;
if( process.env.npm_package_scripts_egdpr 
    && process.env.npm_package_scripts_egdpr.indexOf('node_modules/easy-gdpr') > -1 ){
    sharedType = false
}

switch( action ){
    case 'new':
        switch( type ){
            case 'service':
                forge = require( './src/ServiceForge');
                new forge(sharedType).run()
                break;
            case 'template':
                forge = require( './src/TemplateForge');
                new forge(sharedType).run()
                break;
            default:
                console.log(`no forge ${action} for ${type}` )
        }
        break;
    case 'translate':
        forge = require('./src/TranslationForge')
        new forge(sharedType).run(type)
    break;
    default:
        console.log(`no forge ${action}` )
}