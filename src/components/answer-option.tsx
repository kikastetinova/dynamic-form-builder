import { useState } from 'react';
import { Loader } from './loader';

type AnswerOptionProps = {
  text: string;
  disabled: boolean;
  onClick: (answer: string) => void;
};

export const AnswerOption = (props: AnswerOptionProps) => {
  const { text, disabled, onClick } = props;
  const [showLoader, setShowLoader] = useState(false);
  return (
    <button
      disabled={disabled}
      className={`text-emerald-900 capitalize bg-emerald-200 hover:bg-emerald-300 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-4 focus:outline-none`}
      onClick={() => {
        onClick(text);
        setShowLoader(true);
      }}
    >
      {showLoader ? <Loader /> : text}
    </button>
  );
};
