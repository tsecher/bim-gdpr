import { Core } from "./core/Core";
import { ID } from "./core/tools/Tools";

export default Core

// Accessibility out of webpack
if( window[ID] ){
    const tmp = window[ID]
    window[ID] = Core
    for(let i in tmp){
        window[ID][i] = tmp[i]
    }
}
else{
    window[ID] = Core
}
