import {GroupManager} from './groups/GroupManager'
import {ServiceManager} from './services/ServiceManager';
import {ViewManager} from './view/ViewManager';
import {Service} from './services/Service';
import {Group} from './groups/Group';
import {ServiceEvents} from './services/ServiceEvents';
import {LocalManager} from './local/LocalManager';
import {TemplateAbstract} from './view/TemplateAbstract';
import {PseudoPromise} from "./tools/PseudoPromise";

const $scriptjs = require('scriptjs')


class CoreClass {

	constructor() {
		this.logs = false
		this.testMode = false
		this.autoShow = true
		this.observables = []
		this.viewManager = ViewManager
		this.serviceManager = ServiceManager
		this.groupManager = GroupManager
		this.localManager = LocalManager

		this.autoShowCallback = () => {
			if (this.testMode || this.serviceManager.getPendingServices().length) {
				this.showView()
			}
		}
	}

	/**
	 * Init and launch wrapper.
	 */
	init() {
		this.serviceManager.init()
		this.groupManager.init()
		this.viewManager.init()
		this.localManager.init()

		// Run services.
		this.getServiceManager().getEnabledServicesList().map(service => {
			this.getServiceManager().startService(service)
		})

		// Auto show
		if (this.autoShow) {
			window.removeEventListener('DOMContentLoaded', this.autoShowCallback)
			window.addEventListener('DOMContentLoaded', this.autoShowCallback)
		}

		this.on(ServiceEvents.serviceStatusHasChanged).subscribe((data) => this.initDomData());

		return this
	}

	/**
	 * Allow testing of 'fr-FR' instead of simply 'fr'
	 */
	allowTryRegionalisation() {
		this.localManager.allowTryRegionalisation()
		return this
	}

	/**
	 * Enable logs.
	 */
	disableLogs() {
		this.logs = false
		return this
	}

	/**
	 * Return true if logs are enabled.
	 */
	logsAreEnabled() {
		return this.logs
	}

	/**
	 * Returns the service manager.
	 */
	getServiceManager() {
		return this.serviceManager
	}

	/**
	 * Returns the service if exists.
	 *
	 * @param {string} serviceId
	 *
	 * @returns {Service}
	 */
	getServiceById(serviceId) {
		return this.getServiceManager().getServiceById(serviceId)
	}

	/**
	 * Returns the group manager
	 */
	getGroupManager() {
		return this.groupManager
	}

	/**
	 * Returns the service if exists.
	 *
	 * @param {string} serviceId
	 *
	 * @returns {Service}
	 */
	getGroupById(groupId) {
		return this.getGroupManager().getGroupById(groupId)
	}

	/**
	 * Return the template Manager object.
	 *
	 * @returns {ViewManager}
	 */
	getViewManager() {
		return this.viewManager
	}

	/**
	 * Return the local manager.
	 *
	 * @returns {LocalManager}
	 */
	getLocalManager() {
		return this.localManager
	}

	/**
	 * Allows to redefine the event that display
	 * the popup at start.
	 *
	 * @param {boolean} eventName
	 */
	disableAutoShow() {
		this.autoShow = false
		window.removeEventListener('DOMContentLoaded', this.autoShowCallback)
		return this
	}

	/**
	 * Dispatch rxjs event.
	 */
	trigger(name, data) {
		if (this.logs) {
			console.log(`Trigger ${name}`, data)
		}

		if (this._observableIsDefined(name)) {
			this.observables[name].onResolve({name, data})
		}

		return this
	}

	/**
	 * Returns an subject.
	 *
	 * @param {*} name
	 *
	 * @returns {Subject}
	 */
	on(name) {
		if (!this._observableIsDefined(name)) {
			this.observables[name] = new PseudoPromise()
		}
		return this.observables[name]
	}

	/**
	 * Check if observable is defined and used.
	 * @param {*} name
	 */
	_observableIsDefined(name) {
		return this.observables
			&& this.observables[name]
			&& typeof (this.observables[name].onResolve) === 'function'
	}

	/**
	 * Create and a service and return it
	 *
	 * @returns {Service}
	 */
	createService(service) {
		return this.serviceManager.createService(service)
	}

	/**
	 * Add a service
	 *
	 * @returns {Service}
	 */
	addService(service) {
		this.serviceManager.createService(service)
		return this
	}

	/**
	 * Returns a new group.
	 *
	 * @param {string} id
	 * @param {string} name
	 * @param {string} description
	 *
	 * @returns {Group}
	 */
	createGroup(id, name, description) {
		return this.groupManager.createGroup(id, name, description)
	}

	/**
	 * Show view.
	 */
	showView() {
		this.viewManager.show()
		return this
	}

	/**
	 * Hide view
	 */
	hideView() {
		this.viewManager.hide()
		return this
	}

	/**
	 * Set the template of the view.
	 *
	 * @param {*} template
	 *
	 * @returns {CoreClass}
	 */
	setTemplate(template) {
		this.viewManager.getView().setTemplate(template)
		return this
	}

	/**
	 * Set the template of the view.
	 *
	 * @param {*} template
	 *
	 * @returns {TemplateAbstract}
	 */
	createTemplate(template) {
		this.viewManager.getView().setTemplate(template)
		return this.getTemplate()
	}

	/**
	 * Set the template of the view.
	 *
	 * @returns {TemplateAbstract}
	 */
	getTemplate() {
		return this.viewManager.getView().getTemplate()
	}

	/**
	 * Add a distant script
	 */
	addScript(url, callback) {
		$scriptjs(url, callback)
		return this
	}

	/**
	 * Remove script
	 * @param {string} script
	 */
	removeScript(script) {
		document.querySelectorAll('script[src="' + script + '"]').forEach(item => item.parentNode.removeChild(item))
		return this
	}

	/**
	 * Add a css script.
	 *
	 * @param {string} url
	 * @param {string} media
	 */
	addCss(url, media) {
		const head = document.querySelector('head');
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		link.media = media || 'all';
		head.appendChild(link);

		return this
	}

	/**
	 * Add a css script.
	 *
	 * @param {string} url
	 * @param {string} media
	 */
	removeCss(url) {
		document.querySelectorAll('link[href="' + url + '"]').forEach(item => item.parentNode.removeChild(item))
		return this
	}

	/**
	 * Init dom attributes.
	 */
	initDomData() {
		this.viewManager.initDomData()
		return this
	}

	/**
	 * Add translation
	 *
	 * @param {obj} translation
	 */
	addTranslation(translation) {
		this.localManager.addTranslation('global', translation)
		return this
	}
}

export const Core = new CoreClass();
