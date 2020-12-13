import {Core} from "../Core";
import {ServiceEvents} from "./ServiceEvents";
import {ServiceStatusManager, ServiceStatus} from "./ServiceStatusManager";
import {LocalizedElementAbstract} from "../local/LocalizedElementAbstract";

export class Service extends LocalizedElementAbstract {

	constructor(id, name, description) {
		super(id)
		this._id = id
		this._name = name
		this._description = description
		this._visible = true
	}

	get id() {
		return this._id
	}

	get name() {
		return this._name
	}

	get description() {
		return this._description
	}

	get status() {
		return ServiceStatusManager.getServiceStatus(this)
	}

	set id(id) {
		this._id = id
		Core.trigger(ServiceEvents.serviceHasChanged, {service: this})
	}

	set name(name) {
		this._name = name
		Core.trigger(ServiceEvents.serviceHasChanged, {service: this})
	}

	set description(description) {
		this._description = description
		Core.trigger(ServiceEvents.serviceHasChanged, {service: this})
	}

	/**
	 * Init the element
	 */
	init() {
		super.initTranslations()
		return this;
	}

	/**
	 * Return the cookie patterns.
	 *
	 * Cookies with an id matching with this pattern will be removed when
	 * when service will stop.
	 */
	getCookiePatterns() {
		return []
	}

	/**
	 * Return the local storage patterns.
	 *
	 * Local storage with an id matching with this pattern will be removed when
	 * when service will stop.
	 */
	getLocalStoragePatterns(){
		return []
	}

	/**
	 * Return the list of scripts path to add.
	 */
	getRelatedScripts() {
		return []
	}

	/**
	 * Return the list of css path to add.
	 */
	getRelatedCss() {
		return []
	}

	/**
	 * Action when service is enabled.
	 */
	onEnable() {
	}

	/**
	 * Action when service is disabled.
	 */
	onDisable() {
	}

	/**
	 * Service run
	 */
	start() {
		if (Core.logsAreEnabled()) {
			console.log(`Start ${this.name} (${this.id})`)
		}
	}

	/**
	 * Service stop
	 */
	stop() {
		if (Core.logsAreEnabled()) {
			console.log(`Stop ${this.name} (${this.id})`)
		}
	}

	/**
	 * Is Mandatory
	 */
	isMandatory() {
		return false
	}

	/**
	 * Is Enabled
	 */
	isEnabled() {
		return this.status === ServiceStatus.enabled
	}

	/**
	 * Is disabled
	 */
	isDisabled() {
		return this.status === ServiceStatus.disabled
	}

	/**
	 * Is Pending
	 */
	isPending() {
		return this.status === ServiceStatus.pending
	}

	/**
	 * Is visible
	 */
	isVisible(){
		return this._visible
	}

	/**
	 * Set weiught
	 */
	setWeight(weight) {
		this.weight = weight

		// If the service is already in the added services
		// we sort the services list
		if (Core.getServiceManager().getServiceById(this.id)) {
			Core.trigger(ServiceEvents.serviceListHasChanged, {
				serviceManager: Core.getServiceManager()
			})
		}

		return this
	}

	/**
	 * Hide the service in the view, but let it enabled and usable.
	 */
	setHidden(){
		Core.getServiceManager().enableService(this, false)
		this._visible = false
		return this
	}
}
