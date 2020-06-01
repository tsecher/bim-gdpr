// import {initMixDefaultConfiguration, initMixServiceConfiguration, initMixTemplateConfiguration} from "./contrib/mix-configuration";
const mixConfigurationInitializer = require('./contrib/mix-configuration')

// Type
if( process.env.npm_config_type ){
	switch (process.env.npm_config_type) {
		case "all":
			mixConfigurationInitializer.initMixAllConfiguration()
			break;
		
	}
}
// If a service ID is passed, then we only build the service assets.
else if( process.env.npm_config_service ){
	mixConfigurationInitializer.initMixServiceConfiguration(process.env.npm_config_service)
}
// If a template ID is passed, then we only build the template assets.
else if( process.env.npm_config_template ){
	mixConfigurationInitializer.initMixTemplateConfiguration(process.env.npm_config_template)
}
else{
	mixConfigurationInitializer.initMixDefaultConfiguration();
}
