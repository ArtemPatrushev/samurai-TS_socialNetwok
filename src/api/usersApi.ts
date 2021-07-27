import { UserType } from "../types/types";
import { instance, APIResponseType } from "./api";

type GetUsersResponseType = {
    items: Array<UserType>,
    totalCount: number,
    error: boolean | string
};

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10, term: string= '', friend: null | boolean = null) {
        // (friend === null ? '' : `&friend=${friend} ---  если null, то ничего не добавляем, в противном случае ищем - &friend=${friend}
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => {
                return response.data;
            });
    },

    followUser(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`, {})
            .then(response => {
                return response.data;
            });
    },

    unfollowUser(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    // getUserProfile(userId: number) {
    //     console.warn('Obsolete method. Please use profileAPI object');
    //     return profileAPI.getUserProfile(userId);
    // }
};
