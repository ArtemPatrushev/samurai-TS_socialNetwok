import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'redux';
import { 
    getUserProfileThunkCreator, 
    getStatusThC, updateStatusThC, 
    savePhotoThC, saveProfileThC 
} from '../../redux/profileReducer';
import { AppStateType } from '../../redux/reduxStore';
import { ProfileType } from '../../types/types';
import Profile from './Profile';

// mapStateToProps не надо делать через ReturnType, делать в ручную
// можно импортировать из компоненты, которую контейнер рендерит
type MapStatePropsType = {
    profile: ProfileType | null
    status: string,
    authorizedUserId: number,
    isAuth: boolean
};

type MapDispatchPropsType = {
    getUserProfileThunkCreator: (userId: number) => void, 
    getStatusThC: (userId: number) => void, 
    updateStatusThC: (status: string) => void, 
    savePhotoThC: (file: File) => void, 
    saveProfileThC: (profileData: ProfileType) => Promise<any>
};

// так типизируем withRouter (match/params, history)
//RouteComponentProps<PathParamsType>;
type PathParamsType = {
    userId: string
};

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        // здесь приходит строка и мы ее преобразуем
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            };
        };
        // проверяем, пришел ли userId
        if (!userId) {
            console.error('Id shoukd exist in URI params or in state (authorizedUserId)');
        } else {
            this.props.getUserProfileThunkCreator(userId);
            this.props.getStatusThC(userId);
        }
    };

    componentDidMount() {
        this.refreshProfile();
    };

    componentDidUpdate(prevProps: PropsType, prevState: PropsType /*snapShot*/) {
        // если настоящий userId не равен предыдущему, то вызывается метод refreshProfile() - без такого условия получится бесконечный цикл
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        };
    };
    
    render () {
        return <Profile 
                    {...this.props} 
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile} 
                    status={this.props.status} 
                    updateStatusThC={this.props.updateStatusThC} 
                    savePhotoThC={this.props.savePhotoThC} />
    };
};

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
});

// React.ComponentType - здесь, потому что в App мы в ProfileContainer ничего не закидываем
// compose используется только если после connect через запятую передаем в компоненту еще что-то ---  в данном случае withRouter
export default compose<React.ComponentType>(
    connect(mapStateToProps, { 
        getUserProfileThunkCreator, 
        getStatusThC, 
        updateStatusThC, 
        savePhotoThC, 
        saveProfileThC 
    }),
    withRouter,
)(ProfileContainer);
