// типизация валидатора
export type FieldValidatorType = (value: string) => string | undefined;

// string | undefined - то, что функция возвращает
export const required: FieldValidatorType = (value) => {
    if (value) return undefined;
    return 'Field is required';
};

// (maxLength): FieldValidatorType - именно здесь вставляется FieldValidatorType, потму что данная функуия возвращает тип валидатора FieldValidatorType
export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
};
