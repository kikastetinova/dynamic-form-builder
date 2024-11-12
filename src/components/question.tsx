import { AnswerOption } from './answer-option';
import { useTreeMatch } from '../services/question-context';

export type QuestionType = {
  step_id: string;
  question: string;
  answers: string[];
};

const Question = () => {
  const { question, isLoading, answerQuestion } = useTreeMatch();
  return question ? (
    <div className="flex flex-col">
      <span className="text-2xl font-bold mb-10 text-center">{question.question}</span>
      {question.answers.map((answer, i) => (
        <AnswerOption
          text={answer}
          onClick={() => {
            answerQuestion(answer);
          }}
          disabled={isLoading}
          key={`answer${question.step_id}-${i}`}
        />
      ))}
    </div>
  ) : (
    <></>
  );
};

export default Question;
