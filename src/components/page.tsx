import { useCallback, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const API_BASE = 'http://fe-interview-api-dev.ap-southeast-2.elasticbeanstalk.com';
const API_BEGIN_ENDPOINT = `${API_BASE}/api/begin`;
const API_NEXT_ENDPOINT = `${API_BASE}/api/answer`;

type QuestionProps = {
  text: string;
  answers: string[];
};

const Question = (props: QuestionProps) => {
  const { text, answers } = props;
  return (
    <Stack spacing={2}>
      <Typography>{text}</Typography>
      <Box>
        { answers.map( (answer, i) => <Button key={`answer-${i}`}>{answer}</Button>)}
      </Box>
    </Stack>
  );
};

type Question = {
  step_id: string;
  question: string;
  answers: string[];
};

type Match = {
  name: string;
  description: string;
};

type PageData = {
  question?: Question;
  match?: Match;
};

// type PageProps = {
//   id: string;
//   title: string;
//   answers: string[];
// };

// const Page = (props: PageProps) => {
//   const { id, title, answers } = props;
//   const [pageTitle, setPageTitle] =  useState(title);

//   const [isMatch, setIsMatch] = useState(false);
//   return (
//     <Stack spacing={2}>
//       <Typography>{title}</Typography>
//       { isMatch && <MatchPage/>}
//     </Stack>
//   );
// };

const Loader = () => {
  return (
    <div>Loading.....</div>
  );
};

const TreeMatchApp = () => {
  const [currentStepData, setCurrentStepData] = useState<Question | null>(null);
  const [matchData, setMatchData] = useState<Match | null>(null);
  
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await fetch(API_BEGIN_ENDPOINT, { method: 'GET'});
        if(response.ok) {
          const data: { question: Question } = await response.json();
          setCurrentStepData(data.question);
        } else {
          console.error(`Request failed`);
        }
      } catch {
        console.error(`Promise rejected`);
      }
    };
  
    fetchData();
  }, []);

  const submitAnswer = useCallback(async (answer: string) => {
    if(currentStepData) {
      const answerData = { step_id: currentStepData.step_id, answer };

      try {
        const response = await fetch(API_NEXT_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify(answerData),
        });

        if(response.ok) {
          const data: PageData = await response.json();
          if (data.match) {
            setMatchData(data.match);
            setCurrentStepData(null);
          } else if (data.question) {
            setCurrentStepData(data.question);
            setMatchData(null);
          }
        } else {
          console.error(`Request failed`);
        }
        
      } catch (error) {
        console.error('Error submitting answer:', error);
      }
    }
  }, [currentStepData?.step_id]);

  return (
    <Stack spacing={2}>
      <Typography>Tree Match</Typography>
      { currentStepData == null && matchData == null && <Loader/>}
      { currentStepData &&
        <Stack spacing={2}>
          <Typography>{currentStepData.question}</Typography>
          {currentStepData.answers.map((answer, i) => <Button onClick={()=>submitAnswer(answer)} key={`answer-${i}`}>{answer}</Button>)}
        </Stack>
      }
      { matchData &&
        <Stack spacing={2}>
          <Typography>{matchData.name}</Typography>
          <Typography>{matchData.description}</Typography>
        </Stack>
      }
      
    </Stack>
  );
};

export default TreeMatchApp;