import {Service} from "./Service"
import {ServiceEvents} from "./ServiceEvents"
import {ServicePlaceholder} from "./ServicePlaceholder"
import {sortByWeight, checkInterface, PREFIX} from "../tools/Tools"
import {Core} from "../Core"
import {ServiceStatusManager, ServiceStatus, Cookies} from "./ServiceStatusManager"

/**
 * The service interface.
 */
const ServiceInterface = {
    id: 'id',
    name: 'Name',
    description: 'description',
    start: function () {
    },
}

/**
 * The service manager.
 */
class ServiceManagerClass {

    constructor() {
        this.services = []
        this.servicePlaceholder = new ServicePlaceholder()
    }

    /**
     * Return the list of services.
     */
    getServicesList() {
        return this.services
    }

    /**
     * Return the list of enabled services.
     */
    getEnabledServicesList() {
        return this.services.filter(service => {
            return service.isEnabled()
        })
    }

    /**
     * Return the list of disabled services
     */
    getDisabledServicesList() {
        return this.services.filter(service => {
            return service.isDisabled()
        })
    }

    /**
     * Return the list of pending services
     */
    getPendingServices() {
        return this.services.filter(service => {
            return service.isPending()
        })
    }

    /**
     * Return the list of mandatory services.
     */
    getMandatoryServicesList() {
        return this.services.filter(service => {
            return service.isMandatory()
        })
    }

    /**
     * Init the default behaviors
     */
    init() {
        this.servicePlaceholder.init();
        Core.on(ServiceEvents.serviceListHasChanged).subscribe((data) => this.sortServices())
    }

    /**
     * Add a service
     *
     * @param {object} serviceData
     */
    createService(serviceData) {
        let service = serviceData

        // Check if service is a class.
        if (!(this.isService(serviceData))) {
            service = this.overrideService(serviceData)
            if (!service) {
                return null
            }
        }

        if (!this.getServiceById(service.id)) {
            // Add weight to service
            service.weight = typeof (serviceData.weight) !== 'undefined' ? service.weight : this.services.length
            service.init()
            this.services.push(service)

            // Init enabled services.
            if (service.isEnabled()) {
                this.startService(service)
            }

            // Dispatch event.
            Core.trigger(ServiceEvents.serviceListHasChanged, {
                services: this.services
            })
            return service
        } else {
            throw `Service ${id} already exists`
        }
        return null
    }

    /**
     * Return a service from obj that match Service Interface
     * @param {*} serviceData
     */
    overrideService(serviceData) {
        let service = null
        if (checkInterface(ServiceInterface, serviceData, Core.logsAreEnabled())) {
            service = new Service()
            // Pseudo extension from object.
            for (let i in serviceData) {
                service[i] = serviceData[i]
            }

            // Proto
            if (Object.getOwnPropertyNames(Object.getPrototypeOf(serviceData)).indexOf('start') > -1) {
                Object.getOwnPropertyNames(Object.getPrototypeOf(serviceData)).map(
                    propertyName => {
                        service[propertyName] = serviceData[propertyName]
                    }
                )

                if ('function' === typeof (serviceData.getDefaultTranslations)) {
                    service.setTranslations(serviceData.getDefaultTranslations())
                }
            }
        }
        return service
    }

    /**
     * Return a service by id.
     *
     * @param {string} id
     *
     * @returns {Service}
     */
    getServiceById(id) {
        return this.services.filter(service => {
            return service.id === id
        })[0]
    }

    /**
     * Sort services
     */
    sortServices() {
        if (this.services.length > 1) {
            this.services = this.services.sort((a, b) => sortByWeight(a, b))
        }
        return this
    }

    /**
     * Return true if data is a service.
     * @param {*} serviceData
     */
    isService(serviceData) {
        return serviceData instanceof Service
    }

    /**
     * Enable all services.
     */
    enableAll() {
        this.enableService(this.services)
    }

    /**
     * Enable the service
     *
     * @param {Service} service
     */
    enableService(service, dispacth = true) {
        if (Array.isArray(service)) {
            // Treat only enabled services.
            const servicesToEnable = service.filter(s => {
                return !s.isEnabled()
            })

            if (servicesToEnable.length) {
                servicesToEnable.map(s => {
                    this.enableService(s, false)
                })
                Core.trigger(ServiceEvents.serviceStatusHasChanged, {services: servicesToEnable})
            }
        } else if (service && !service.isEnabled()) {
            ServiceStatusManager.setServiceStatus(service, ServiceStatus.enabled)
            service.onEnable()
            this.startService(service)
            if (dispacth) {
                Core.trigger(ServiceEvents.serviceStatusHasChanged, {services: [service]})
            }
        }
    }

    /**
     * Start the service.
     *
     * @param {Service} service
     */
    startService(service) {
        if( !service.isRuning ){
            service.isRuning = true
            service.getRelatedScripts().map(script => {
                if (typeof (script) === 'string') {
                    Core.addScript(script)
                } else {
                    try {
                        if (script.path) {
                            Core.addScript(script.path, script.callback)
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            })

            service.start()
            Core.trigger(ServiceEvents.serviceStart, {service: service})
        }
    }

    /**
     * Disable all
     */
    disableAll() {
        this.disableService(this.services)
    }

    /**
     * Disable the service
     *
     * @param {Service} service
     */
    disableService(service, dispatch = true) {
        if (Array.isArray(service)) {
            // Treat only enabled services.
            const servicesToDisable = service.filter(s => {
                return !s.isDisabled()
            })

            if (servicesToDisable.length > 0) {
                servicesToDisable.forEach(s => {
                    this.disableService(s, false)
                })
                Core.trigger(ServiceEvents.serviceStatusHasChanged, {services: servicesToDisable})
            }
        } else if (service) {
            const serviceIsEnabled = service.isEnabled()
            if ((serviceIsEnabled || service.isPending()) && !service.isMandatory()) {
                if (service.isEnabled()) {
                    this.stopService(service)
                    service.onDisable()
                }
                ServiceStatusManager.setServiceStatus(service, ServiceStatus.disabled)
                if (dispatch) {
                    Core.trigger(ServiceEvents.serviceStatusHasChanged, {services: [service]})
                }
            }
        }
    }

    /**
     * Start the service.
     *
     * @param {Service} service
     */
    stopService(service) {
        if( service.isRuning ){
            service.isRuning = false
            service.stop()

            // Delete cookies.
            this.deleteCookies(service)

            // Delete local storage
            this.deleteLocalStorage(service)

            // Delete scripts.
            service.getRelatedScripts().map(script => {
                if (typeof (script) === 'string') {
                    Core.removeScript(script)
                } else if (script.path) {
                    Core.removeScript(script.path)
                }
            })

            Core.trigger(ServiceEvents.serviceStop, {service: service})
        }

    }


    /**
     * Delete cookies linked to the service.
     *
     * @param {Service} service
     */
    deleteCookies(service) {
        try {
            const listOfCookies = Object.keys(Cookies.get())
            const cookiesPatterns = service.getCookiePatterns()
            if (listOfCookies.length && cookiesPatterns.length) {
                listOfCookies
                    .filter(cookieName => this.filterFromPatterns(cookieName, cookiesPatterns))
                    .map(cookieName => Cookies.remove(cookieName))
            }
        } catch (error) {

        }
    }

    /**
     * Delete localStorage linked to the service.
     *
     * @param {Service} service
     */
    deleteLocalStorage(service) {
        if (window.localStorage) {
            try {
                // service.getLocalStoragePatterns()
                const localStorageNames = Object.keys(window.localStorage)
                const localStoragePatterns = service.getLocalStoragePatterns()
                if (localStorageNames.length && localStoragePatterns.length) {
                    localStorageNames
                        .filter(storageName => this.filterFromPatterns(storageName, localStoragePatterns))
                        .map(storageName => {
                            window.localStorage.removeItem(storageName)

                        })
                }
            } catch (error) {
            }
        }
    }

    /**
     * Returns the list that matches patterns.
     *
     * @param {string} item
     * @param {Array} patternsList
     */
    filterFromPatterns(item, patternsList) {
        for (let i in patternsList) {
            if (item.match(patternsList[i])) {
                return true
            }
        }
        return false
    }

    /**
     * Toggle service
     */
    toggleService(service) {
        if (service.isEnabled()) {
            this.disableService(service)
        } else {
            this.enableService(service)
        }
    }
}

export const ServiceManager = new ServiceManagerClass();
