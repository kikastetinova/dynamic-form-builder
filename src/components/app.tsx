import DynamicForm from "./dynamic-form";
import { useFormBuilder }  from '../hooks/use-form-builder';
import { type FormConfig } from "../types/types";

interface FormValues {
  username: string;
  age: number;
  gender: string;
  newsletter: boolean;
  over18: string;
  resume: string;
  dob: string | Date;
};

const formConfig: FormConfig = [
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
      return value == 'Female' ? null : 'Please select Female';
    }
  },
  {
    id: "newsletter",
    label: "Subscribe to newsletter",
    type: "checkbox",
    required: false,
  },
  {
    id: 'over18',
    label: 'Over 18 years old?',
    type: 'radio',
    options: ['Yes', 'No']
  },
  {
    id: 'resume',
    label: 'Upload your resume',
    type: 'file',
    required: true,
  },
  {
    id: 'dob',
    label: 'Date of birth',
    type: 'date',
    min: '2024-12-01',
    required: true
  }
];

const App = () => {
  const form = useFormBuilder<FormValues>(formConfig);
  return <DynamicForm<FormValues> config={formConfig} form={form}/>;
}

export default App;