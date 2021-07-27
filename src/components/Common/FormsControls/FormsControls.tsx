import { FC } from 'react';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { FieldValidatorType } from '../../../utils/validators/validators';

import s from './FormsControls.module.css';

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
};

const FormControl: FC<FormControlPropsType> = ({ meta: {touched, error}, children}) => {
    const hasError = touched && error;

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div className={s.textField}>
                {children}
                {hasError && <span>{error}</span>}
            </div>
        </div>
    );
};

export const Textarea: FC<WrappedFieldProps> = (props) => {
    const { input, meta, children, ...restProps } = props;
    return <FormControl {...props}><textarea className={s.form} {...input} {...restProps} /></FormControl>
};

export const Input: FC<WrappedFieldProps> = (props) => {
    const { input, meta, children, ...restProps } = props;
    return <FormControl {...props}><input className={s.form} {...input} {...restProps} /></FormControl>
};


// FormKeysType extends string - некий дженерик (прочитать)
export function createField<FormKeysType extends string>( 
    placeholder: string | undefined, 
    name: FormKeysType,
    validators: Array<FieldValidatorType>, 
    component: FC<WrappedFieldProps>,
    props={}, 
    text=''
) {
    return <div>
        <Field
            placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div>
};

// используется в файлах с формами, например AddPostForm
export type GetStringType<T> = Extract<keyof T, string>;
