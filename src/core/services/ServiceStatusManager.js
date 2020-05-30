import {ID} from '../tools/Tools';

export const Cookies = require('js-cookie');

export const ServiceStatus = {
	enabled: 1,
	pending: -1,
	disabled: 0,
}

class ServiceStatusManagerClass {

	constructor() {
	}

	getServiceStatus(service, retry = true) {
		// If a status is defined in cookie, we return the value
		const allStatus = this.getData()
		if (typeof (allStatus[service.id]) !== 'undefined') {
			return allStatus[service.id]
		}

		if (retry) {
			this.setServiceStatus(service, ServiceStatus.pending)
			return this.getServiceStatus(service, false);
		}

		return ServiceStatus.pending
	}

	setServiceStatus(service, status) {
		const allStatus = this.getData()
		allStatus[service.id] = status
		if (localStorage) {
			localStorage.setItem(ID, JSON.stringify(allStatus));
		} else {
			Cookies.set(ID, allStatus)
		}
	}

	getData() {
		// Check localstorage first.
		let data = localStorage.getItem(ID) || Cookies.get(ID) || {}
		try {
			data = JSON.parse(data)
		} catch (error) {
		}
		return data
	}
}

export const ServiceStatusManager = new ServiceStatusManagerClass()
