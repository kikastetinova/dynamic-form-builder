export type SupportedFieldTypes = 'text' | 'select' | 'number' | 'checkbox' | 'radio' | 'file' | 'date';

// export type FieldTypeValueMap = {
//   text: string;
//   select: string;
//   number: number;
//   checkbox: boolean;
//   radio: string;
//   date: string;
// };

export type FieldConfigObject = {
  value: SupportedValueTypes
};

export type FormStateItem<T, K> = {
  [key in keyof T]: K
};

export type FormStateFields<T> = FormStateItem<T, FieldConfigObject>;
export type FormStateErrors<T> = FormStateItem<T, ErrorMessage>;

export type FormBuilderReturnType<T> = {
  setFieldValue: <K extends keyof T>(id: K, value: T[K]) => void;
  validateField: (id: string) => ErrorMessage;
  validateForm: () => Record<string, ErrorMessage>;
  formState: {
    fields: FormStateFields<T>,
    errors:  FormStateErrors<T>,
    isValid: boolean;
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
type BaseField<Values> = {
  id: keyof Values;
  label: string;
  required?: boolean;
  type: SupportedFieldTypes,
  validate?: (value: any) => ErrorMessage;
};

export type TextField<Values> = BaseField<Values> & {
  type: "text";
  value?: string;
  minLength?: number;
  maxLength?: number;
};

export type NumberField<Values> = BaseField<Values> & {
  type: "number";
  value?: number;
  min?: number;
  max?: number;
};

export type SelectField<Values> = BaseField<Values> & {
  type: "select";
  value?: string | string[];
  options: string[];
};

export type CheckboxField<Values> = BaseField<Values> & {
  type: "checkbox";
  value?: boolean;
};

export type RadioField<Values> = BaseField<Values> & {
  type: "radio";
  value?: string;
  options: string[];
};

export type FileField<Values> = BaseField<Values> & {
  type: "file";
  value?: string;
};

export type DateField<Values> = BaseField<Values> & {
  type: "date";
  value?: string;
  min?: string;
  max?: string;
};

export type FieldConfig<Values> = 
  | TextField<Values> 
  | NumberField<Values> 
  | SelectField <Values>
  | CheckboxField<Values>
  | RadioField<Values>
  | FileField<Values>
  | DateField<Values>;

export type FormConfig<Values> = FieldConfig<Values>[];

export type SupportedValueTypes = FieldConfig<any>["value"];

export type Errors<Values> = {
  [K in keyof Values]: string | null;
};

export type Fields<Values> = {
  [K in keyof Values]: string | null;
};

export type ErrorMessage = string | null;