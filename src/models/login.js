/*
 * @Author: 刘文柱 
 * @Date: 2018-11-02 11:05:59 
 * @Last Modified by: 刘文柱
 * @Last Modified time: 2018-11-05 17:22:00
 */
import { routerRedux } from 'dva/router';
import { setAuthority,setUserUserlogin,removeUserUserlogin,getRemember,setRemember } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
export default {
    namespace: 'login',
    state: {
        status:false,
        remember:getRemember()
    },
    effects: {
        *login({ payload }, { call, put ,select}) {
            const response = {
                status: true,
                currentAuthority: 'admin',
            };
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            if (response.status === true) {
                let remember = yield select(({login}) => login.remember)
                if(!!remember){
                    setUserUserlogin(payload)
                }else{
                    removeUserUserlogin();
                }
                reloadAuthorized();
                //登陆成功跳转到首页
                const urlParams = new URL(window.location.href);
                window.location.href = urlParams.origin + urlParams.pathname;
            }
        },
        *logout(_, { put }) {
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status:false,
                    currentAuthority: 'guest',
                },
            });
            reloadAuthorized();
            yield put(
                routerRedux.push({
                    pathname: '/user/login',
                })
            );
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            return {
                ...state,
                ...payload
            };
        },
        changeCheckbox(state, { payload }){
            setRemember(payload.remember)
            return {
                ...state,
                ...payload
            };
        }
    },
};
