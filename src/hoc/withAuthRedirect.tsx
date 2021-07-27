import React from 'react';
import { FC } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { AppStateType } from '../redux/reduxStore';

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

type MapPropsType = {
    isAuth: boolean
};

// type DispatchPropsType = {
// };

// WCP - wrapped component props
export function withAuthRedirect<WCP>( WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: FC<MapPropsType> = (props) => {
        // забрали из props isAuth
        let {isAuth, ...restProps} = props;

        if (!isAuth) {
            return <Redirect to={'/login'} />
        };
        return <WrappedComponent {...restProps as unknown as WCP} />
    };

    let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
};
