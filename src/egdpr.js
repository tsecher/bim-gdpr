import { Core } from "./core/Core";
import { Service } from "./core/services/Service";

export const bGDPR = Core
export const bGDPRService = Service

// Accessibility out of webpack
if( window[bGDPR] ){
    const tmp = window[bGDPR]
    window[bGDPR] = Core
    for(let i in tmp){
        window[bGDPR][i] = tmp[i]
    }
}
else{
    window[bGDPR] = Core
}
