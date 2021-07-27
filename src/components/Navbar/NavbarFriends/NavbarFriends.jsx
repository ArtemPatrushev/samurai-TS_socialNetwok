import s from './../Navbar.module.css';

const NavbarFriends = (props) => {
    return (
        <div className={s.friendItem}>
            <div className={s.friendPhoto}></div>
            <p>{props.name}</p>
        </div>
    );
};

export default NavbarFriends;
