/*
 * @Author: 刘文柱 
 * @Date: 2018-10-18 10:08:38 
 * @Last Modified by: 刘文柱
 * @Last Modified time: 2018-11-05 17:18:13
 */
import { utils } from "quant-ui";
import { encrypt, decrypt } from "./privacy";
const { getCookie, setCookie, removeCookie } = utils;
//设置权限
export function getAuthority() {
    return localStorage.getItem('quant-authority') || 'admin';
}
export function setAuthority(authority) {
    return localStorage.setItem('quant-authority', authority);
}

//设置密码 start
export function setUserUserlogin(userlogin) {
    setCookie('quant-token', encrypt(JSON.stringify(userlogin), "518de8d99fd5d9b104360ab3"), 7)
}
export function getUserUserlogin() {
    let data = undefined
    let cookiedata = getCookie('quant-token')
    try {
        data = cookiedata && JSON.parse(decrypt(cookiedata, "518de8d99fd5d9b104360ab3"));
    } catch (error) {
        data = undefined;
    }
    return data
}
export function removeUserUserlogin() {
    removeCookie("quant-token")
}
//设置密码 end

//判断用户是否记住密码 start
export function getRemember() {
    return !window.localStorage.getItem("quant-Remember") ? true : JSON.parse(window.localStorage.getItem("qdp-remember"))
}
export function setRemember(Remember) {
    localStorage.setItem('quant-Remember', JSON.stringify(Remember));
}
//判断用户是否记住密码  end