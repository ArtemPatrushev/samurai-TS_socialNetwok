import { NavLink } from 'react-router-dom';

import s from './../Navbar.module.css';

const NavbarItem = (props) => {
    return (
        <NavLink to={props.path} className={s.navLink} activeClassName={s.active}>{props.name}</NavLink>
    );
};

export default NavbarItem;
