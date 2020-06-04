import React, {useState} from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';

import './App.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const questions = [
    {
      id: 1,
      question: 'Which statement about Hooks is not true?',
      answer_a:
        'Hooks are 100% backwards-compatible and can be used side by side with classes',
      answer_b: 'Hooks are still in beta and not available yet',
      answer_c:
        "Hooks are completely opt-in, there's no need to rewrite existing code",
      answer_d: 'All of the above',
      correct_answer: 'b',
    },
    {
      id: 2,
      question: 'Which one is not a Hook?',
      answer_a: 'useState()',
      answer_b: 'useConst()',
      answer_c: 'useReducer()',
      answer_d: 'All of the above',
      correct_answer: 'b',
    },
    {
      id: 3,
      question: 'What Hook should be used for data fetching?',
      answer_a: 'useDataFetching()',
      answer_b: 'useApi()',
      answer_c: 'useEffect()',
      answer_d: 'useRequest()',
      correct_answer: 'c',
    },
  ];

  const question = questions[currentQuestion];

  const handleClick = e => {
    setCurrentAnswer(e.target.value)
  }


  return (
    <div className="container">
      <Progress total="3" current="1" />
      <Question question={question.question} />
      <Answers question={question} currentAnswer={currentAnswer} handleClick={handleClick} />
      <button className='btn btn-primary'>
        Confirm and Continue
      </button>
    </div>
  );
}

export default App;
