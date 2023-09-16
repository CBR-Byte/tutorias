import{W as i}from"./index-adbbf4b3.js";function o(){const t=window.navigator.connection||window.navigator.mozConnection||window.navigator.webkitConnection;let n="unknown";const e=t?t.type||t.effectiveType:null;if(e&&typeof e=="string")switch(e){case"bluetooth":case"cellular":n="cellular";break;case"none":n="none";break;case"ethernet":case"wifi":case"wimax":n="wifi";break;case"other":case"unknown":n="unknown";break;case"slow-2g":case"2g":case"3g":n="cellular";break;case"4g":n="wifi";break}return n}class s extends i{constructor(){super(),this.handleOnline=()=>{const e={connected:!0,connectionType:o()};this.notifyListeners("networkStatusChange",e)},this.handleOffline=()=>{const n={connected:!1,connectionType:"none"};this.notifyListeners("networkStatusChange",n)},typeof window<"u"&&(window.addEventListener("online",this.handleOnline),window.addEventListener("offline",this.handleOffline))}async getStatus(){if(!window.navigator)throw this.unavailable("Browser does not support the Network Information API");const n=window.navigator.onLine,e=o();return{connected:n,connectionType:n?e:"none"}}}const r=new s;export{r as Network,s as NetworkWeb};