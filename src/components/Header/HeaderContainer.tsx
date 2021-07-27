import { FC } from 'react';
import { connect } from 'react-redux';
import { logoutThC } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/reduxStore';
import Header from './Header';

type MapStatePropsType = {
    isAuth: boolean,
    login: string | null
};

type MapDispatchPropsType = {
    logoutThC: () => void;
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const HeaderContainer: FC<PropsType> = (props) => {
    return <Header {...props} />
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { logoutThC })(HeaderContainer);
