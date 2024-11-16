"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _axios=_interopRequireDefault(require("axios")),_aioPopup=_interopRequireDefault(require("aio-popup"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _defineProperty(e,t,i){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"==typeof t?t:t+""}function _toPrimitive(e,t){if("object"!=typeof e||!e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var s=i.call(e,t||"default");if("object"!=typeof s)return s;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}require("./index.css");class AIOApis{constructor(e){_defineProperty(this,"storage",void 0),_defineProperty(this,"request",void 0),_defineProperty(this,"getAppState",void 0),_defineProperty(this,"setStorage",void 0),_defineProperty(this,"getStorage",void 0),_defineProperty(this,"removeStorage",void 0),_defineProperty(this,"setToken",void 0),_defineProperty(this,"getLoading",void 0),_defineProperty(this,"handleLoading",void 0),_defineProperty(this,"responseToResult",void 0),_defineProperty(this,"requestFn",void 0),_defineProperty(this,"addAlert",void 0),_defineProperty(this,"handleCacheVersions",void 0),_defineProperty(this,"showErrorMessage",void 0),_defineProperty(this,"showSuccessMessage",void 0);let{id:t,getAppState:i=()=>{},loader:s,lang:o="en"}=e,r=new Storage(t);this.storage=r,this.getAppState=i,this.setStorage=(e,t)=>r.save(e,t),this.getStorage=(e,t)=>r.load(e,t),this.removeStorage=e=>r.remove(e),this.setToken=t=>{let i=t||e.token;i&&(_axios.default.defaults.headers.common.Authorization=`Bearer ${i}`)},this.addAlert=e=>{let{type:t,text:i,subtext:s,time:o,alertType:r="alert"}=e;"alert"===r?new _aioPopup.default().addAlert({type:t,text:i,subtext:s,time:o,className:"aio-apis-popup"}):new _aioPopup.default().addSnackebar({type:t,text:i,subtext:s,time:o})},this.getLoading=e=>(console.log(`aio-service show loading by ${e}`),`
              <div class="aio-service-loading" id="aio-service-${e}">
                <div class="aio-service-loading-0">
                  <div class="aio-service-loading-1">
                    <div class="aio-service-loading-2" style="animation: 1s ease-in-out 0.0s infinite normal none running aioserviceloading;"></div>
                    <div class="aio-service-loading-2" style="animation: 1s ease-in-out 0.1s infinite normal none running aioserviceloading;"></div>
                    <div class="aio-service-loading-2" style="animation: 1s ease-in-out 0.2s infinite normal none running aioserviceloading;"></div>
                    <div class="aio-service-loading-2" style="animation: 1s ease-in-out 0.3s infinite normal none running aioserviceloading;"></div>
                    <div class="aio-service-loading-2" style="animation: 1s ease-in-out 0.4s infinite normal none running aioserviceloading;"></div>
                  </div>
                </div>
              </div>
            `),this.handleLoading=(e,t,i)=>{let{loading:o=!0,loadingParent:r="body"}=i;if(o){if(e){let n=s?`<div class="aio-service-loading" id="aio-service-${t}">${s()}</div>`:this.getLoading(t),a=document.querySelector(r);a&&a.insertAdjacentHTML("beforeend",n)}else{let d=document.getElementById("aio-service-"+t);d||(d=document.querySelector(".aio-service-loading")),d&&d.remove()}}},this.handleCacheVersions=e=>{let t={};for(let i in e)t[i]=0;let s=this.getStorage("storedCacheVersions",t),o={};for(let r in e)void 0!==s[r]&&(s[r]!==e[r]?(o[r]=!0,this.removeStorage(r)):o[r]=!1);return this.setStorage("storedCacheVersions",e),o},this.showErrorMessage=e=>{let{result:t,message:i,description:s}=e;if(!1===i.error)return;let r;r="string"==typeof i.error?i.error:"fa"===o?`${s} با خطا روبرو شد`:`An error was occured in ${s}`,this.addAlert({type:"error",text:r,subtext:t,time:i.time,alertType:i.type})},this.showSuccessMessage=e=>{let{result:t,message:i,description:s}=e;if(!i.success)return;let r="function"==typeof i.success?i.success(t):i.success;!0===r&&(r=""),this.addAlert({type:"success",text:"fa"===o?`${s} با موفقیت انجام شد`:`${s} was successfull`,subtext:r,time:i.time,alertType:i.type})},this.responseToResult=async t=>{let{url:i,method:s,body:o,getResult:r,config:n={}}=t,{onCatch:a=e.onCatch,getError:d=e.getError}=n;try{let l=await _axios.default[s](i,void 0!==o?o:void 0);if(l){let h=d?d(l,n):void 0;if("string"==typeof h)return h}return r(l)}catch(u){let v=d?d(u.response||u,n):void 0;if(v)return v;let g;try{g=a?a(u,n):void 0}catch(f){g=f.message||f.Message}return g||(g=u.message||u.Message),g}},this.requestFn=async e=>{let{config:t={},parameter:i}=e,s="aa"+Math.round(1e5*Math.random()),{onError:o,onSuccess:r,errorResult:n,cache:a,message:d={},description:l=s,token:h}=t;if(a){let u=this.storage.load(a.name,void 0,a.time);if(void 0!==u)return u}this.setToken(h),this.handleLoading(!0,s,t);let v=await this.responseToResult(e);return l="function"==typeof l?l(i):l,"string"==typeof v?(this.showErrorMessage({result:v,message:d,description:l}),o&&o(v),v=n):(this.showSuccessMessage({result:v,message:d,description:l}),void 0===v&&(v=n),a&&this.storage.save(a.name,v),r&&r(v)),this.handleLoading(!1,s,t),v},this.request=async t=>{let{url:i,body:s,description:o,message:r,loading:n,loadingParent:a,token:d,onError:l,onSuccess:h,errorResult:u,cache:v,parameter:g}=t,f=t.onCatch||e.onCatch,c=t.getError||e.getError,p;return await this.requestFn({parameter:g,config:{description:o,message:r,loading:n,loadingParent:a,token:d,onError:l,onSuccess:h,onCatch:f,getError:c,errorResult:u,cache:v},method:t.method?t.method:"post",body:s,url:i,getResult:"function"==typeof t.getResult?t.getResult:()=>{}})}}}exports.default=AIOApis;class Storage{constructor(e){_defineProperty(this,"model",void 0),_defineProperty(this,"time",void 0),_defineProperty(this,"init",void 0),_defineProperty(this,"saveStorage",void 0),_defineProperty(this,"getParent",void 0),_defineProperty(this,"removeValueByField",void 0),_defineProperty(this,"setValueByField",void 0),_defineProperty(this,"getValueByField",void 0),_defineProperty(this,"save",void 0),_defineProperty(this,"remove",void 0),_defineProperty(this,"load",void 0),_defineProperty(this,"clear",void 0),_defineProperty(this,"getModel",void 0),this.model={},this.time={},this.init=()=>{let t=localStorage.getItem("storageClass"+e),i=localStorage.getItem("storageClassTime"+e),s,o;s=null==t?{}:JSON.parse(t),o=null==i?{}:JSON.parse(i),this.model=s,this.time=o,this.saveStorage(s,o)},this.saveStorage=(t,i)=>{localStorage.setItem("storageClass"+e,JSON.stringify(t)),localStorage.setItem("storageClassTime"+e,JSON.stringify(i))},this.getParent=e=>{let t=e.split("."),i=this.model;for(let s=0;s<t.length-1;s++)if("object"!=typeof(i=i[t[s]]))return;return i},this.removeValueByField=e=>{let t=e.split("."),i=this.getParent(e),s=t[t.length-1],o={};for(let r in i)r!==s&&(o[r]=i[r]);return t.pop(),this.setValueByField(t.join("."),o)},this.setValueByField=(e,t)=>{if(!e){this.model=t;return}var i=e.split("."),s=this.model;for(let o=0;o<i.length-1;o++){let r=i[o];void 0===s[r]&&(s[r]={}),s=s[r]}return s[i[i.length-1]]=t,this.getValueByField(i[0])},this.getValueByField=e=>{let t=e.split("."),i={...this.model};for(let s=0;s<t.length-1;s++)if("object"!=typeof(i=i[t[s]]))return;return i[t[t.length-1]]},this.save=(e,t)=>{try{t=JSON.parse(JSON.stringify(t))}catch{}if(!e||null===e)return{};let i=this.setValueByField(e,t);return this.time[e]=new Date().getTime(),this.saveStorage(this.model,this.time),i},this.remove=(e,t=()=>{})=>{let i=this.removeValueByField(e),s={};for(let o in this.time)o!==e&&(s[o]=this.time[o]);return this.time=s,this.saveStorage(this.model,this.time),t(),i},this.load=(e,t,i)=>{let s=this.getValueByField(e);if(i&&void 0!==s){let o=new Date().getTime(),r=this.time[e]||o;Math.abs(o-r)>i&&(s=void 0)}return void 0===s&&void 0!==t&&(s="function"==typeof t?t():t,this.save(e,t)),s},this.clear=()=>{this.model={},this.time={},this.saveStorage(this.model,this.time)},this.getModel=()=>JSON.parse(JSON.stringify(this.model)),this.init()}}