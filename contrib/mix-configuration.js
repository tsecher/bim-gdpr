const bimMix = require('bim-mix');
const mix = bimMix.getMix()

class MixConfigurationInitializer{

	/**
	 * Init the service build.
	 *
	 * @param {string} serviceId 
	 */
	initMixServiceConfiguration(serviceId){
		const serviceConfiguration = new bimMix.config('service')
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
		bimMix.addProcessConfig(serviceConfiguration);

		// Add the built item in the src.
		bimMix.setDestination('./','./')

		// Launch porcess configuration.
		bimMix.process();
	}

	/**
	 * Init mix template configuration.
	 *
	 * @param {string} templateId
	 */
	initMixTemplateConfiguration(templateId){
		
		// Sass configuration.
		const cssConf = new bimMix.config('templateSass')
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
		bimMix.addProcessConfig(cssConf);

		// Js configuration.
		const jsConf = new bimMix.config('templateJs')
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
		bimMix.addProcessConfig(jsConf);

		// Add the built item in the src.
		bimMix.setDestination('./','./')

		// Launch porcess configuration.
		bimMix.process();
	}

	/**
	 * Init default mix configuration.
	 */
	initMixDefaultConfiguration(){
		const servicesConfiguration = new bimMix.config(mix.inProduction() ? 'dist': 'dev')
			.setMixCallbackName('js')
			.setExtension('js')
			.setPattern([
				`./src/*.js`
			])
			// .setOutputCallback((src, out, option, conf) => {
				// const rep = bimMix.getMix().inProduction() ? 'dist': 'dev'
				// const output = src.replace(`/${serviceId}.js`, `/${rep}/${serviceId}.js`)
				// return output
			// })
		bimMix.addProcessConfig(servicesConfiguration);

		// Add the built item in the src.
		bimMix.setDestination('./','./')

		// Launch porcess configuration.
		bimMix.process();
	}

	/**
	 * Init
	 */
	initMixAllConfiguration(){
		// Sass configuration.
		const cssConf = new bimMix.config('templateSass')
			.setMixCallbackName('sass')
			.setExtension('css')
			.setPattern([
				`./src/*/*/scss/*.scss`,
				`!./src/*/*/scss/_*.scss`
			])
			.setOutputCallback((src, out, option, conf) => {
				const rep = mix.inProduction() ? 'dist': 'dev'
				let path = src.split('/src/')[1].split('/scss/')[0],
					templateId = path.split('/')[1]
				const output = `./src/${path}/${rep}/${templateId}.css`
				return output
			})
		bimMix.addProcessConfig(cssConf);

		// Js configuration.
		const jsConf = new bimMix.config('templateJs')
			.setMixCallbackName('js')
			.setExtension('js')
			.setPattern([
				`./src/{templates,services}/*/*.js`,
				`!./src/*/*/_*.js`
			])
			.setOutputCallback((src, out, option, conf) => {
				const rep = mix.inProduction() ? 'dist': 'dev'
				let pathData = src.split('/src/')[1].split('/'),
					path = pathData[0],
					templateId = pathData[1]
				const output = `./src/${path}/${templateId}/${rep}/${ pathData.slice(-1)[0]}`
				return output
			})
		bimMix.addProcessConfig(jsConf);

		// Add the built item in the src.
		bimMix.setDestination('./','./')

		// Launch porcess configuration.
		bimMix.process();
	}
}


module.exports = new MixConfigurationInitializer();
