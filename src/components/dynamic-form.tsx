import { useCallback, useEffect } from "react";
import { 
  type FormConfig, 
  type FormBuilderReturnType,
  type NonUndefinedSupportedValueTypes
} from '../types/types';
import { FormField } from "./form-field";



type DynamicFormProps= {
  config: FormConfig;
  form: FormBuilderReturnType;
};

const DynamicForm = (props: DynamicFormProps)  => {
  const { config, form } = props;
  const { formState, setFieldValue, validateForm } = form;
  const { errors, isValid, fields } = formState;

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    validateForm();
  }, [validateForm]);

  useEffect(() => {
    if(isValid) {
      console.log('LOGGED STATE OF A VALID FORM: ', formState);
    }
  }, [isValid, formState]);


  const handleChange = useCallback((e:React.FormEvent) => {
    const target = e.target;

    if (
      target instanceof HTMLInputElement || 
      target instanceof HTMLSelectElement || 
      target instanceof HTMLTextAreaElement) {
      const eventTargetID = (target.name || target.id);
      let value: NonUndefinedSupportedValueTypes;

      if (target.type === "checkbox") {
        value = (target as HTMLInputElement).checked;
      } else if (target.type === "number") {
        value = (parseFloat(target.value) || 0);
      } else {
        value = target.value;
      }

      setFieldValue(eventTargetID, value);
    }
  }, [setFieldValue]);

  const formFields = config.map(formFieldConfig => {
    const { id, type, label } = formFieldConfig;
    
    const value = fields[id];
    const options = (type === "select" || type == "radio") ? formFieldConfig.options : undefined;
    const errorMessage = errors[id];

    return <FormField 
      value={value} 
      type={type} 
      id={id as string} 
      label={label}
      options={options}
      key={`form-field-${id as string}`} 
      errorMessage={errorMessage} 
    />
  });
  
  return (
    <form onSubmit={handleSubmit} onChange={handleChange} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {formFields}
      <button className="rounded bg-teal-400 px-3 py-2 disabled:bg-teal-200" type="submit" >Submit Form</button>
    </form>
  );
};

export default DynamicForm;
