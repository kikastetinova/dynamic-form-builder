import { useCallback, useEffect } from "react";
import { type FormBuilderReturnType } from './use-form-builder';
import { type FormConfig, type ErrorMessage } from './types';

type FormFieldProps = {
  type: string,
  id: string,
  label: string,
  errorMessage: ErrorMessage,
  options?: string[];
};

const FormField = (props: FormFieldProps) => {
  const { type, id, label, errorMessage, options } = props;
  let field;
  switch(type) {
    case 'select': {
      const fieldStyle = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-2.5';
      const optionsElment = options ? options.map(option=> <option key={`option-${option}-${id}`}>{option}</option>): null;
      field = <select className={fieldStyle} key={id} id={id}>{optionsElment}</select>
      break;
    }
    case 'checkbox': {
      const fieldStyle = 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2';
      field = <input className={fieldStyle} key={id} id={id} type={type} />;
      break;
    }
    default: {
      const fieldStyle = 'shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
      field = <input className={fieldStyle} key={id} id={id} type={type} />;
      break;
    }
  }

  return <div key={`form-item-${id}`} className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>{label}</label>
    {field}
    {errorMessage && <p className="text-rose-600">{errorMessage}</p>}
  </div>
};

type DynamicFormProps<T extends object> = {
  config: FormConfig<T>;
  form: FormBuilderReturnType<T>;
};

const DynamicForm = <T extends object>(props: DynamicFormProps<T>)  => {
  const { config, form } = props;
  const { errors, setFieldValue, validateForm, isValid } = form;

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    validateForm();
  }, [validateForm]);

  useEffect(()=>{

  }, [isValid]);

  const handleChange = useCallback((e:React.FormEvent) => {
    e.preventDefault();
    const target = e.target;

    
    if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement) {
      const eventTargetID = (target.id || target.name);
      if(target instanceof HTMLInputElement && target.type === 'checkbox') {
        setFieldValue(eventTargetID, {checked: !target.checked});
      } else {
        setFieldValue(eventTargetID, {value: target.value})
      }
    }
  }, [setFieldValue]);

  const fields = config.map(formFieldConfig => {
    const { type, id, label } = formFieldConfig;
    const options = (type === "select") ? formFieldConfig.options : undefined;
    const errorMessage = errors[id];

    return <FormField type={type} id={id as string} label={label} errorMessage={errorMessage} options={options}/>
  });
  
  return (
    <form onSubmit={handleSubmit} onChange={handleChange} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {fields}
      <button className="rounded bg-teal-400 px-3 py-2 disabled:bg-teal-200" type="submit" >Submit Form</button>
    </form>
  );
};

export default DynamicForm;
