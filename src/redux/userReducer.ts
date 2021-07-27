import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { APIResponseType, ResultCodeEnum } from '../api/api';
import { usersAPI } from '../api/usersApi';
import { UserType } from '../types/types';
import { AppStateType, InferActionsType } from './reduxStore';

const FOLLOW = 'sn/users/FOLLOW';
const UNFOLLOW = 'sn/users/UNFOLLOW';
const SET_USERS = 'sn/users/SET-USERS';
const SET_FILTER = 'sn/users/SET_FILTER';
const SET_CURRENT_PAGE = 'sn/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'sn/users/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'sn/users/TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'sn/users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    portionSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // массив с user id
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

export type InitialStateType = typeof initialState;

// тип для filter (для UsersSearchForm)
export type FilterType = typeof initialState.filter;

// делаем тип по типу объекта actions
type ActionsTypes  = InferActionsType<typeof actions>;


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    };
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    };
                    return u;
                })
            };
        case SET_USERS:
            return { ...state, users: action.users };
        case SET_FILTER:
            return {...state, filter: action.payload}
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage };
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching };
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        }
        default:
            return state;
    };
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

// ЕСТЬ ТАКОЙ ВАРИАНТ, но он более длинный
// type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType
//     | SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType;

// type FollowSuccessActionType = {
//     type: typeof FOLLOW,
//     userId: number
// };

// type UnfollowSuccessActionType = {
//     type: typeof UNFOLLOW,
//     userId: number
// };

// type SetUsersActionType = {
//     type: typeof SET_USERS,
//     users: Array<UserType>
// };

// type SetCurrentPageActionType = {
//     type: typeof SET_CURRENT_PAGE,
//     currentPage: number
// };

// type SetTotalUsersCountActionType = {
//     type: typeof SET_TOTAL_USERS_COUNT,
//     totalUsersCount: number
// };

// type ToggleIsFetchingActionType = {
//     type: typeof TOGGLE_IS_FETCHING,
//     isFetching: boolean
// };

// type ToggleFollowingProgressActionType = {
//     type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
//     isFetching: boolean,
//     userId: number
// };


// ДРУГОЙ ВАРИАНТ --- упаковываем все actions в объект
// для данного объекта (и объектов такого типа для всего проекта - для Actions) есть часть в файле reduxStore
export const actions = {
    followSuccess: (userId: number) => ({type: FOLLOW, userId} as const),
    unfollowSuccess: (userId: number) => ({type: UNFOLLOW, userId} as const),
    setUsers: (users: Array<UserType>) => ({type: SET_USERS, users} as const),
    setFilter: (filter: FilterType) => ({type: SET_FILTER, payload: filter} as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const)
};

// export const followSuccess = (userId: number): FollowSuccessActionType => {
//     return {
//         type: FOLLOW,
//         userId
//     };
// };

// export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => {
//     return {
//         type: UNFOLLOW,
//         userId
//     };
// };

// export const setUsers = (users: Array<UserType>): SetUsersActionType => {
//     return {
//         type: SET_USERS,
//         users
//     };
// };

// export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => {
//     return {
//         type: SET_CURRENT_PAGE,
//         currentPage
//     };
// };

// export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => {
//     return {
//         type: SET_TOTAL_USERS_COUNT,
//         totalUsersCount
//     };
// };

// export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => {
//     return {
//         type: TOGGLE_IS_FETCHING,
//         isFetching
//     };
// };

// export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => {
//     return {
//         type: TOGGLE_IS_FOLLOWING_PROGRESS,
//         isFetching,
//         userId
//     };
// };



// два варианта типизации thunk (в работе вариант с официального сайта redux)
// закомментирован еще один возможный вариант
export const getUsersThunkCreator = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch/*: Dispatch<ActionsTypes>*/, getState/*: () => AppStateType*/) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter));

        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    };
};

// export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkAction<void, AppStateType, unknown, ActionsTypes> => {
//     return (dispatch/*: Dispatch<ActionsTypes>*/, getState/*: () => AppStateType*/) => {
//         dispatch(toggleIsFetching(true));
//         dispatch(setCurrentPage(currentPage));
//         usersAPI.getUsers(currentPage, pageSize)
//             .then(data => {
//                 dispatch(toggleIsFetching(false));
//                 dispatch(setUsers(data.items));  
//                 dispatch(setTotalUsersCount(data.totalCount));
//             });
//     };
// };


const _followUnfollow = async (
    dispatch: 
        Dispatch<ActionsTypes>, 
        userId: number, 
        apiMethod: (userId: number) => Promise<APIResponseType>, 
        actionCreator: (userId: number) => ActionsTypes/*FollowSuccessActionType | UnfollowSuccessActionType*/
) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    const data = await apiMethod(userId);

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    };
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const followThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollow(dispatch, userId, usersAPI.followUser.bind(usersAPI), actions.followSuccess);
    };
};

export const unfollowThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), actions.unfollowSuccess);
    };
};

export default usersReducer;
