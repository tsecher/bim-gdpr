const mixEasy = require('laravel-mix-easy-structure');
const mix = mixEasy.getMix()

class MixConfigurationInitializer{

	/**
	 * Init the service build.
	 *
	 * @param {string} serviceId 
	 */
	initMixServiceConfiguration(serviceId){
		const serviceConfiguration = new mixEasy.config('service')
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
		mixEasy.addProcessConfig(serviceConfiguration);

		// Add the built item in the src.
		mixEasy.setDestination('./','./')

		// Launch porcess configuration.
		mixEasy.process();
	}

	/**
	 * Init mix template configuration.
	 *
	 * @param {string} templateId
	 */
	initMixTemplateConfiguration(templateId){
		
		// Sass configuration.
		const cssConf = new mixEasy.config('templateSass')
			.setMixCallbackName('sass')
			.setExtension('css')
			.setPattern([
				`./src/templates/${templateId}/scss/*.scss`,
				`!./src/templates/${templateId}/scss/_*.scss`
			])
			.setOutputCallback((src, out, option, conf) => {
				const rep = mix.inProduction() ? 'dist': 'dev'
				const output = `./src/templates/${templateId}/${rep}/${templateId}.css`
				return output
			})
		mixEasy.addProcessConfig(cssConf);

		// Js configuration.
		const jsConf = new mixEasy.config('templateJs')
			.setMixCallbackName('js')
			.setExtension('js')
			.setPattern([
				`./src/templates/${templateId}/*.js`,
				`!./src/templates/${templateId}/_*.js`
			])
			.setOutputCallback((src, out, option, conf) => {
				const rep = mix.inProduction() ? 'dist': 'dev'
				const output = `./src/templates/${templateId}/${rep}/${templateId}.js`
				return output
			})
		mixEasy.addProcessConfig(jsConf);

		// Add the built item in the src.
		mixEasy.setDestination('./','./')

		// Launch porcess configuration.
		mixEasy.process();
	}

	/**
	 * Init default mix configuration.
	 */
	initMixDefaultConfiguration(){
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
}


module.exports = new MixConfigurationInitializer();