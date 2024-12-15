import AIOPopup from 'aio-popup';
import AIOLoading from 'aio-loading';
type AA_method = 'post' | 'get' | 'delete' | 'put' | 'patch';
type AA_onCatch = (err: any, config: AA_api) => string;
type AA_isSuccess = (response: any, confing: AA_api) => string | true;
type AA_cache = {
    name: string;
    time: number;
};
type AA_successMessage = true | ((response: any, result: any) => string | undefined);
type AA_errorMessage = false | ((response: any) => string | undefined);
export type AA_props = {
    id: string;
    token: string;
    loader?: string;
    onCatch: AA_onCatch;
    isSuccess?: AA_isSuccess;
    lang: 'en' | 'fa';
    messageTime?: number;
    messageType?: 'alert' | 'snackebar';
};
export type AA_api = {
    description: string;
    method: AA_method;
    url: string;
    getSuccessResult: (response: any) => any;
    getErrorResult: (response: any) => any;
    getSuccessMessage?: AA_successMessage;
    getErrorMessage?: AA_errorMessage;
    body?: any;
    onCatch?: AA_onCatch;
    isSuccess?: AA_isSuccess;
    cache?: AA_cache;
    loading?: boolean;
    loadingParent?: string;
    headers?: any;
    messageTime?: number;
    messageType?: 'alert' | 'snackebar';
};
type AA_alertType = 'success' | 'error' | 'warning' | 'info';
export default class AIOApis {
    props: AA_props;
    storage: Storage;
    aioLoading: AIOLoading;
    popup: AIOPopup;
    constructor(props: AA_props);
    setToken: (token?: string) => void;
    addAlert: (p: {
        type: AA_alertType;
        text: string;
        subtext?: string;
        time?: number;
        messageType: 'alert' | 'snackebar';
    }) => void;
    renderPopup: () => any;
    setStorage: (name: string, value: any) => I_storage_model;
    getStorage: (name: string, def?: any) => any;
    removeStorage: (name: string) => I_storage_model;
    handleCacheVersions: (cacheVersions: {
        [key: string]: number;
    }) => {
        [key: string]: boolean;
    };
    responseToResult: (api: AA_api) => Promise<{
        success: boolean;
        result: any;
        response: any;
    }>;
    showErrorMessage: (response: any, message: string, api: AA_api) => void;
    showSuccessMessage: (response: any, result: any, api: AA_api) => void;
    request: (api: AA_api) => Promise<any>;
}
type I_storage_model = {
    [key: string]: any;
};
type I_storage_time = {
    [key: string]: number;
};
declare class Storage {
    model: I_storage_model;
    time: I_storage_time;
    init: () => void;
    saveStorage: (model: I_storage_model, time: I_storage_time) => void;
    getParent: (field: string) => I_storage_model | undefined;
    removeValueByField: (field: string) => I_storage_model;
    setValueByField: (field: string, value: any) => I_storage_model;
    getValueByField: (field: string) => any;
    save: (field: string, value: any) => I_storage_model;
    remove: (field: string, callback?: () => void) => I_storage_model;
    load: (field: string, def?: any, time?: number) => any;
    clear: () => void;
    getModel: () => I_storage_model;
    constructor(id: string);
}
export {};
