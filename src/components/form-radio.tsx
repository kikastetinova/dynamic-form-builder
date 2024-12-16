type FormSelectProps = {
  id: string,
  options?: string[],
  value: string,
  label: string
};
export const FormRadio = (props: FormSelectProps) => {
  const { id, options, value, label } = props;

  const optionsElments = options ? options.map(option=> 
    <div key={`radio-${option}-${id}`}>
      <input className={'mr-1'} name={id} id={option} type="radio" defaultChecked={value === option}  value={option}/>
      <label htmlFor={option}>{option}</label>
    </div>): null;

  return (
    <div className="flex flex-col">
      <p className="block text-gray-700 text-sm font-bold mb-2">{label}</p>
      {optionsElments}
    </div>
  );
};