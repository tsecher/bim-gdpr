// import {initMixDefaultConfiguration, initMixServiceConfiguration, initMixTemplateConfiguration} from "./contrib/mix-configuration";
const mixConfigurationInitializer = require('./contrib/mix-configuration')

// If a service ID is passed, then we only build the service assets.
const serviceId = process.env.npm_config_service
if( process.env.npm_config_service ){
	mixConfigurationInitializer.initMixServiceConfiguration(process.env.npm_config_service)
}
// If a template ID is passed, then we only build the template assets.
else if( process.env.npm_config_template ){
	mixConfigurationInitializer.initMixTemplateConfiguration(process.env.npm_config_template)
}
else{
	mixConfigurationInitializer.initMixDefaultConfiguration();
}