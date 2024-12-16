import { useCallback, useState } from "react";
import { 
  type FormConfig, 
  type ErrorMessage,
  type FormStateErrors,
  type FormBuilderReturnType,
  type FormStateFields,
} from "../types/types";
import { getInitialFields, getInitialErrors } from '../utils/utils';


type FormState<T> = {
  fields: FormStateFields<T>,
  errors: FormStateErrors<T>,
  isValid: boolean;
};

export const useFormBuilder = <T extends object>(config: FormConfig<T>): FormBuilderReturnType<T> => {

  const initialState: FormState<T> = {
    fields: getInitialFields<T>(config),
    errors: getInitialErrors<T>(config),
    isValid: false
  };

  const [formState, setFormState] = useState<FormState<T>>(initialState);

  const setFieldValue = useCallback(<K extends keyof T>(id: K, value: T[K]) => {
    if (id in formState.fields) {
      setFormState((prevState) => {
        const newFieldState = { ...prevState.fields[id], ...{value: value} };
        const newFormState = {
          ...prevState,
          fields: {
            ...prevState.fields,
            [id]: newFieldState,
          }
        }
        return newFormState;
      });
    }
  }, [formState]);

  const validateField = useCallback((id: string): ErrorMessage => {
    try {
      const field = config.find((f) => f.id === id);
      if (!field) {
        throw new Error(`A field with id ${id} doesn't exists`);
      }

      const value = formState.fields[id as keyof T]?.value;
      if(value === undefined) {
        throw new Error(`Field with this id doesn't exist in form state object`);
      }

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
      } else if(field.type === "date") {
        if (field.min !== undefined && value < field.min) {
          return `Value must be at least ${field.min}.`;
        }
        if (field.max !== undefined && value > field.max) {
          return `Value must not exceed ${field.max}.`;
        }
      }

      if(field.validate) {
        return (field.validate(value));
      }
    } catch(error) {
      console.error(`Validation Error for field with id "${id}":`, error);
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

