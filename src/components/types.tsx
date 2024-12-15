export type FieldTypeValueMap = {
  text: string;
  select: string;
  number: number;
  checkbox: boolean;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
type BaseField<Values> = {
  id: keyof Values;
  label: string;
  required: boolean;
  type: keyof FieldTypeValueMap,
  validate?: (value: any) => ErrorMessage;
};

export type TextField<Values> = BaseField<Values> & {
  type: "text";
  minLength?: number;
  maxLength?: number;
};

export type NumberField<Values> = BaseField<Values> & {
  type: "number";
  min?: number;
  max?: number;
};

export type SelectField<Values> = BaseField<Values> & {
  type: "select";
  options: string[];
};

export type CheckboxField<Values> = BaseField<Values> & {
  type: "checkbox";
};

type FieldConfig<Values> = 
  | TextField<Values> 
  | NumberField<Values> 
  | SelectField <Values>
  | CheckboxField<Values>;


export type FormConfig<Values> = FieldConfig<Values>[];

export type Errors<Values> = {
  [K in keyof Values]: string | null;
};

export type Fields<Values> = {
  [K in keyof Values]: string | null;
};

export type ErrorMessage = string | null;