import { FC } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { createField, Textarea } from '../../Common/FormsControls/FormsControls';
import { NewMessageFormType } from '../Dialogs';

import s from './AddMessageForm.module.css';

const maxLength30 = maxLengthCreator(30);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>;
type PropsType = {};

const AddMessageForm: FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = ({ handleSubmit }) => {
    return (
        <form 
            className={s.dialogForm} 
            onSubmit={handleSubmit}>
            {createField<NewMessageFormValuesKeysType>('Write new message', 'newMessageBody', [required, maxLength30], Textarea)}
            {/* <Field
                name='newMessageBody'
                component={Textarea}
                placeholder='Write new message'
                validate={[required, maxLength30]}
                className={s.textarea}
            /> */}
            <button className={s.message_button}>Send</button>
        </form>
    );
};

export const DialogsReduxForm = reduxForm<NewMessageFormType>({
    form: 'dialogsAddMessageForm'
})(AddMessageForm);
