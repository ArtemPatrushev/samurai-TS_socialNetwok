import { FC } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Textarea } from '../../../Common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../../../utils/validators/validators';

import s from '../../My_posts/MyPosts.module.css';

const maxLength = maxLengthCreator(50);

type PropsType = {
};

export type AddPostFormValuesType = {
    newPostBody: string
};

// type AddPostFormValuesTypeKeys = GetStringType<AddPostFormValuesType>;  

const AddPostsForm: FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className={s.post_form}>
                {/* {createField<AddPostFormValuesTypeKeys>('Your post', 'newPostBody', [required, maxLengthCreator(50)], Textarea)} */}
                <Field className={s.textarea} component={Textarea} name={'newPostBody'} placeholder={'Your news'} validate={[required, maxLength]} /> 
            <button className={s.postButton}>Add post</button>
        </form>
    );
};

export const PostReduxForm = reduxForm<AddPostFormValuesType, PropsType>({
    form: 'profileAddPostForm'
})(AddPostsForm);