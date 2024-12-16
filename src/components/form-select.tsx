type FormSelectProps = {
  id: string,
  options?: string[],
  value: string,
  label: string
};
export const FormSelect = (props: FormSelectProps) => {
  const { id, options, value, label } = props;
  const fieldStyle = 'bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-2.5';
  const optionsElment = options ? options.map(option=> 
    <option key={`option-${option}-${id}`}>{option}</option>): null;

  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>{label}</label>
      <select defaultValue={value} className={fieldStyle} key={id} id={id}>{optionsElment}</select>
    </>
  );
};