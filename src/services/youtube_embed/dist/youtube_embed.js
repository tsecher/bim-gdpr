!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=58)}({0:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"d",(function(){return o})),n.d(t,"a",(function(){return u})),n.d(t,"c",(function(){return i}));var r="bgdpr",o="data-"+r+"-",u="https://cdn.jsdelivr.net/gh/tsecher/bim-gdpr@master/",i="%"},58:function(e,t,n){e.exports=n(59)},59:function(e,t,n){"use strict";n.r(t),n.d(t,"YoutubeEmbedService",(function(){return u}));var r=n(0);function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.id=t||"youtube_embed",this.name=n||"YoutubeEmbed",this.description=r||"Allow you to access the Youtube Embed videos",this.doc="https://developers.google.com/youtube/iframe_api_reference",this.defaultLanguage="en"}var t,n,u;return t=e,(n=[{key:"getDefaultTranslations",value:function(){return[r.a+"src/services/youtube_embed/translations/".concat(r.c,".json")]}},{key:"start",value:function(){}}])&&o(t.prototype,n),u&&o(t,u),e}();window[r.b]=window[r.b]||{},window[r.b].services_class=window[r.b].services_class||{},window[r.b].services_class.YoutubeEmbedService=u}});