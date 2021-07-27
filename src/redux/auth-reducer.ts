import { ResultCodeForCaptcha } from './../api/api';
import { BaseThunkType, InferActionsType } from './reduxStore';
import { stopSubmit } from 'redux-form';
import { ResultCodeEnum } from '../api/api';
import { authAPI } from '../api/authApi';
import { securityAPI } from '../api/securityApi';

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';
// const SET_USER_PHOTO = 'samurai-network/auth/SET-USER-PHOTO';

// здесь получается слишком много кода типизации --- можно сократить код, убрав нижний type InitialStateType
// export type InitialStateType = {
//     id: number | null,
//     login: string | null,
//     email: string | null,
//     isAuth: boolean,
//     photo: string |null,
//     captchaUrl: string | null
// };

// следовательно здесь закомментируем
let initialState/*: InitialStateType*/ = {
    // поэтому здесь добавим к типу null дополнительную информацию
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    photo: null as string | null,
    captchaUrl: null as string | null // если null, то captcha не придет
};

// вместо него делаем следующее
export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsType<typeof actions>

// В данном случае добавляем ReturnType<typeof stopSubmit> - чтобы можно было диспотчить stopSubmit() из redux-form в санке
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>;


const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    };
};


// БЫЛИ actions
// export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => {
//     return {
//         type: SET_USER_DATA,
//         payload: { id, email, login, isAuth}
//     };
// };
// export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => {
//     return {
//         type: GET_CAPTCHA_URL_SUCCESS,
//         payload: {captchaUrl}
//     };
// };

// СТАЛИ actions
export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
        {type: SET_USER_DATA, payload: { id, email, login, isAuth}} as const
    ),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}} as const)
};

// БЫЛИ PayloadType - теперь не нужны (прописаны в объекте actions)
// type setAuthUserDataActionPayloadType = {
//     id: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean
// };

// type setAuthUserDataActionType = {
//     type: typeof SET_USER_DATA,
//     payload: setAuthUserDataActionPayloadType
// };

// type getCaptchaUrlSuccessActionType = {
//     type: typeof GET_CAPTCHA_URL_SUCCESS,
//     payload: { captchaUrl: string }    // прописав тип прямо здесь, сократили код - не надо создавать отдельный тип объекта
// };


export const getAuthUserDataInfoThunkCreator = (): ThunkType => {
    return (dispatch) => {
        return authAPI.getMe()
            .then(data => {
                if (data.resultCode === ResultCodeEnum.Success) {
                    let { id, email, login } = data.data;
                    dispatch(actions.setAuthUserData(id, email, login, true));
                };
            });
    };
};

export const loginThC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {    // не доделал типизацию
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserDataInfoThunkCreator())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrlThC());
        };
        const message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }));
    };
};

export const logoutThC = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout();
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false)); 
    };
};

export const getCaptchaUrlThC = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
