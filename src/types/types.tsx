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
type BaseField = {
  id: string;
  label: string;
  required?: boolean;
  type: SupportedFieldTypes,
  validate?: (value: any) => ErrorMessage;
};

export type TextField = BaseField & {
  type: "text";
  value?: string;
  minLength?: number;
  maxLength?: number;
};

export type NumberField = BaseField & {
  type: "number";
  value?: number;
  min?: number;
  max?: number;
};

export type SelectField = BaseField & {
  type: "select";
  value?: string | string[];
  options: string[];
};

export type CheckboxField = BaseField & {
  type: "checkbox";
  value?: boolean;
};

export type RadioField = BaseField & {
  type: "radio";
  value?: string;
  options: string[];
};

export type FileField = BaseField & {
  type: "file";
  value?: string;
};

export type DateField = BaseField & {
  type: "date";
  value?: string;
  min?: string;
  max?: string;
};

export type FieldConfig = 
  | TextField 
  | NumberField 
  | SelectField 
  | CheckboxField
  | RadioField
  | FileField
  | DateField;

export type FormConfig = FieldConfig[];

export type SupportedValueTypes = FieldConfig["value"];

export type Errors<Values> = {
  [K in keyof Values]: string | null;
};

export type Fields<Values> = {
  [K in keyof Values]: string | null;
};

export type ErrorMessage = string | null;