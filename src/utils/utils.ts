import { 
  type FormConfig, 
  type FormStateFields,
  type FormStateErrors,
  type SupportedValueTypes,
  SupportedFieldTypes
} from "../types/types";

export const getDefaultValue = (type: SupportedFieldTypes, options?: string[]) => {
  const defaultValues: Record<SupportedFieldTypes, SupportedValueTypes> = {
    text: "",
    number: 0,
    select: options?.[0] || "",
    checkbox: false,
    radio: options?.[0] || "",
    file: "",
    date: new Date().toISOString().split("T")[0],
  };
  return defaultValues[type] ?? "";
};

export const getInitialFields = (config: FormConfig): FormStateFields =>
  config ? config.reduce((state, field) => {
    const options = (field.type =="select" || field.type =="radio") ? field.options : undefined;
    const id = field.id;
    state[id] = getDefaultValue(field.type, options);
    return state;
  }, {} as FormStateFields) : {} as FormStateFields;

export const getInitialErrors = (config: FormConfig):  FormStateErrors =>
  config ? config.reduce((state, field) => {
    const id = field.id;
    state[id] = null;
    return state;
  }, {} as FormStateErrors) : {} as FormStateErrors;