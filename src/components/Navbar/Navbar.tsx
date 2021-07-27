import { FC } from 'react';
import { SidebarFriendsType, SidebarMenuType } from '../../types/types';
import NavbarFriends from './NavbarFriends/NavbarFriends';
import NavbarItem from './NavbarItem/NavbarItem';

import s from './Navbar.module.css';

type PropsType = {
    sidebarMenu: SidebarMenuType[],
    sidebarFriends: SidebarFriendsType[]
}

const Navbar: FC<PropsType> = ({ sidebarMenu, sidebarFriends }) => {

    let navbarElements = sidebarMenu.map((n) => {
        return <NavbarItem key={n.id} path={n.path} name={n.name} />
    });

    let navbarFriends = sidebarFriends.map((f) => {
        return <NavbarFriends key={f.id} photo={f.photo} name={f.name} />
    });

    return (
        <nav className={s.nav}>
            <div className={s.menu}>
                {navbarElements}
            </div>
            <div className={s.friendsList}>
                {navbarFriends}
            </div>
        </nav>
    );
};

export default Navbar;
