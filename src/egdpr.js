import { Core } from "./core/Core";
import { Service } from "./core/services/Service";

export const eGDPR = Core
export const eGDPRService = Service

// Accessibility out of webpack
if( window[eGDPR] ){
    const tmp = window[eGDPR]
    window[eGDPR] = Core
    for(let i in tmp){
        window[eGDPR][i] = tmp[i]
    }
}
else{
    window[eGDPR] = Core
}