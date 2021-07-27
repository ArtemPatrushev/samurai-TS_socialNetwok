import { BaseThunkType, InferActionsType } from './reduxStore';
import { stopSubmit } from 'redux-form';
import { ResultCodeEnum } from '../api/api';
import { PostType, PhotosType, ProfileType } from '../types/types';
import { profileAPI } from '../api/profileApi';

const ADD_POST = 'sn/profile/ADD-POST';
const DELETE_POST = 'sn/profile/DELETE-POST'
const SET_USER_PROFILE = 'sn/profile/SET-USER-PROFILE';
const SET_STATUS = 'sn/profile/SET-STATUS';
const SAVE_PHOTO_SUCCESS = 'sn/profile/SAVE-PHOTO-SUCCESS';

const initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likeCount: 15 },
        { id: 2, message: "it's all good", likeCount: 12 },
        { id: 3, message: "bla-bla", likeCount: 5 },
        { id: 4, message: "da-da", likeCount: 7 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
    // newPostText: ''
};

export type initialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>; 

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = action.newPostBody;
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: newPost, likeCount: 0 }],
                //newPostText: ''
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state, 
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                // копируем profile, который был из state, но в photos вставляем новые фото из action
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }
        default:
            return state;
    };
};

// БЫЛО - actions с типизацией
// type AddPostActionType = {
//     type: typeof ADD_POST,
//     newPostBody: string
// }

// type DeletePostActionType = {
//     type: typeof DELETE_POST,
//     postId: number
// }

// type SetUserProfileActionType = {
//     type: typeof SET_USER_PROFILE,
//     profile: ProfileType
// }

// type SetStatusActionType = {
//     type: typeof SET_STATUS,
//     status: string
// }

// type SavePhotoSuccessActionType = {
//     type: typeof SAVE_PHOTO_SUCCESS,
//     photos: PhotosType
// }
// export const addPost = (newPostBody: string): AddPostActionType => {
//     return {
//         type: ADD_POST,
//         newPostBody
//     };
// };
// export const deletePost = (postId: number): DeletePostActionType => {
//     return {
//         type: DELETE_POST,
//         postId
//     };
// };
// export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => {
//     return {
//         type: SET_USER_PROFILE,
//         profile
//     };
// };
// export const setStatus = (status: string): SetStatusActionType => {
//     return {
//         type: SET_STATUS,
//         status
//     };
// };
// export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => {
//     return {
//         type: SAVE_PHOTO_SUCCESS,
//         photos
//     };
// };

// СТАЛО
export const actions = {
    addPost: (newPostBody: string) => ({type: ADD_POST, newPostBody} as const),
    deletePost: (postId: number) => ({type: DELETE_POST, postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
    setStatus: (status: string) => ({type: SET_STATUS, status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos} as const)
};


export const getUserProfileThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getUserProfile(userId);
        dispatch(actions.setUserProfile(data));
    };
};

// export const getStatusThC = (status: string) => {
//     return (dispatch: any) => {
//         profileAPI.getStatus(status)
//             .then(response => {
//                 dispatch(setStatus(response.data));
//             });
//     };
// };
export const getStatusThC = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getStatus(userId);
        dispatch(actions.setStatus(data));
    };
};

// export const updateStatusThC = (status: string) => {
//     return (dispatch: any) => {
//         profileAPI.updateStatus(status)
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     dispatch(setStatus(status));
//                 };
//             });
//     };
// };
export const updateStatusThC = (status: string): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setStatus(status));
        };
    };
};

// export const savePhotoThC = (file: any) => {
//     // получили фото
//     return (dispatch: any) => {
//         // отправляем его на api
//         profileAPI.savePhoto(file)
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     dispatch(savePhotoSuccess(response.data.data.photos));
//                 };
//             });
//     };
// };
export const savePhotoThC = (file: File): ThunkType => {
    // получили фото
    return async (dispatch) => {
        // отправляем его на api
        let data = await profileAPI.savePhoto(file);
        if (data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos));
        };
    };
};

// export const saveProfileThC = (profileData) => {
//     // получили фото
//     return (dispatch, getState) => {
//         const userId = getState().auth.id;
//         // отправляем его на api
//         profileAPI.saveProfile(profileData)
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     // после добавления информации через инпуты, вызываем обббновленный профиль, чтобы его отобразить
//                     dispatch(getUserProfileThunkCreator(userId));
//                 } else {
//                     dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] } /*{'contacts': {'facebook': response.data.messages[0]}}*/));
//                     // для ошибки
//                     debugger
//                     return Promise.reject(response.data.messages[0]);
//                 }
//             });
//     };
// };
export const saveProfileThC = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {   // не типизировал до конца
        const userId = getState().auth.id;
        const response = await profileAPI.saveProfile(profileData);

        if (response.data.resultCode === 0) {
            if (userId !== null) {
                dispatch(getUserProfileThunkCreator(userId));
            } else {
                throw new Error('userId can\'t be null');
            };
        } else {
            dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] } /*{'contacts': {'facebook': response.data.messages[0]}}*/));
            return Promise.reject(response.data.messages[0]);
        }
};

export default profileReducer;
