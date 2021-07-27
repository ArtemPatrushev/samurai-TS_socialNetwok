import { FC } from 'react';
import { UserType } from '../../types/types';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import UsersSearchForm from './UsersSearchForm/UsersSearchForm';

import s from './Users.module.css';
import { FilterType } from '../../redux/userReducer';

type PropsType = {
    users: Array<UserType>,
    totalUsersCount: number,
    pageSize: number,
    portionSize: number,
    onPageChanged: (pageNumber: number) => void,
    currentPage: number,
    followingInProgress: Array<number>,
    unfollowThunkCreator: (userId: number) => void,
    followThunkCreator: (userId: number) => void,
    onFilterChanged: (filter: FilterType) => void
};

const Users: FC<PropsType> = ({ 
    users, 
    totalUsersCount, 
    pageSize, 
    portionSize, 
    onPageChanged, 
    currentPage, 
    followingInProgress, 
    unfollowThunkCreator, 
    followThunkCreator ,
    onFilterChanged
}) => {

    return (
        <div className={s.usersTop}>
            <div>
            <Paginator 
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                portionSize={portionSize}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
            />
            {users.map(u => <User 
                key={u.id} 
                user={u} 
                followingInProgress={followingInProgress} 
                unfollowThunkCreator={unfollowThunkCreator}
                followThunkCreator={followThunkCreator}
            />)}
            </div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
        </div>
    );
};

export default Users;
