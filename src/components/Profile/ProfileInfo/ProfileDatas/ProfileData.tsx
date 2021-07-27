import { FC } from 'react';
import { ContactsType, ProfileType } from '../../../../types/types';
import s from './ProfileData.module.css';

// Object.keys для объекта - как map для массива - ключами станут названия классов объекта

type PropsType = {
    profile: ProfileType, 
    isOwner: boolean, 
    goToEditMode: () => void
};

const ProfileData: FC<PropsType> = ({ profile, isOwner, goToEditMode }) => {
    //{props.isOwner && <button>edit</button>} - если owner, тогда можно редактировать, только тогда отобрадается button
    return (
        <div className={s.user_info}>
            <div className={s.userLogin}>
                Name: {profile.fullName}
            </div>
            {isOwner && <button onClick={goToEditMode} className={s.form_button}>edit</button>}
            <div className={s.user_info_text}>
                <div className={s.user_info_text_label}>
                    <p>Looking for a job: <span>{profile.lookingForAJob ? 'Yes' : 'No'}</span></p>
                </div>
                {profile.lookingForAJob &&
                    <div className={s.user_info_text_label}>
                        <p>My professional skills: <span>{profile.lookingForAJobDescription}</span></p>
                    </div>
                }
                <div className={s.contacts_block}>
                    Contacts: {Object
                        .keys(profile.contacts)
                        .map(key => {
                        return <Contact
                            key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[key as keyof ContactsType]} />
                    })}</div>
            </div>
        </div>
    );
};


type ContactsPropsType = {
    contactTitle: string, 
    contactValue: string
};

const Contact: FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return (
        <div className={s.user_info_text_label}>
            <p>{contactTitle}: <span>{contactValue}</span></p>
        </div>
    );
};

export default ProfileData;
