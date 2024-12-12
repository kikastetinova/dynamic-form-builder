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
  },
  {
    id: "newsletter",
    label: "Subscribe to newsletter",
    type: "checkbox",
    required: false,
  },
  {
    id: "bio",
    label: "Bio",
    type: "text",
    required: false,
    minLength: 10,
    maxLength: 300,
  },
  {
    id: "rating",
    label: "Rating",
    type: "number",
    required: true,
    min: 1,
    max: 5,
  },
];


const App = () => {
  const form = useFormBuilder<FormValues>(formConfig);
  return <DynamicForm<FormValues> config={formConfig} form={form}/>;
}

export default App;