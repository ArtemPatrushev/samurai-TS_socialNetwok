import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import s from './Header.module.css';

type PropsType = {
    isAuth: boolean, 
    login: string | null,
    logoutThC: () => void
};

const Header: FC<PropsType> = ({ logoutThC, isAuth, login }) => {
    let Logout = () => {
        logoutThC();
    }

    return <header className={s.header}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Wikimedia_Community_Logo_optimized_%28white%29.svg/1200px-Wikimedia_Community_Logo_optimized_%28white%29.svg.png' alt='img' />
        <div className={s.loginBlock}>
            {isAuth 
                ? <div className={s.login}>{login}<button className={s.logoutBtn} onClick={Logout}>Log out</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
            <img src='https://pyxis.nymag.com/v1/imgs/e9a/025/22556a8254656cfc6be215d2e8ef405015-ted-lasso.rsquare.w700.jpg' alt='img' />
        </div>
    </header>;
};

export default Header;
