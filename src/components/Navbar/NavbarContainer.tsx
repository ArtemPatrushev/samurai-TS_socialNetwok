import { connect } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';
import { SidebarFriendsType, SidebarMenuType } from '../../types/types';
import Navbar from "./Navbar";

export type MapStatePropsType = {
    sidebarMenu: Array<SidebarMenuType>,
    sidebarFriends: Array<SidebarFriendsType>
};

const NavbarContainer = (props: MapStatePropsType) => {
    return (
        <Navbar {...props} />
    )
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    sidebarMenu: state.sidebar.sidebarMenu,
    sidebarFriends: state.sidebar.sidebarFriends
});

export default connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps)(NavbarContainer);