import DynamicForm from "./dynamic-form";
import { useFormBuilder }  from './use-form-builder';
import { type FormConfig } from "./types";

interface FormValues {
  username: string;
  age: number;
  gender: string;
  newsletter: boolean;
  bio: string;
  rating: number;
};

const formConfig: FormConfig<FormValues> = [
  {
    id: "username",
    label: "Username",
    type: "text",
    required: true,
    minLength: 3,
    maxLength: 15,
    validate: (value: string) => {
      const regex = /^[A-Z]/; // Matches strings starting with an uppercase letter (A-Z)
      return regex.test(value) ? null : 'Username has to start with a capital letter';
    }
  },
  {
    id: "age",
    label: "Age",
    type: "number",
    required: true,
    min: 18,
    max: 100,
  },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
    required: true,
    validate: (value: string) => {
      return value == 'Male' ? null : 'Please select Male';
    }
  },
  {
    id: "newsletter",
    label: "Subscribe to newsletter",
    type: "checkbox",
    required: false,
  },

];


const App = () => {
  const form = useFormBuilder<FormValues>(formConfig);
  return <DynamicForm<FormValues> config={formConfig} form={form}/>;
}

export default App;