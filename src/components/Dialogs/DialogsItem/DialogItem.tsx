import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import s from './../Dialogs.module.css';

type PropsType = {
    id: number,
    name: string
}

const DialogItem: FC<PropsType> = ({ id, name }) => {
    let path = '/dialogs/' + id;
    
    return (
        <div className={s.dialogs_users_name}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    );
};

export default DialogItem;
