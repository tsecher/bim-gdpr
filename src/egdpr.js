import { Wrapper } from "./core/Wrapper";
import { Service } from "./core/services/Service";
import { ID } from "./core/tools/Tools";

export const eGDPR = Wrapper
export const eGDPRService = Service

// Accessibility out of webpack
if( window[ID] ){
    const tmp = window[ID]
    window[ID] = Wrapper
    for(let i in tmp){
        window[ID][i] = tmp[i]
    }
}
else{
    window[ID] = Wrapper
}