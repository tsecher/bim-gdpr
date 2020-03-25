import { Wrapper } from "./core/Wrapper";
import { Service } from "./core/services/Service";
import { ID } from "./core/tools/Tools";

// Accessibility out of webpack
window[ID] = window[ID] || Wrapper

export const eGDPR = Wrapper
export const eGDPRService = Service