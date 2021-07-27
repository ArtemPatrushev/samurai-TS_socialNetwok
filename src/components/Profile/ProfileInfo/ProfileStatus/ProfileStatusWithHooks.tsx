import { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';

import s from './ProfileStatus.module.css';

type PropsType = {
    status: string, 
    updateStatusThC: (status: string) => void
};

const ProfileStatusWithHooks: FC<PropsType> = ({ status, updateStatusThC }) => {

    let [editMode, setEditMode] = useState(false);
    let [statusText, setStatus] = useState(status);
    
    useEffect(() => {
        setStatus(status);
    }, [statusText]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deActivateEditMode = () => {
        setEditMode(false);
        updateStatusThC(status);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div className={s.statusWrapper}>
            <p className={s.status_header}>Status:</p>
            {editMode
                ? <input 
                    className={s.userInput}
                    type="text"
                    autoFocus
                    value={status}
                    onBlur={deActivateEditMode}
                    onChange={onStatusChange} />
                : <span className={s.userStatus} onDoubleClick={activateEditMode}>{status || 'Enter your status'}</span>}
            <p className={s.inputSubtitle}>Double click to change your status</p>
        </div>
    );
};

export default ProfileStatusWithHooks;
