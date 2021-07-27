import { useState, FC, ChangeEvent } from 'react';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDatas/ProfileDataForm';
import ProfileData from './ProfileDatas/ProfileData';
import { ProfileType } from '../../../types/types';
import userPhoto from '../../../assets/images/user.png';

import s from './ProfileInfo.module.css';

type PropsType = {
    profile: ProfileType | null, 
    savePhotoThC: (file: File) => void,
    // возвращает Promise<any>, потому что ниже при использовании делаем then
    saveProfileThC: (profileData: ProfileType) => Promise<any>, 
    isOwner: boolean, 
    status: string, 
    updateStatusThC: (status: string) => void
}

const ProfileInfo: FC<PropsType> = ({ profile, savePhotoThC, saveProfileThC, isOwner, status, updateStatusThC }) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    };

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        // e.target.files?.length --- если есть, покажи длину
        if (e.target.files?.length) {
            savePhotoThC(e.target.files[0]);
        };
    };

    const onSubmit = (formData: ProfileType) => {
        // здесь then --- в PropsType saveProfileThC возвращает Promise<any>
        saveProfileThC(formData).then(() => {
            // после обновления информации выключаем режим редактирования + если нет ошибки
            setEditMode(false);
        });
    };

    return (
        <div>
            <div className={s.user}>
                <div className={s.userPhotoBlock}>
                    <img className={s.user_photo} src={profile.photos.large || userPhoto} alt="img" />
                    {isOwner && <input type='file' onChange={onMainPhotoSelected} />}
                    <ProfileStatusWithHooks
                        status={status}
                        updateStatusThC={updateStatusThC} />
                </div>
                {editMode
                    ? <ProfileDataForm
                        initialValues={profile}
                        profile={profile}
                        onSubmit={onSubmit} />
                    : <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        goToEditMode={() => setEditMode(true)} />}
            </div>
        </div>
    );
};

// initialValues={props.profile} - при использовании redux-from это позволяет заполнять открытые для редактирования инпуты тему значениями, которые в них уж сохранены

export default ProfileInfo;
