import { FC } from 'react';
import s from './../Dialogs.module.css';

type PropsType = {
    message: string
};

const Message: FC<PropsType> = ({ message }) => {
    console.log(message);
    return (
        <div className={s.user_message}>
            {message}
        </div>
    );
};

export default Message;
