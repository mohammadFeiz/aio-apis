import Axios from 'axios';
import AIOPopup from 'aio-popup';
import AIOLoading from 'aio-loading';
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export default class AIOApis {
  constructor(props) {
    _defineProperty(this, "props", void 0);
    _defineProperty(this, "storage", void 0);
    _defineProperty(this, "aioLoading", void 0);
    _defineProperty(this, "popup", void 0);
    _defineProperty(this, "setToken", token => {
      let res = token || this.props.token;
      if (res) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${res}`;
      }
    });
    _defineProperty(this, "addAlert", p => {
      let {
        type,
        text,
        subtext,
        time
      } = p;
      const {
        messageType = 'alert'
      } = this.props;
      if (messageType === 'alert') {
        this.popup.addAlert({
          type,
          text,
          subtext,
          time,
          className: 'aio-apis-popup',
          closeText: this.props.lang === 'fa' ? 'بستن' : 'Close'
        });
      } else {
        this.popup.addSnackebar({
          type,
          text,
          subtext,
          time
        });
      }
    });
    _defineProperty(this, "renderPopup", () => this.popup.render());
    _defineProperty(this, "setStorage", (name, value) => this.storage.save(name, value));
    _defineProperty(this, "getStorage", (name, def) => this.storage.load(name, def));
    _defineProperty(this, "removeStorage", name => this.storage.remove(name));
    _defineProperty(this, "handleCacheVersions", cacheVersions => {
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
    });
    _defineProperty(this, "responseToResult", async api => {
      try {
        let response = await Axios({
          method: api.method,
          url: api.url,
          data: api.body,
          headers: api.headers
        });
        let success = api.isSuccess(response, api);
        if (typeof success === 'string') {
          return {
            success: false,
            result: success,
            response
          };
        }
        return {
          success: true,
          result: api.getSuccessResult(response),
          response
        };
      } catch (response) {
        let message = api.onCatch(response, api);
        if (!message) {
          message = response.message;
        }
        return {
          success: false,
          result: message,
          response
        };
      }
    });
    _defineProperty(this, "showErrorMessage", (response, message, api) => {
      const {
        getErrorMessage = () => message,
        messageTime = this.props.messageTime,
        messageType = this.props.messageType || 'alert'
      } = api;
      if (getErrorMessage === false) {
        return;
      }
      let text = this.props.lang === 'fa' ? `${api.description} با خطا روبرو شد` : `An error was occured in ${api.description}`;
      let subtext = getErrorMessage(response);
      this.addAlert({
        type: 'error',
        text,
        subtext,
        time: messageTime,
        messageType
      });
    });
    _defineProperty(this, "showSuccessMessage", (response, result, api) => {
      if (!api.getSuccessMessage) {
        return;
      }
      const {
        messageTime = this.props.messageTime,
        messageType = this.props.messageType || 'alert'
      } = api;
      const text = this.props.lang === 'fa' ? `${api.description} با موفقیت انجام شد` : `${api.description} was successfull`;
      let subtext = api.getSuccessMessage === true ? '' : api.getSuccessMessage(response, result) || '';
      this.addAlert({
        type: 'success',
        text,
        subtext: subtext,
        time: messageTime,
        messageType
      });
    });
    _defineProperty(this, "request", async api => {
      const {
        onCatch = this.props.onCatch,
        isSuccess = this.props.isSuccess || (() => true),
        loading = true
      } = api;
      if (api.cache) {
        let res = this.storage.load(api.cache.name, undefined, api.cache.time);
        if (res !== undefined) {
          return res;
        }
      }
      const id = 'aa' + Math.round(Math.random() * 100000);
      if (api.loading) {
        this.aioLoading.show(id, api.loadingParent);
      }
      let {
        success,
        result,
        response
      } = await this.responseToResult({
        ...api,
        onCatch,
        isSuccess
      });
      if (!success) {
        this.showErrorMessage(response, result, api);
        return api.getErrorResult(response);
      }
      this.showSuccessMessage(response, result, api);
      if (api.cache) {
        this.storage.save(api.cache.name, result);
      }
      if (loading) {
        this.aioLoading.hide(id);
      }
      return result;
    });
    this.props = props;
    this.aioLoading = new AIOLoading(props.loader);
    this.storage = new Storage(props.id);
    this.popup = new AIOPopup();
    this.setToken(props.token);
  }
}
class Storage {
  constructor(id) {
    _defineProperty(this, "model", void 0);
    _defineProperty(this, "time", void 0);
    _defineProperty(this, "init", void 0);
    _defineProperty(this, "saveStorage", void 0);
    _defineProperty(this, "getParent", void 0);
    _defineProperty(this, "removeValueByField", void 0);
    _defineProperty(this, "setValueByField", void 0);
    _defineProperty(this, "getValueByField", void 0);
    _defineProperty(this, "save", void 0);
    _defineProperty(this, "remove", void 0);
    _defineProperty(this, "load", void 0);
    _defineProperty(this, "clear", void 0);
    _defineProperty(this, "getModel", void 0);
    this.model = {};
    this.time = {};
    this.init = () => {
      let storage = localStorage.getItem('storageClass' + id);
      let timeStorage = localStorage.getItem('storageClassTime' + id);
      let model, time;
      if (storage === undefined || storage === null) {
        model = {};
      } else {
        model = JSON.parse(storage);
      }
      if (timeStorage === undefined || timeStorage === null) {
        time = {};
      } else {
        time = JSON.parse(timeStorage);
      }
      this.model = model;
      this.time = time;
      this.saveStorage(model, time);
    };
    this.saveStorage = (model, time) => {
      localStorage.setItem('storageClass' + id, JSON.stringify(model));
      localStorage.setItem('storageClassTime' + id, JSON.stringify(time));
    };
    this.getParent = field => {
      let fields = field.split('.');
      let parent = this.model;
      for (let i = 0; i < fields.length - 1; i++) {
        parent = parent[fields[i]];
        if (typeof parent !== 'object') {
          return;
        }
      }
      return parent;
    };
    this.removeValueByField = field => {
      let fields = field.split('.');
      let parent = this.getParent(field);
      let lastField = fields[fields.length - 1];
      let newParent = {};
      for (let prop in parent) {
        if (prop !== lastField) {
          newParent[prop] = parent[prop];
        }
      }
      fields.pop();
      return this.setValueByField(fields.join('.'), newParent);
    };
    this.setValueByField = (field, value) => {
      if (!field) {
        this.model = value;
        return;
      }
      var fields = field.split('.');
      var parent = this.model;
      for (let i = 0; i < fields.length - 1; i++) {
        let f = fields[i];
        if (parent[f] === undefined) {
          parent[f] = {};
        }
        parent = parent[f];
      }
      parent[fields[fields.length - 1]] = value;
      return this.getValueByField(fields[0]);
    };
    this.getValueByField = field => {
      let fields = field.split('.');
      let model = this.model;
      let parent = {
        ...model
      };
      for (let i = 0; i < fields.length - 1; i++) {
        parent = parent[fields[i]];
        if (typeof parent !== 'object') {
          return;
        }
      }
      return parent[fields[fields.length - 1]];
    };
    this.save = (field, value) => {
      try {
        value = JSON.parse(JSON.stringify(value));
      } catch {
        value = value;
      }
      if (!field || field === null) {
        return {};
      }
      let res = this.setValueByField(field, value);
      this.time[field] = new Date().getTime();
      this.saveStorage(this.model, this.time);
      return res;
    };
    this.remove = (field, callback = () => {}) => {
      let res = this.removeValueByField(field);
      let newTime = {};
      for (let prop in this.time) {
        if (prop !== field) {
          newTime[prop] = this.time[prop];
        }
      }
      this.time = newTime;
      this.saveStorage(this.model, this.time);
      callback();
      return res;
    };
    this.load = (field, def, time) => {
      let value = this.getValueByField(field);
      if (time && value !== undefined) {
        let thisTime = new Date().getTime();
        let lastTime = this.time[field] || thisTime;
        let dif = Math.abs(thisTime - lastTime);
        if (dif > time) {
          value = undefined;
        }
      }
      if (value === undefined && def !== undefined) {
        value = typeof def === 'function' ? def() : def;
        this.save(field, def);
      }
      return value;
    };
    this.clear = () => {
      this.model = {};
      this.time = {};
      this.saveStorage(this.model, this.time);
    };
    this.getModel = () => JSON.parse(JSON.stringify(this.model));
    this.init();
  }
}