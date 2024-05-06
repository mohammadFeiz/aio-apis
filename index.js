import Axios from 'axios';
import { AIODate, Storage } from 'aio-utils';
import AIOPopup from 'aio-popup';
import $ from 'jquery';
import './index.css';
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export default class AIOApis {
  constructor(props) {
    _defineProperty(this, "storage", void 0);
    _defineProperty(this, "fn", void 0);
    _defineProperty(this, "getAppState", void 0);
    _defineProperty(this, "setStorage", void 0);
    _defineProperty(this, "getStorage", void 0);
    _defineProperty(this, "removeStorage", void 0);
    _defineProperty(this, "setToken", void 0);
    _defineProperty(this, "getLoading", void 0);
    _defineProperty(this, "handleLoading", void 0);
    _defineProperty(this, "responseToResult", void 0);
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "addAlert", void 0);
    _defineProperty(this, "handleCacheVersions", void 0);
    _defineProperty(this, "showErrorMessage", void 0);
    _defineProperty(this, "showSuccessMessage", void 0);
    _defineProperty(this, "dateToString", void 0);
    _defineProperty(this, "dateToNumber", void 0);
    _defineProperty(this, "dateToArray", void 0);
    _defineProperty(this, "DATE", void 0);
    let {
      id,
      getAppState = () => {},
      baseUrl,
      token,
      loader,
      apis,
      mock = {},
      lang = 'en'
    } = props;
    let storage = new Storage(id);
    this.storage = storage;
    this.DATE = new AIODate();
    this.getAppState = getAppState;
    this.setStorage = (name, value) => storage.save(name, value);
    this.getStorage = (name, def) => storage.load(name, def);
    this.removeStorage = name => storage.remove(name);
    this.setToken = token => {
      let res = token || props.token;
      if (res) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${res}`;
      }
    };
    this.addAlert = p => {
      let {
        type,
        text,
        subtext,
        message
      } = p;
      let {
        time,
        type: alertType = 'alert'
      } = message;
      alertType = alertType || 'alert';
      if (alertType === 'alert') {
        new AIOPopup().addAlert({
          type,
          text,
          subtext,
          time
        });
      } else {
        new AIOPopup().addSnackebar({
          type,
          text,
          subtext,
          time
        });
      }
    };
    this.dateToString = (date, pattern = '{year}/{month}/{day}') => {
      return this.DATE.getDateByPattern(date, pattern);
    };
    this.dateToNumber = date => {
      return this.DATE.getTime(date);
    };
    this.dateToArray = (date, jalali) => {
      return this.DATE.convertToArray(date, jalali);
    };
    this.getLoading = id => {
      console.log(`aio-service show loading by ${id}`);
      return `
              <div class="aio-service-loading" id="aio-service-${id}">
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
            `;
    };
    this.handleLoading = (state, apiName, config) => {
      let {
        loading = true,
        loadingParent = 'body'
      } = config;
      if (!loading) {
        return;
      }
      if (state) {
        let loadingStr = loader ? `<div class="aio-service-loading" id="aio-service-${apiName}">${loader()}</div>` : this.getLoading(apiName);
        let parent = $(loadingParent);
        parent.append(loadingStr);
      } else {
        let loadingDom = $('#aio-service-' + apiName);
        if (!loadingDom.length) {
          loadingDom = $('.aio-service-loading');
        }
        loadingDom.remove();
      }
    };
    this.handleCacheVersions = cacheVersions => {
      let def = {};
      for (let prop in cacheVersions) {
        def[prop] = 0;
      }
      let storedCacheVersions = this.getStorage('storedCacheVersions', def);
      let diffrences = {};
      for (let prop in cacheVersions) {
        if (storedCacheVersions[prop] === undefined) {
          continue;
        }
        if (storedCacheVersions[prop] !== cacheVersions[prop]) {
          diffrences[prop] = true;
          this.removeStorage(prop);
        } else {
          diffrences[prop] = false;
        }
      }
      this.setStorage('storedCacheVersions', cacheVersions);
      return diffrences;
    };
    this.showErrorMessage = m => {
      let {
        result,
        message,
        description
      } = m;
      if (message.error === false) {
        return;
      }
      let text;
      if (typeof message.error === 'string') {
        text = message.error;
      } else {
        text = lang === 'fa' ? `${description} با خطا روبرو شد` : `An error was occured in ${description}`;
      }
      this.addAlert({
        type: 'error',
        text,
        subtext: result,
        message
      });
    };
    this.showSuccessMessage = m => {
      let {
        result,
        message,
        description
      } = m;
      if (!message.success) {
        return;
      }
      let subtext = typeof message.success === 'function' ? message.success(result) : message.success;
      if (subtext === true) {
        subtext = '';
      }
      this.addAlert({
        type: 'success',
        text: lang === 'fa' ? `${description} با موفقیت انجام شد` : `${description} was successfull`,
        subtext: subtext,
        message
      });
    };
    this.responseToResult = async p => {
      let {
        url,
        method,
        body,
        getResult,
        config = {}
      } = p;
      let {
        onCatch = props.onCatch,
        getError = props.getError
      } = config;
      try {
        let response = await Axios[method](url, body !== undefined ? body : undefined);
        if (response) {
          let error = getError ? getError(response, config) : undefined;
          if (typeof error === 'string') {
            return error;
          }
        }
        return getResult(response);
      } catch (err) {
        let catchResult;
        try {
          catchResult = onCatch ? onCatch(err, config) : undefined;
        } catch (err) {
          catchResult = err.message || err.Message;
        }
        if (!catchResult) {
          catchResult = err.message || err.Message;
        }
        console.log(err);
        return catchResult;
      }
    };
    this.request = async p => {
      let {
        id,
        config = {},
        mockResult,
        parameter
      } = p;
      if (mockResult && typeof mock[id] === 'function') {
        this.handleLoading(true, id, config);
        let res = await mock[id](parameter);
        this.handleLoading(false, id, config);
        if (config.onSuccess) {
          config.onSuccess(res);
        }
        return res;
      }
      let {
        onError,
        onSuccess,
        errorResult,
        cache,
        message = {},
        description = id,
        token
      } = config;
      if (cache) {
        let res = this.storage.load(cache.name, undefined, cache.time);
        if (res !== undefined) {
          return res;
        }
      }
      this.setToken(token);
      this.handleLoading(true, id, config);
      let result = await this.responseToResult(p);
      if (typeof result === 'string') {
        this.showErrorMessage({
          result,
          message,
          description
        });
        if (onError) {
          onError(result);
        }
        result = errorResult;
      } else {
        this.showSuccessMessage({
          result,
          message,
          description
        });
        if (result === undefined) {
          result = errorResult;
        }
        if (cache) {
          this.storage.save(cache.name, result);
        }
        if (onSuccess) {
          onSuccess(result);
        }
      }
      this.handleLoading(false, id, config);
      return result;
    };
    this.fn = {};
    for (let prop in apis) {
      this.fn[prop] = (p, Setting) => {
        let setting = apis[prop];
        let {
          description = setting.description,
          message = setting.message,
          loading = setting.loading,
          loadingParent = setting.loadingParent,
          token = setting.token,
          onError = setting.onError,
          onSuccess = setting.onSuccess,
          onCatch = setting.onCatch,
          getError = setting.getError,
          errorResult = setting.errorResult,
          cache = setting.cache,
          mockResult: mockResultByCalling
        } = Setting || {};
        let {
          getBody
        } = setting;
        let config = {
          description,
          message,
          loading,
          loadingParent,
          token,
          onError,
          onSuccess,
          onCatch,
          getError,
          errorResult,
          cache
        };
        let body = typeof getBody === 'function' ? getBody(p) : undefined;
        let url = typeof setting.getUrl === 'function' ? setting.getUrl(baseUrl) : '';
        let getResult = typeof setting.getResult === 'function' ? setting.getResult : () => {};
        let mockResult = !!setting.mockResult || !!mockResultByCalling;
        return this.request({
          parameter: p,
          config,
          mockResult,
          method: !setting.method ? 'post' : setting.method,
          body,
          url,
          id: prop,
          getResult
        });
      };
    }
  }
}