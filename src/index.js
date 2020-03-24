import { Wrapper } from "easy-gdpr/src/core/Wrapper";
import { WrapperEvents } from "easy-gdpr/src/core/events/Events";
import { Service } from "easy-gdpr/src/core/services/Service";
import { LocalizedElementAbstract } from "easy-gdpr/src/core/local/LocalizedElementAbstract";
import { ID } from "easy-gdpr/src/core/tools/Tools";

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID].core = Wrapper;

export const eGDPR = Wrapper
export const eGDPREvents = WrapperEvents
export const eGDPRService = Service
export const eGDPRLocalizedElements = LocalizedElementAbstract