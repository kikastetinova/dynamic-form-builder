import { useCallback, useState } from "react";
import { 
  type FormConfig, 
  type FieldTypeValueMap, 
  type ErrorMessage,
} from "./types";


type FieldConfigObject = {
  value: FieldTypeValueMap[keyof FieldTypeValueMap]
};

type FormStateItem<T, K> = {
  [key in keyof T]: K
};

type FormStateFields<T> = FormStateItem<T, FieldConfigObject>;
type FormStateErrors<T> = FormStateItem<T, ErrorMessage>;

export type FormBuilderReturnType<T> = {
  setFieldValue: <K extends keyof T>(id: K, value: T[K]) => void;
  validateField: (id: string) => ErrorMessage;
  validateForm: () => Record<string, ErrorMessage>;
  formState: {
    fields: Record<keyof T, FieldConfigObject>;
    errors:  Record<keyof T, ErrorMessage>;
    isValid: boolean;
  }
}

export const useFormBuilder = <T extends object>(config: FormConfig<T>): FormBuilderReturnType<T> => {

  type FormState = {
    fields: FormStateFields<T>,
    errors: FormStateErrors<T>,
    isValid: boolean;
  };

  const getInitialFields = (config: FormConfig<T>): FormStateFields<T> => {
    return config.reduce((state, field) => {
      const fieldType = field.type;
      const id = field.id;
      switch (field.type) {
        case "text":
          state[id] = {
            value: "hey",
          };
          break;
        case "select":
          state[id] = {
            value: field.options?.[0] ? field.options[0] : ""
          }
          break;
        case "number":
          state[id] = {
            value: 1000,
          }
          break;
        case "checkbox":
          state[id] = {
            value: false,
          };
          break;
        default:
          console.error(`Unknown field type: ${fieldType}`);
      }
      return state;
    }, {} as FormStateFields<T>);
  };

  const initialErrors: FormStateErrors<T> = config.reduce((acc, key) => {
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

  const setFieldValue = useCallback(<K extends keyof T>(id: K, value: T[K]) => {
    if (id in formState.fields) {
      setFormState((prevState) => {
        const newFieldState = { ...prevState.fields[id], ...{value: value} };
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
  }, [formState]);

  const validateField = useCallback((id: string): ErrorMessage => {
    const field = config.find((f) => f.id === id);
    if (!field) {
      throw new Error(`Can't validate an unknown field with id ${id as string}`);
    }

    const value = formState.fields[id as keyof T]?.value;

    if (field.required && ((typeof value === "string" && value === "") || value === undefined || value == null)) {
      return "This field is required.";
    }

    if (field.type === "text") {
      if (typeof value === "string") {
        if (field.minLength !== undefined && value.length < field.minLength) {
          return `Minimum length is ${field.minLength}.`;
        }
        if (field.maxLength !== undefined && value.length > field.maxLength) {
          return `Maximum length is ${field.maxLength}.`;
        }
      } else {
        return "Invalid value type for a text field.";
      }
    } else if (field.type === "number") {
      const numericValue = typeof value === "number" ? value : parseFloat(value as string);
      if (field.min !== undefined && numericValue < field.min) {
        return `Value must be at least ${field.min}.`;
      }
      if (field.max !== undefined && numericValue > field.max) {
        return `Value must not exceed ${field.max}.`;
      }
    }

    if(field.validate) {
      return (field.validate(value));
    }

    return null;
  }, [config, formState]);

  const validateForm = useCallback((): Record<string, ErrorMessage> => {
    const fields = formState.fields;
    let isFormValid = true;

    const newErrors = Object.keys(fields).reduce((state, id) => {
      const fieldError = validateField(id);

      
      if(fieldError !== null) {
        isFormValid = false;
      }

      state[id as keyof T] = fieldError;

      return state;
    }, {} as Record<keyof T, ErrorMessage>);

    setFormState({
      ...formState,
      isValid: isFormValid,
      errors: newErrors
    });

    return newErrors;
  }, [formState, validateField]);


  return {
    formState,
    setFieldValue,
    validateField,
    validateForm
  };
}

