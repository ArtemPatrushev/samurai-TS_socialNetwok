import axios from 'axios';

// то что в <> - называется дженерик
// D = {} - присвоили тип объекта 
// RC = ResultCodeEnum - присвоили тип ResultCodeEnum
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
};

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'bfde39ec-0342-476f-8e4a-fc0500a9ecc7'
    }
});

// в enum прописываем возможные result коды запроса API (также используется в auth-reducer)
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
};

// экспортируется в reducer, где есть в реультате каптча
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
};
