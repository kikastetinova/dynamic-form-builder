import { memo } from "react";
import { 
  type ErrorMessage, 
  type SupportedValueTypes, 
} from '../types/types';
import { FormSelect } from "./form-select";
import { FormRadio } from './form-radio';

type FormFieldProps = {
  type: string, 
  id: string;
  label: string;
  value?: SupportedValueTypes,
  options?: string[],
  errorMessage?: ErrorMessage;
};

export const FormField = memo((props: FormFieldProps) => {
  const { type, label, errorMessage } = props;
  const id = props.id as string;
  let field;
  
  switch(type) {
    case 'select': {
      const { options } = props;
      const value = props.value as string;
      field = <FormSelect id={id} options={options} value={value} label={label}/>
      break;
    }
    case 'checkbox': {
      const value = props.value as boolean;
      field = <div className="flex flex-row">
        <input defaultChecked={value} key={id} id={id} type={type} />
        <label className="block text-gray-700 text-sm font-bold ml-2" htmlFor={id}>{label}</label>
      </div>;
      break;
    }
    case 'radio': {
      const { options } = props;
      const value = props.value as string;
      field = <FormRadio label={label} id={id} options={options} value={value}/>
      break;
    }
    default: {
      const value = props.value as string;
      const fieldStyle = 'appearance-none border border-gray-400 text-gray-900 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline';
      field = <>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>{label}</label>
        <input defaultValue={value} className={fieldStyle} key={id} id={id} type={type} />
      </>
      break;
    }
  }

  return <div key={`form-item-${id}`} className="mb-4">
    {field}
    {errorMessage && <p className="text-rose-600">{errorMessage}</p>}
  </div>
});