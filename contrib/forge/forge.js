const type =  process.argv.slice(-1)[0]
console.log('type', type);

switch( type ){
    case 'service':
        const forge = require( './src/ServiceForge');
        forge.run()
        break;
    default:
        console.log('no forge for ' + type )
}