/*
 * @Author: 刘文柱 
 * @Date: 2018-10-18 10:08:38 
 * @Last Modified by:   刘文柱 
 * @Last Modified time: 2018-10-18 10:08:38 
 */
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'admin';
}
export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}
