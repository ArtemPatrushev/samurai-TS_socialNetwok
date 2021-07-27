import { PhotosType, ProfileType } from "../types/types";
import { instance, APIResponseType } from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
};

export const profileAPI = {

    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status})
            .then(response => {
                return response.data;
            })
    },

    // File - dom элемент (просто вписываем)
    savePhoto(file: File) {
        // константа formData нужна для отправки файла на сервер
        const formData = new FormData();
        // добавляем файл со свойством image
        formData.append('image', file);

        return instance.put<APIResponseType<SavePhotoResponseDataType>>('profile/photo', formData, {
            // в headers указываем Content-Type
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },

    // не типизировал
    saveProfile(profileData: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profileData);
    }
};
