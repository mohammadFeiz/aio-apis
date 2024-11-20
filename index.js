function _defineProperty(e,t,i){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"==typeof t?t:t+""}function _toPrimitive(e,t){if("object"!=typeof e||!e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var s=i.call(e,t||"default");if("object"!=typeof s)return s;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}import e from"axios";import t from"aio-popup";import"./index.css";export default class i{constructor(i){_defineProperty(this,"storage",void 0),_defineProperty(this,"request",void 0),_defineProperty(this,"getAppState",void 0),_defineProperty(this,"setStorage",void 0),_defineProperty(this,"getStorage",void 0),_defineProperty(this,"removeStorage",void 0),_defineProperty(this,"setToken",void 0),_defineProperty(this,"getLoading",void 0),_defineProperty(this,"handleLoading",void 0),_defineProperty(this,"responseToResult",void 0),_defineProperty(this,"requestFn",void 0),_defineProperty(this,"addAlert",void 0),_defineProperty(this,"handleCacheVersions",void 0),_defineProperty(this,"showErrorMessage",void 0),_defineProperty(this,"showSuccessMessage",void 0);let{id:s,getAppState:r=()=>{},loader:o,lang:n="en"}=i,a=new Storage(s);this.storage=a,this.getAppState=r,this.setStorage=(e,t)=>a.save(e,t),this.getStorage=(e,t)=>a.load(e,t),this.removeStorage=e=>a.remove(e),this.setToken=t=>{let s=t||i.token;s&&(e.defaults.headers.common.Authorization=`Bearer ${s}`)},this.addAlert=e=>{let{type:i,text:s,subtext:r,time:o,alertType:n="alert"}=e;"alert"===n?new t().addAlert({type:i,text:s,subtext:r,time:o,className:"aio-apis-popup"}):new t().addSnackebar({type:i,text:s,subtext:r,time:o})},this.getLoading=e=>(console.log(`aio-service show loading by ${e}`),`
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
            `),this.handleLoading=(e,t,i)=>{let{loading:s=!0,loadingParent:r="body"}=i;if(s){if(e){let n=o?`<div class="aio-service-loading" id="aio-service-${t}">${o()}</div>`:this.getLoading(t),a=document.querySelector(r);a&&a.insertAdjacentHTML("beforeend",n)}else{let d=document.getElementById("aio-service-"+t);d||(d=document.querySelector(".aio-service-loading")),d&&d.remove()}}},this.handleCacheVersions=e=>{let t={};for(let i in e)t[i]=0;let s=this.getStorage("storedCacheVersions",t),r={};for(let o in e)void 0!==s[o]&&(s[o]!==e[o]?(r[o]=!0,this.removeStorage(o)):r[o]=!1);return this.setStorage("storedCacheVersions",e),r},this.showErrorMessage=e=>{let{result:t,message:i,description:s}=e;if(!1===i.error)return;let r;r="string"==typeof i.error?i.error:"fa"===n?`${s} با خطا روبرو شد`:`An error was occured in ${s}`,this.addAlert({type:"error",text:r,subtext:t,time:i.time,alertType:i.type})},this.showSuccessMessage=e=>{let{result:t,message:i,description:s}=e;if(!i.success)return;let r="function"==typeof i.success?i.success(t):i.success;!0===r&&(r=""),this.addAlert({type:"success",text:"fa"===n?`${s} با موفقیت انجام شد`:`${s} was successfull`,subtext:r,time:i.time,alertType:i.type})},this.responseToResult=async t=>{let{url:s,method:r,body:o,getResult:n,config:a={},headers:d}=t,{onCatch:l=i.onCatch,getError:h=i.getError}=a;try{let v=await e({method:r,url:s,data:o,headers:d});if(v){let g=h?h(v,a):void 0;if("string"==typeof g)return g}return n(v)}catch(u){let c=h?h(u.response||u,a):void 0;if(c)return c;let f;try{f=l?l(u,a):void 0}catch(y){f=y.message||y.Message}return f||(f=u.message||u.Message),f}},this.requestFn=async e=>{let{config:t={},parameter:i}=e,s="aa"+Math.round(1e5*Math.random()),{onError:r,onSuccess:o,errorResult:n,cache:a,message:d={},description:l=s,token:h}=t;if(a){let v=this.storage.load(a.name,void 0,a.time);if(void 0!==v)return v}this.setToken(h),this.handleLoading(!0,s,t);let g=await this.responseToResult(e);return l="function"==typeof l?l(i):l,"string"==typeof g?(this.showErrorMessage({result:g,message:d,description:l}),r&&r(g),g=n):(this.showSuccessMessage({result:g,message:d,description:l}),void 0===g&&(g=n),a&&this.storage.save(a.name,g),o&&o(g)),this.handleLoading(!1,s,t),g},this.request=async e=>{let{url:t,body:s,description:r,message:o,loading:n,headers:a,loadingParent:d,token:l,onError:h,onSuccess:v,errorResult:g,cache:u,parameter:c}=e,f=e.onCatch||i.onCatch,y=e.getError||i.getError,m;return await this.requestFn({parameter:c,config:{description:r,message:o,loading:n,loadingParent:d,token:l,onError:h,onSuccess:v,onCatch:f,getError:y,errorResult:g,cache:u},method:e.method?e.method:"post",body:s,url:t,getResult:"function"==typeof e.getResult?e.getResult:()=>{},headers:a})}}};class Storage{constructor(e){_defineProperty(this,"model",void 0),_defineProperty(this,"time",void 0),_defineProperty(this,"init",void 0),_defineProperty(this,"saveStorage",void 0),_defineProperty(this,"getParent",void 0),_defineProperty(this,"removeValueByField",void 0),_defineProperty(this,"setValueByField",void 0),_defineProperty(this,"getValueByField",void 0),_defineProperty(this,"save",void 0),_defineProperty(this,"remove",void 0),_defineProperty(this,"load",void 0),_defineProperty(this,"clear",void 0),_defineProperty(this,"getModel",void 0),this.model={},this.time={},this.init=()=>{let t=localStorage.getItem("storageClass"+e),i=localStorage.getItem("storageClassTime"+e),s,r;s=null==t?{}:JSON.parse(t),r=null==i?{}:JSON.parse(i),this.model=s,this.time=r,this.saveStorage(s,r)},this.saveStorage=(t,i)=>{localStorage.setItem("storageClass"+e,JSON.stringify(t)),localStorage.setItem("storageClassTime"+e,JSON.stringify(i))},this.getParent=e=>{let t=e.split("."),i=this.model;for(let s=0;s<t.length-1;s++)if("object"!=typeof(i=i[t[s]]))return;return i},this.removeValueByField=e=>{let t=e.split("."),i=this.getParent(e),s=t[t.length-1],r={};for(let o in i)o!==s&&(r[o]=i[o]);return t.pop(),this.setValueByField(t.join("."),r)},this.setValueByField=(e,t)=>{if(!e){this.model=t;return}var i=e.split("."),s=this.model;for(let r=0;r<i.length-1;r++){let o=i[r];void 0===s[o]&&(s[o]={}),s=s[o]}return s[i[i.length-1]]=t,this.getValueByField(i[0])},this.getValueByField=e=>{let t=e.split("."),i={...this.model};for(let s=0;s<t.length-1;s++)if("object"!=typeof(i=i[t[s]]))return;return i[t[t.length-1]]},this.save=(e,t)=>{try{t=JSON.parse(JSON.stringify(t))}catch{}if(!e||null===e)return{};let i=this.setValueByField(e,t);return this.time[e]=new Date().getTime(),this.saveStorage(this.model,this.time),i},this.remove=(e,t=()=>{})=>{let i=this.removeValueByField(e),s={};for(let r in this.time)r!==e&&(s[r]=this.time[r]);return this.time=s,this.saveStorage(this.model,this.time),t(),i},this.load=(e,t,i)=>{let s=this.getValueByField(e);if(i&&void 0!==s){let r=new Date().getTime(),o=this.time[e]||r;Math.abs(r-o)>i&&(s=void 0)}return void 0===s&&void 0!==t&&(s="function"==typeof t?t():t,this.save(e,t)),s},this.clear=()=>{this.model={},this.time={},this.saveStorage(this.model,this.time)},this.getModel=()=>JSON.parse(JSON.stringify(this.model)),this.init()}}