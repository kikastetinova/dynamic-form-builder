import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { API_FIRST_QUESTION_ENDPOINT, API_NEXT_QUESTION_ENDPOINT } from './api';

type Question = {
  step_id: number;
  question: string;
  answers: string[];
};

type Match = {
  name: string;
  description: string;
};

type TreeMatchContextType = {
  question?: Question;
  match?: Match;
  isLoading: boolean;
  error?: string;
  answerQuestion: (answer: string) => Promise<void>;
  restart: () => void;
};

const initialState: TreeMatchContextType = {
  question: undefined,
  match: undefined,
  isLoading: true,
  error: undefined,
  answerQuestion: async () => {},
  restart: async () => {},
};

const TreeMatchContext = createContext<TreeMatchContextType>(initialState);

export const TreeMatchProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [question, setQuestion] = useState<Question | undefined>();
  const [match, setMatch] = useState<Match | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const fetchInitialQuestion = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_FIRST_QUESTION_ENDPOINT);
      if (response.ok) {
        const data = await response.json();
        setQuestion(data.question);
        setMatch(undefined);
      } else {
        setError('Failed to fetch initial question');
        console.error('Failed to fetch initial question');
      }
      setIsLoading(false);
    } catch (error) {
      setError(`Error fetching initial question:  ${error}`);
      console.error('Error fetching initial question:', error);
    }
  };

  useEffect(() => {
    fetchInitialQuestion();
  }, []);

  const answerQuestion = useCallback(async (answer: string) => {
    if (!question) return;

    const answerData = { step_id: question.step_id, answer };

    try {
      setIsLoading(true);
      const response = await fetch(API_NEXT_QUESTION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answerData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.match) {
          setMatch(data.match);
          setQuestion(undefined);
        } else if (data.question) {
          setQuestion(data.question);
          setMatch(undefined);
        }
      } else {
        console.error('Failed to submit answer');
        setError('Failed to fetch initial question');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error answering question:', error);
      setError(`Error answering question:  ${error}`);
    }
  }, [question]);

  const restart = () => {
    fetchInitialQuestion();
  };

  return (
    <TreeMatchContext.Provider
      value={{ question, match, isLoading, error, answerQuestion, restart }}
    >
      {children}
    </TreeMatchContext.Provider>
  );
};

export const useTreeMatch = () => {
  const context = useContext(TreeMatchContext);
  if (!context) {
    throw new Error('useTreeMatch must be used within a TreeMatchProvider');
  }
  return context;
};
