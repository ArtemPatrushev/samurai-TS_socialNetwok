import { FC } from 'react';
import { connect } from 'react-redux';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import { Redirect } from 'react-router';
import { required, maxLengthCreator } from '../../utils/validators/validators';
import { createField, GetStringType, Input } from '../Common/FormsControls/FormsControls';
import { loginThC, logoutThC } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/reduxStore';

import s from './Login.module.css';


const maxLength40 = maxLengthCreator(40);

type LoginFormOwnProps = {
    captchaUrl: string | null
};

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, captchaUrl, error }) => {
    return (
        <form 
            action="#" 
            className={s.form} 
            // handleSubmit - вызывается из LoginReduxForm, а в нем (handleSubmit) вызывается onSubmit (<LoginReduxForm onSubmit={onSubmit} />), который вызывает нашу функцию сonst onSubmit()
            onSubmit={handleSubmit}>
            {/* <input placeholder='Login' /> */}
            <Field 
                component={Input} 
                validate={[required, maxLength40]}
                placeholder='Email' 
                name={'email'} />
            {/* <input placeholder='Password' /> */}
            <Field 
                component={Input} 
                validate={[required, maxLength40]}
                placeholder='Password' 
                name={'password'}
                type={'password'} />
            {/* <input type="checkbox" /> Remember me */}
            <Field 
                component={Input}
                type="checkbox" 
                name={'rememberMe'} 
                /> Remember me
            
            {captchaUrl && <img src={captchaUrl} alt='img' />}
            {captchaUrl && createField<LoginFormValuesTypeKeys>('Simbols from image', 'captcha', [required], Input, {})}

            {/* если есть ошибка, показываем div */}
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <button>Login</button>
        </form>
    )
}
//<Field component={'input'} placeholder='Login' /> --- спец компонента из redux-from вместо input

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm);

type MapStateToPropsType = {
    isAuth: boolean,
    captchaUrl: string | null
};

type MapDispatchToPropsType = {
    loginThC: (email: string, password: string, rememberMe: boolean, captcha: string) => void
};

// этот тип нужен для компоненты LoginForm: FC<InjectedFormProps<LoginFormValuesType>>
// InjectedFormProps - встроенная от redux form, в нее добавляем наши данные, которые собираем через формы - LoginFormValuesType
type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
};

// LoginFormValuesTypeKeys - хранит в себе названия классов из LoginFormValuesType - ключи
// Extract<keyof LoginFormValuesType, string> - при помощи Extract из keyof LoginFormValuesType выбрать только те, что соответствуют string
type LoginFormValuesTypeKeys = GetStringType<LoginFormValuesType>;

const Login: FC<MapStateToPropsType & MapDispatchToPropsType> = ({ loginThC, isAuth, captchaUrl }) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        let { email, password, rememberMe, captcha } = formData;
        loginThC(email, password, rememberMe, captcha);
    };

    if (isAuth) {
        return <Redirect to='/profile' />
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, { loginThC, logoutThC })(Login);
