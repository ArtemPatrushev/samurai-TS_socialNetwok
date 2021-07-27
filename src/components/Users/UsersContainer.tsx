import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator,
    FilterType
} from '../../redux/userReducer';
import {
    getPageSize,
    getUsers,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress,
    getUsersFilter
} from '../../redux/usersSelectors';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    portionSize: number,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    filter: FilterType
};

type MapDispatchPropsType = {
    followThunkCreator: (userId: number) => void,
    unfollowThunkCreator: (userId: number) => void,
    getUsersThunkCreator: (currentPage: number, pageSize: number, filter: FilterType) => void
};

// собственные props, прокинутые вручную
type OwnPropsType = {
    pageTitle: string
};

// объединяем все типы в PropsType
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize, this.props.filter); 
    };

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize, this.props.filter);
    };

    onFilterChanged = (filter: FilterType) => {
        // здесь currentPage - потому что нужно сбрасывать страницу на 1 (часто поиск происходит не с первой страницы, 
        // а с 6, например, поэтому нам надо сбрасить текущую страницу и показать отфильтрованный материал с 1ой)
        this.props.getUsersThunkCreator(/*this.props.currentPage*/1, this.props.pageSize, filter);
    };

    render() {
        return (
            <>
                <h2>{this.props.pageTitle}</h2>
                {this.props.isFetching 
                    ? <Preloader />
                    : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    portionSize={this.props.portionSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    followingInProgress={this.props.followingInProgress}
                    followThunkCreator={this.props.followThunkCreator}
                    unfollowThunkCreator={this.props.unfollowThunkCreator}
                    onFilterChanged={this.onFilterChanged} />
            </>
        );
    };
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state),
        portionSize: state.usersPage.portionSize
    };
};

// кликаем + ctrl на connect --- откроется консоль с подсказками, где будут указаны дженерики (что можно применить к connect для контроля и типизации)
// получаем: <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
// TStateProps - это наш MapStatePropsType, TDispatchProps - MapDispatchPropsType, TOwnProps - OwnPropsType, State - AppStateType
// применяем
// можно не использовать compose, тк нет после connect через запятую после скобок ничего не передается
export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        getUsersThunkCreator,
        followThunkCreator,
        unfollowThunkCreator
    }),
)(UsersContainer);

// export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
//     getUsersThunkCreator,
//     followThunkCreator,
//     unfollowThunkCreator
// })(UsersContainer);
