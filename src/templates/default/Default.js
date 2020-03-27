import { ID, PREFIX, CDN, LANGUAGE_TOKEN } from "../../core/tools/Tools";

export class Default{

    constructor(){
        this.id = 'default-template'
    }

    /**
     * Init the template when loaded.
     */
    init(){
        try {
            this.persistentButton()
        } catch (error) {
            document.addEventListener('DOMContentLoaded', () => this.persistentButton())
        }
    }

    /**
     * Add a persistent button
     */
    persistentButton(){
        const button = document.createElement('div')
        button.classList.add( `${ID}-persistent`)
        button.setAttribute(`${PREFIX}view-show`, '')
        button.innerHTML = `<svg class="${ID}-persistent-logo" viewBox="0 0 100 100" x="0" y="0" xmlns="http://www.w3.org/2000/svg">
            <g stroke="null" transform="rotate(-151.4181365966797 48.95931625366211,49.56866073608398) " id="svg_21">
                <path stroke="null" d="m48.17258,38.18804c0.49484,-0.53886 0.49484,-1.34714 0,-1.886c-0.49483,-0.53885 -1.23709,-0.53885 -1.73193,0c-0.49483,0.53886 -0.49483,1.34714 0,1.886c0.49484,0.53885 1.23709,0.53885 1.73193,0z" id="svg_5"/>
                <path stroke="null" d="m69.05544,29.92053c0.49483,-0.53886 0.49483,-1.34714 0,-1.886c-0.49484,-0.53886 -1.23709,-0.53886 -1.73193,0c-0.49484,0.53885 -0.49484,1.34714 0,1.886c0.49483,0.53886 1.23709,0.53886 1.73193,0z" id="svg_6"/>
                <path stroke="null" d="m58.51677,52.40708c-0.49483,0.53885 -0.49483,1.34714 0,1.886c0.49484,0.53885 1.23709,0.53885 1.73193,0c0.49483,-0.53886 0.49483,-1.34714 0,-1.886c-0.49484,-0.40414 -1.3608,-0.40414 -1.73193,0z" id="svg_7"/>
                <path stroke="null" d="m77.59722,53.5927c0.49483,-0.53885 0.49483,-1.48185 0,-1.886c-0.49484,-0.53885 -1.23709,-0.53885 -1.73193,0c-0.49484,0.53886 -0.49484,1.34714 0,1.886c0.49483,0.53886 1.3608,0.53886 1.73193,0z" id="svg_8"/>
                <path stroke="null" d="m57.17749,63.97774c-0.49484,0.53885 -0.49484,1.34714 0,1.886c0.49483,0.53886 1.23709,0.53886 1.73193,0c0.49484,-0.53886 0.49484,-1.34714 0,-1.886c-0.49484,-0.53886 -1.23709,-0.53886 -1.73193,0z" id="svg_9"/>
                <path stroke="null" d="m44.60901,68.26883c-0.49483,0.53885 -0.49483,1.34714 0,1.886c0.49484,0.53886 1.23709,0.53886 1.73193,0c0.49484,-0.53886 0.49484,-1.34714 0,-1.886c-0.37113,-0.53886 -1.23709,-0.53886 -1.73193,0z" id="svg_10"/>
                <path stroke="null" d="m31.80418,76.47433c2.84531,0 5.19579,-2.55957 5.19579,-5.658s-2.35047,-5.65799 -5.19579,-5.65799c-2.84531,0 -5.19578,2.55957 -5.19578,5.65799s2.35047,5.658 5.19578,5.658zm0,-8.6217c1.48451,0 2.7216,1.34714 2.7216,2.96371s-1.23709,2.96371 -2.7216,2.96371s-2.7216,-1.34714 -2.7216,-2.96371s1.23709,-2.96371 2.7216,-2.96371z" id="svg_22"/>
                <path stroke="null" d="m71.81582,49.07742c2.84531,0 5.19579,-2.55957 5.19579,-5.65799s-2.35047,-5.658 -5.19579,-5.658c-2.84531,0 -5.19578,2.55957 -5.19578,5.658s2.35047,5.65799 5.19578,5.65799zm0,-8.6217c1.48451,0 2.7216,1.34714 2.7216,2.96371s-1.23709,2.96371 -2.7216,2.96371s-2.7216,-1.34714 -2.7216,-2.96371s1.23709,-2.96371 2.7216,-2.96371z" id="svg_11"/>
                <path stroke="null" d="m53.31081,21.66073c0,3.09843 2.35047,5.658 5.19578,5.658s5.19579,-2.55957 5.19579,-5.658s-2.35047,-5.65799 -5.19579,-5.65799s-5.19578,2.55957 -5.19578,5.65799zm5.19578,-2.96371c1.48451,0 2.7216,1.34714 2.7216,2.96371s-1.23709,2.96371 -2.7216,2.96371s-2.7216,-1.34714 -2.7216,-2.96371s1.23709,-2.96371 2.7216,-2.96371z" id="svg_12"/>
                <path stroke="null" d="m49.84111,57.09662c2.96902,0 5.3195,-2.55957 5.19579,-6.06214c0,0 0,0 0,0c0,0 0,0 0,-0.13471c-0.49484,-7.13985 -10.39158,-6.60099 -10.39158,0.53885c0,3.09843 2.35047,5.658 5.19579,5.658zm0,-2.69428c-1.48451,0 -2.7216,-1.34714 -2.7216,-2.96371c0,-1.21243 0.61855,-2.15542 1.60822,-2.69428c1.73193,-0.80829 3.71128,0.13471 3.83499,2.42486c0.12371,1.886 -1.23709,3.23314 -2.7216,3.23314z" id="svg_13"/>
                <path stroke="null" d="m24.13545,68.42032c2.47418,-1.61657 3.34015,-4.98442 1.85564,-7.67871c-1.48451,-2.69428 -4.57724,-3.63728 -7.05143,-2.02071c-2.47418,1.61657 -3.34015,4.98442 -1.85564,7.67871c1.3608,2.69429 4.45353,3.63728 7.05142,2.02071zm-3.95869,-7.40928c1.3608,-0.80829 2.96902,-0.40414 3.71128,1.07771c0.74226,1.48186 0.24742,3.23314 -0.98967,4.04143c-1.23709,0.80829 -2.96902,0.26943 -3.71128,-1.07771c-0.86596,-1.48186 -0.37113,-3.23314 0.98967,-4.04143z" id="svg_23"/>
                <path stroke="null" d="m31.41029,47.62506c2.47418,-1.61657 3.34015,-4.98442 1.85564,-7.67871c-1.48451,-2.69428 -4.57724,-3.63728 -7.05142,-2.02071c-2.47419,1.61657 -3.34015,4.98442 -1.85564,7.67871c1.3608,2.69428 4.45353,3.63728 7.05142,2.02071zm-3.95869,-7.40928c1.3608,-0.80829 2.96902,-0.26943 3.71128,1.07771c0.74226,1.48186 0.24742,3.23314 -0.98968,4.04143c-1.23709,0.80828 -2.96902,0.26943 -3.71127,-1.07772c-0.86596,-1.48186 -0.37113,-3.23314 0.98967,-4.04142z" id="svg_14"/>
                <path stroke="null" d="m48.24245,27.65353c0.37113,0 0.61854,-0.13471 0.86596,-0.40414c0.24742,-0.26943 0.37113,-0.53885 0.37113,-0.943c0,-0.40414 -0.12371,-0.67357 -0.37113,-0.943c-0.49484,-0.53886 -1.23709,-0.53886 -1.73193,0c-0.24742,0.26943 -0.37113,0.53886 -0.37113,0.943c0,0.40414 0.12371,0.67357 0.37113,0.943c0.24742,0.26943 0.49484,0.40414 0.86597,0.40414z" id="svg_15"/>
                <path stroke="null" d="m35.10988,56.00984c-0.49483,0.53885 -0.49483,1.34714 0,1.886c0.49484,0.53885 1.23709,0.53885 1.73193,0c0.49484,-0.53886 0.49484,-1.34714 0,-1.886c-0.37113,-0.53886 -1.23709,-0.53886 -1.73193,0z" id="svg_16"/>
                <path stroke="null" d="m27.89135,53.23581c0.49484,-0.53886 0.49484,-1.34714 0,-1.886c-0.49483,-0.53886 -1.23709,-0.53886 -1.73193,0c-0.49484,0.53885 -0.49484,1.34714 0,1.886c0.49484,0.53886 1.23709,0.53886 1.73193,0z" id="svg_17"/>
                <path stroke="null" d="m34.07281,27.94731c-7.5095,1.81759 -13.8534,6.67305 -17.95237,13.71924c-4.2973,7.38714 -7.55788,16.34439 -5.44803,24.81721c2.10985,8.47282 9.47479,15.90324 16.66775,19.92341c0.41823,0.28936 0.93024,0.16543 1.23314,-0.10317c1.92193,-1.53929 4.41587,-2.04528 6.66692,-1.12542c0.48435,0.17571 0.99636,0.05178 1.32692,-0.51646c1.59747,-2.24193 4.08064,-3.23354 6.66225,-2.88193c2.58162,0.35161 4.71122,1.98439 5.86604,4.53663c0.46746,0.96097 1.63449,0.97144 2.16338,0.06226c1.52058,-2.61391 4.20208,-3.94646 7.02048,-3.74981c1.65137,0.18618 5.97023,-6.22971 7.1218,-8.46136c12.62961,-3.05686 21.94792,-12.2058 22.48867,-26.49543c0.32876,-8.37953 -4.58345,-20.56865 -9.90371,-26.79973c-5.21569,-6.15874 -10.2822,-8.38894 -17.97782,-8.77217c-10.37101,-0.32156 -20.46967,5.44269 -25.93543,15.84674zm24.00958,51.99551c-2.88451,-0.08301 -5.67057,1.1772 -7.54327,3.38811c-1.56226,-2.35597 -4.03321,-3.90613 -6.7855,-4.21644c-3.13207,-0.41368 -6.19336,0.81551 -8.30285,3.18137c-2.55395,-0.65125 -5.32312,-0.1763 -7.52028,1.33196c-6.22426,-3.66875 -12.88497,-10.29317 -14.80259,-17.83604c-1.99451,-7.91486 1.11696,-15.85955 5.14981,-22.79209c7.80125,-13.4105 27.07321,-16.78112 39.30651,-8.31741c14.78114,10.38585 13.43498,32.85291 0.49817,45.26054zm18.33386,-57.12778c4.75901,5.68339 9.45133,17.24221 9.13946,24.83648c-0.4132,12.30583 -8.0187,19.7708 -18.5787,23.3032c5.45642,-13.91707 3.99209,-30.04038 -8.13666,-38.43176c-5.54158,-3.83399 -15.01778,-5.95901 -21.48636,-5.17453c5.13987,-8.07931 13.58105,-12.75886 22.71892,-12.33412c7.0406,0.24883 11.51821,2.23098 16.34334,7.80073z" id="svg_18"/>
            </g>
      </svg>`
        document.querySelector('body').append(button)
    }

    /**
     * Add the default css list.
     */
    getDefaultCssList(){
        return [
            CDN + `src/templates/default/dist/default.css`
        ]
    }
    /**
     * Return the default list of translation files.
     */
    getDefaultTranslations(){
        return [
            CDN + `src/templates/default/translations/${LANGUAGE_TOKEN}.json`
        ]
    }

    /**
     * Tempp dom add
     */
    getShowPromise(){
        return new Promise((resolve) => {
            window.setTimeout(() => {resolve()}, 100)
        })
    }

    /**
     * Temp dom remove.
     */
    getHidePromise(){
        return new Promise((resolve) => {
            window.setTimeout(() => {resolve()}, 300)
        })
    } 

    /**
     * Wrap the content
     * @param {*} content 
     */
    wrapper(content){
        return `
        <style>.${ID}-view{ opacity:0} </style>
        <div class="${ID}-view-overlay">
            <div class="${ID}-view-wrapper">
                <div class="${ID}-view">
                    <svg class="${ID}-view-hide" ${PREFIX}view-hide viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <rect transform="rotate(135 50,50.45312118530273) " id="svg_2" height="8" width="70" y="46.45312" x="15" stroke-width="1.5" fill="#000"/>
                            <rect transform="rotate(45 50.00000000000001,50.453125) " id="svg_1" height="8" width="70" y="46.45313" x="15" stroke-width="1.5" fill="#000"/>
                        </g>
                    </svg>
                    <div class="${ID}-view-content">
                        ${content}
                    </div>
                </div>
            </div>
        </div>`
    }

    /**
     * Return the content of the view.
     *
     * @param {string} markup 
     */
    getContent(markup){
        return `
        <div class="${ID}-view-main">
            <div class="title">${this.html('Vos données personnelles')}</div>
            <div class="${ID}-view-head">        
                ${this.html(`Ce site utilise des services pour améliorer votre expérience utilisateur et vous proposer certains contenus externes. 
                Certains de ces services peuvent recquérir et exploiter des données personnelles. 
                Vous pouvez gérer leur activation via ce panneau accessible à tout moment.<br/>Vous pouvez également accéder et gérer en détail l'ensemble des services que le site propose.`)}
            </div>

            <div class="${ID}-view-quick">
                <button ${PREFIX}all-enable="accept_all">
                <svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g id="valid">
                        <rect transform="rotate(135 60.709205627441406,52.107933044433594) " id="svg_2" height="8" width="70" y="48.10793" x="25.70921" stroke-width="1.5" fill="#000"/>
                        <rect stroke="null" transform="rotate(45 30.14121246337889,65.61316680908203) " id="svg_1" height="8" width="31.10913" y="61.61317" x="14.58665" stroke-width="1.5" fill="#000"/>
                    </g>
                </svg>
                    ${this.html('Tout accepter')}
                </button>
                <button ${PREFIX}all-disable="deny_all">${this.html('Tout refuser')}</button>
                <button ${PREFIX}view-toggle-detail>${this.html('Voir le détail')}</button>
            </div>
        </div>
        <div class="${ID}-view-detail">
            ${markup}
        </div>`
    }

     /**
     * Return the markup of a single service.
     *
     * @param {*} service 
     */
    getServiceMarkup(service){        
        return `
            <div class="${ID}-view-service line ${( service.isMandatory() ? 'mandatory':'')}" ${PREFIX}service="${service.id}" ${PREFIX}status="${service.status}">
                <div class="line-accept" ${PREFIX}service-toggle="${service.id}">
                    <svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#valid"></use>
                    </svg>
                </div>
                <div class="line-content">
                    <div class="${ID}-view-service-name">${this.html(service.name)}${this.getMandatoryText(service)}</div>
                    <div class="${ID}-view-service-description">${this.html(service.description)}</div>
                </div>
                <div>
                    <button ${PREFIX}service-toggle="${service.id}">
                        <span class="enable">${this.html('Activer')}</span>
                        <span class="disable">${this.html('Désactiver')}</span>
                    </button>  
                </div>
            </div>
        `
    }

    /**
     * Return the markup of a group
     *
     * @param {Group} group 
     */
    getGroupMarkup(group, serviceMarkupList){
        return `
        <div class="${ID}-view-group">
            <div class="${ID}-view-group-head line ${( group.isMandatory() ? 'mandatory':'')}" ${PREFIX}group="${group.id}" ${PREFIX}status="${group.status}">
                <div class="line-accept" ${PREFIX}group-toggle="${group.id}">
                    <svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#valid"></use>
                    </svg>
                </div>
                <div class="line-content">
                    <div class="${ID}-view-group-name">${group.name}${this.getMandatoryText(group)}</div>
                    <div class="${ID}-view-group-description">${group.description}</div>
                    <div class="${ID}-view-group-detail">
                        <a class="more" href="Javascript:void();" ${PREFIX}group-toggle-detail="${group.id}">Détail</a>  
                    </div>
                </div>
                <div class="${ID}-view-group-quick question">
                    <button ${PREFIX}group-toggle="${group.id}">
                        <span class="enable">${this.html('Tout activer')}</span>
                        <span class="disable">${this.html('Tout désactiver')}</span>
                    </button>
                </div>
            </div>

            <div class="${ID}-view-group-services">
                ${serviceMarkupList.join('')}
            </div>
        </div>
        `
    }

    /**
     * Return the mandatory text.
     *
     * @param {*} element 
     */
    getMandatoryText(element){
        return element.isMandatory() ? ` <span class='mandatory-mention'>${this.html(`(nécessaire au fonctionnement du site)`)}</span>` : ''
    }
}

// Accessibility out of webpack
window[ID] = window[ID] || {}
window[ID]['template_class'] = window[ID]['template_class'] || {};
window[ID]['template_class']['Default'] = Default;
