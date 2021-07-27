import { FC } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { ProfileType } from '../../../../types/types';
import { createField, GetStringType, Input, Textarea } from '../../../Common/FormsControls/FormsControls';

import s from './ProfileData.module.css';

type PropsType = {
    profile: ProfileType
};

type ProfileTypeKeys = GetStringType<ProfileType>;

const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ error, handleSubmit, profile }) => {
    return (
        <form
            className={s.user_info}
            onSubmit={handleSubmit}>
            <div className={s.userLogin}>
                Name:
                {createField('Full name', 'fullName', [], Input)}
            </div>
            <button className={s.form_button}>Save</button>
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div className={s.user_info_text}>
                About me:
                <div className={s.user_info_text_label}>
                    <p>Looking for a job: <span>{createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, { type: 'checkbox' })}</span></p>
                </div>
                <div className={s.user_info_text_label}>
                    <p>My professional skills: <span>{createField<ProfileTypeKeys>('My professional skills', 'lookingForAJobDescription', [], Textarea)}</span></p>
                </div>
                <p>Contacts: {Object.keys(profile.contacts).map(key => {
                    return (
                        <div
                            key={key}
                            className={s.user_info_text_label}>
                            <p>{key}: <span>{createField(key, 'contacts.' + key, [], Input)}</span></p>
                        </div>
                    )
                })}</p>
            </div>
        </form>
    );
};

// createField - специальная функция-шаблон для форм, которую создали в FromsControlls

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
    form: 'edit-profile'
})(ProfileDataForm);

export default ProfileDataFormReduxForm;
