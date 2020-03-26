const type =  process.argv.slice(-1)[0]
console.log('type', type);

let forge;

switch( type ){
    case 'service':
        forge = require( './src/ServiceForge');
        forge.run()
        break;
    case 'template':
        forge = require( './src/TemplateForge');
        forge.run()
        break;
    default:
        console.log('no forge for ' + type )
}