import { routerRedux } from 'dva/router';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';

export default {
    namespace: 'login',

    state: {
        status: undefined,
    },

    effects: {
        *login({ payload }, { call, put }) {
            const response = {
                status: 'ok',
                currentAuthority: 'admin',
            };
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            if (response.status === 'ok') {
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
                    status: false,
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
                status: payload.status,
                type: payload.type,
            };
        },
    },
};
