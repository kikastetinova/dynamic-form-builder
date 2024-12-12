import { useEffect, useState } from "react";
import { type FormConfig, type FieldTypeValueMap, type ErrorMessage } from "./types";

export type FormBuilderReturnType<T> = {
  setFieldValue: (id: string, fieldConfig: Partial<FieldConfigObject>) => void;
  validateField: (id: keyof T) => ErrorMessage;
  validateForm: () => Record<string, ErrorMessage>;
  fields: Record<keyof T, FieldConfigObject>;
  errors:  Record<keyof T, ErrorMessage>;
  isValid: boolean;
}
type FieldConfigObject = {
  checked?: boolean,
  value: FieldTypeValueMap[keyof FieldTypeValueMap]
};

export const useFormBuilder = <T extends object>(config: FormConfig<T>): FormBuilderReturnType<T> => {

  type FormStateFields = Record<keyof T, FieldConfigObject>;
  type FormStateErrors = Record<keyof T, ErrorMessage>;

  type FormState = {
    fields: FormStateFields,
    errors: FormStateErrors,
    isValid: boolean;
  };

  const getInitialFields = (config: FormConfig<T>): FormStateFields => {
    return config.reduce((state, field) => {
      const fieldType = field.type;
      const id = field.id;
      switch (field.type) {
        case "text":
          state[id] = {
            value: "",
          };
          break;
        case "select":
          state[id] = {
            value: field.options[0] ? field.options[0] : ""
          }
          break;
        case "number":
          state[id] = {
            value: 0,
          }
          break;
        case "checkbox":
          state[id] = {
            value: "",
            checked: false,
          };
          break;
        default:
          throw new Error(`Unknown field type: ${fieldType}`);
      }
      return state;
    }, {} as FormStateFields);
  };

  const initialErrors: FormStateErrors = config.reduce((acc, key) => {
    const id = key.id as keyof T;
    acc[id] = null;
    return acc;
  }, {} as Record<keyof T, string | null>);

  const initialValues = getInitialFields(config);

  const initialState: FormState = {
    fields: initialValues,
    errors: initialErrors,
    isValid: false
  };

  const [formState, setFormState] = useState<FormState>(initialState);

  const setFieldValue = (id: string, fieldConfig: Partial<FieldConfigObject>) => {
    if (id in formState.fields) {
      setFormState((prevState) => {
        const newFieldState = { ...prevState.fields[id as keyof T], ...fieldConfig };
        const newFormState = {
          ...prevState,
          fields: {
            ...prevState.fields,
            [id]: newFieldState
          }
        }
        return newFormState;
      });
    }
  };

  const validateField = (id: keyof T): ErrorMessage => {
    const field = config.find((f) => f.id === id);
    if (!field) {
      throw new Error(`Can't validate an unknown field with id ${id as string}`);
    }

    const value = formState.fields[id]?.value;

    if (field.required && ((typeof value === "string" && value === "") || value === undefined || value == null)) {
      return "This field is required.";
    }

    if (field.type === "text" && typeof value === "string") {
      if (field.minLength !== undefined && value.length < field.minLength) {
        return `Minimum length is ${field.minLength}.`;
      }
      if (field.maxLength !== undefined && value.length > field.maxLength) {
        return `Maximum length is ${field.maxLength}.`;
      }
    } else if (field.type === "number" && typeof value === "number") {
      if (field.min !== undefined && value < field.min) {
        return `Value must be at least ${field.min}.`;
      }
      if (field.max !== undefined && value > field.max) {
        return `Value must not exceed ${field.max}.`;
      }
    }

    if (field.validate) {
      return field.validate(value);
    }

    return null;
  };

  const validateForm = (): Record<string, ErrorMessage> => {
    const fields = formState.fields;
    const newErrors = Object.keys(fields).reduce((state, fieldID) => {
      const id = fieldID as keyof T;
      const fieldError = validateField(id);

      let isFormValid = true;
      if(fieldError == null) {
        isFormValid = false;
      }

      setFormState((prevState) => {
        const newFormState = {
          ...prevState,
          isValid: isFormValid,
          errors: {
            ...prevState.errors,
            [id]: fieldError
          }
        }
        return newFormState;
      });

      return state;
    }, {} as Record<string, ErrorMessage>);

    return newErrors;
  };


  return {
    ...formState,
    setFieldValue,
    validateField,
    validateForm
  };
}

