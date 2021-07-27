import { instance, APIResponseType, ResultCodeEnum, ResultCodeForCaptcha } from "./api";

// БЫЛО без ResponseType (общий тип) - в api.ts
// type MeResponseType = {
//     data: {
//         id: number, 
//         email: string, 
//         login: string 
//     },    // внутри типа создали тип data
//     resultCode: ResultCodeEnum,
//     messages: Array<string>
// };

// СТАЛО
type MeResponseDataType = {
    id: number, 
    email: string, 
    login: string 
};

// БЫЛО без ResponseType (общий тип)
// type LoginResponseType = {
//     data: {
//         userId: number,
//     },    // внутри типа создали тип data
//     resultCode: ResultCodeEnum | ResultCodeForCaptcha,
//     messages: Array<string>
// };

// СТАЛО
type LoginResponseDataType = {
    userId: number,
};



type LogoutResponseType = {
    data: {},
    resultCode: ResultCodeEnum,
    messages: Array<string>
};



export const authAPI = {
    getMe() {
        return instance.get</*MeResponseType*/APIResponseType<MeResponseDataType>>(`auth/me`)
            .then(response => {
                return response.data;
            });
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha})
            .then(response => {
                return response.data;
            });
    },

    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`)
            .then(response => {
                return response.data;
            });
    },
};
