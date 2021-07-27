import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/images/user.png';
import { UserType } from '../../types/types';

import s from './Users.module.css';

type PropsType = {
    user: UserType,
    followingInProgress: Array<number>,
    unfollowThunkCreator: (userId: number) => void,
    followThunkCreator: (userId: number) => void
};

const User: FC<PropsType> = ({ user, followingInProgress, unfollowThunkCreator, followThunkCreator }) => {
    return (
        <div>
            <div className={s.usersBlock}>
                <div className={s.userItem}>
                    <div className={s.usersPhoto}>
                        <NavLink to={'/profile/' + user.id}>
                            <img className={s.userPhoto} src={user.photos.small != null ? user.photos.small : userPhoto} alt='img' />
                        </NavLink>
                        {user.followed 
                            ?   <button className={s.requestButton} disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    unfollowThunkCreator(user.id);

                                }}>Unfollow</button>
                            : <button className={s.requestButton} disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                followThunkCreator(user.id);

                                }}>Follow</button>}
                    </div>
                    <div className={s.userInfo}>
                        <div className={s.aboutUser}>
                            <p className={s.userName}>{user.name}</p>
                            <div className={s.userLocation}>
                                <p>{/*u.location.country*/}</p>
                                <p>{/*u.location.city*/}</p>
                            </div>
                        </div>
                        <div className={s.userStatus}>
                            <p>{user.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
