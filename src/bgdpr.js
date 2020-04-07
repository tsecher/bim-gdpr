import { Core } from "./core/Core";

export default Core

// Accessibility out of webpack
if( window['bGDPR'] ){
    const tmp = window['bGDPR']
    window['bGDPR'] = Core
    for(let i in tmp){
        window['bGDPR'][i] = tmp[i]
    }
}
else{
    window['bGDPR'] = Core
}
