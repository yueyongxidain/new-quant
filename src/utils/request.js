/*
 * @Author: 刘文柱 
 * @Date: 2018-10-18 10:08:30 
 * @Last Modified by: 刘文柱
 * @Last Modified time: 2018-12-06 09:39:01
 */
import fetch from 'dva/fetch';
import { notification, message, language } from 'quant-ui';
import { routerRedux } from 'dva/router';
import store from '../index';
import { stringify } from 'qs';
let $ = language.getLanguageData;
const codeMessage = {
    200: $('服务器成功返回请求的数据。'),
    201: $('新建或修改数据成功。'),
    202: $('一个请求已经进入后台排队（异步任务）。'),
    204: $('删除数据成功。'),
    400: $('发出的请求有错误，服务器没有进行新建或修改数据的操作。'),
    401: $('用户没有权限（令牌、用户名、密码错误）。'),
    403: $('用户得到授权，但是访问是被禁止的。'),
    404: $('发出的请求针对的是不存在的记录，服务器没有进行操作。'),
    406: $('请求的格式不可得。'),
    410: $('请求的资源被永久删除，且不会再得到的。'),
    422: $('当创建一个对象时，发生一个验证错误。'),
    500: $('服务器发生错误，请检查服务器。'),
    502: $('网关错误。'),
    503: $('服务不可用，服务器暂时过载或维护。'),
    504: $('网关超时。'),
};
const requestHeader = {
    'Accept': 'text/plain;',
    'Content-Type': 'application/json',
    'mode': "cors",
}
function parseJSON(response) {
    return response.json();
}
function checkStatus(response, showMessage) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    showMessage && notification.error({
        message: `${$("请求错误")} ${response.status}: ${response.url}`,
        description: errortext,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, newOptions, showMessage = true) {
    return fetch(url, newOptions)
        .then((response) => checkStatus(response, showMessage))
        .then(parseJSON)
        .then(data => {
            if (data.errorCode == 0) {
                return data;
            } else {
                showMessage && message.error(data.errorMsg)
                return data
            }
        })
        .catch(e => {
            const { dispatch } = store;
            const status = e.name;
            if (status === 401 && showMessage) {
                dispatch({
                    type: 'login/logout',
                });
                return {
                    errorCode: status,
                };
            }
            if (status === 403 && showMessage) {
                dispatch(routerRedux.push('/exception/403'));
                return {
                    errorCode: status,
                };
            }
            if (status <= 504 && status >= 500 && showMessage) {
                dispatch(routerRedux.push('/exception/500'));
                return {
                    errorCode: status,
                };
            }
            if (status >= 404 && status < 422 && showMessage) {
                dispatch(routerRedux.push('/exception/404'));
                return {
                    errorCode: status,
                };
            }
            return {
                errorCode: 1,
            }
        });
}
/**
 * 
 * @param {string} url 请求地址
 * @param {any} params 请求参数
 * @param {Boolean} showMessage 是否显示错误提示，默认为false
 */
function GET(url, params, showMessage) {
    let _params = !!params ? "?" + stringify(params) : "";
    return request(url + _params, {
        method: "GET",
        headers: requestHeader,
        credentials: 'include'
    }, showMessage)
}

/**
 * 
 * @param {string} url 请求地址
 * @param {any} params 请求参数
 * @param {Boolean} showMessage 是否显示错误提示，默认为false
 */
function POST(url, params, showMessage) {
    return request(url, {
        method: "POST",
        headers: requestHeader,
        body: JSON.stringify(params),
        credentials: 'include',
    }, showMessage)
}


export { GET };
export { POST };

