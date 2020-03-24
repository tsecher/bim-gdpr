/**
 * Data prefix.
 */
export const ID = 'egdpr'
export const PREFIX = 'data-' + ID + '-'
export const CDN = 'https://cdn.jsdelivr.net/gh/tsecher/easy-gdpr@develop/'
// export const CDN = '/src/node_modules/easy-gdpr/'
export const LANGUAGE_TOKEN = '%'

/**
 * Sort callback
 */
export const sortByWeight = function(a,b){
    a = a.weight;
    b = b.weight;
    if( a > b ){
        return 1
    }
    if( a < b){
        return -1
    }
    return 0
}

/**
 * Check interface.
 */
export const checkInterface = function(interfaceObj, obj, log=true){
    const incorrectProperties = []
    
    // Parse each property
    for( let i in interfaceObj ){
        // If the property of the serviceData is not the same as the default property,
        // then this is not a valid object.
        const type = typeof(interfaceObj[i])
        const valueType = typeof(obj[i])
        if( type !== valueType ){
            incorrectProperties.push({
                type : type,
                name : i,
                value: obj[i],
                valueType: valueType
            })
        }
    }
    if( incorrectProperties.length ){
        if( log ){
            const sep = '\r\n\t - '
            const missingList = sep + incorrectProperties.map(i => {return `waiting for ${i.name} (${i.type}) and got value ${i.value} (${i.valueType}) ` }).join(sep);
            throw `The object ${obj} does not match interface ${interfaceObj}. Here are missing or bad typed properties : ${missingList} \r\n Please check the doc to make your service valid`
        }
        return false
    }

    return true
}
