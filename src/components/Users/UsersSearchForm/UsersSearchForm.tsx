import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType } from "../../../redux/userReducer";

// эта часть была раньше прям в коде формика (если не вытаскивать, то не надо типизировать)
const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
};

type PropsType = {
    onFilterChanged: (filter: FilterType) => void;
}

// здесь пришлось создать свой тип, а не использовать подобный тип из reducer, 
// потому что формик передает типы как строки - friend: 'true' | 'false' | 'null' (это из option у Field)
type FormType = {
    term: string,
    friend: 'true' | 'false' | 'null'
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    // эта часть была раньше прям в коде формика (если не вытаскивать, то не надо типизировать)
    const submit = (values: /*FilterType*/FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        } 

        props.onFilterChanged(/*values*/filter);
        // formik автоматически ставит на кнопку disabled после запроса, мы отменяем
        setSubmitting(false);
    };

    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: 'null' }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
});

export default UsersSearchForm;