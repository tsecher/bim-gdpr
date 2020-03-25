// const mix = require('laravel-mix');
const mixEasy = require('laravel-mix-easy-structure');
const mix = mixEasy.getMix()

// If a service ID is passed, then we only build the service assets.
const serviceId = process.env.npm_config_service
if( serviceId ){
	const servicesConfiguration = new mixEasy.config('services')
		.setMixCallbackName('js')
		.setExtension('js')
		.setPattern([
			`./src/services/${serviceId}/${serviceId}.js`
		])
		.setOutputCallback((src, out, option, conf) => {
			const rep = mix.inProduction() ? 'dist': 'dev' 
			const output = src.replace(`/${serviceId}.js`, `/${rep}/${serviceId}.js`)
			return output
		})
	mixEasy.addProcessConfig(servicesConfiguration);

	// Add the built item in the src.
	mixEasy.setDestination('./','./')

	// Launch porcess configuration.
	mixEasy.process();
}
else{
	const servicesConfiguration = new mixEasy.config(mix.inProduction() ? 'dist': 'dev')
		.setMixCallbackName('js')
		.setExtension('js')
		.setPattern([
			`./src/*.js`
		])
		// .setOutputCallback((src, out, option, conf) => {
			// const rep = mixEasy.getMix().inProduction() ? 'dist': 'dev' 
			// const output = src.replace(`/${serviceId}.js`, `/${rep}/${serviceId}.js`)
			// return output
		// })
	mixEasy.addProcessConfig(servicesConfiguration);

	// Add the built item in the src.
	mixEasy.setDestination('./','./')

	// Launch porcess configuration.
	mixEasy.process();
}

