import React, { useReducer } from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';
import QuizContext from './context/quizContext';

import {
  SET_CURRENT_ANSWER,
  SET_CURRENT_QUESTION,
  SET_ANSWERS,
  SET_SHOW_RESULTS,
  SET_ERROR,
  RESET_QUIZ
} from "./Reducers/types"

import quizReducer from './Reducers/quizReducer'

import './App.css';
import quizContext from './context/quizContext';



function App() {

  const initialState = {
    currentQuestion: 0,
    currentAnswer: '',
    answers: [],
    showResults: false,
    error: ''
  }

  const [state, dispatch] = useReducer(quizReducer, initialState)
  const { currentQuestion, currentAnswer, answers, showResults, error } = state;


  //REPLACED BY INITIALSTATE
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [currentAnswer, setCurrentAnswer] = useState('');
  // const [answers, setAnswers] = useState([]);
  // const [showResults, setShowResults] = useState(false);
  // const [error, setError] = useState('');


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

  const renderError = () => {
    if (!error) {
      return;
    }

    return <div className='error'>{error}</div>
  }

  const renderResultMark = (question, answer) => {
    if (question.correct_answer === answer.answer) {
      return <span className='correct'>Correct</span>;
    }

    return <span className='failed'>Failed</span>
  }

  const renderResultsData = () => {
    return answers.map(answer => {
      const question = questions.find(
        question => question.id === answer.questionId
      );
      return <div key={question.id}>{question.question} - {renderResultMark(question, answer)}</div>
    })

  }

  const restart = () => {
    // REPLACES EVERYTHING BELOW
    dispatch({ type: RESET_QUIZ });
    //setAnswers([]);
    // setCurrentAnswer('');
    // setCurrentQuestion(0);
    // setShowResults(false);
  }

  const next = () => {
    const answer = {
      questionId: question.id,
      answer: currentAnswer
    }

    if (!currentAnswer) {
      dispatch({ type: SET_ERROR, error: 'Please select an option!' }) //setError('Please select an option!');
      return;
    }
    
    dispatch({ type: SET_ANSWERS, answers: [...answers, answer] }) //setAnswers([...answers, answer]);
    // console.log(answers);
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' })  // setCurrentAnswer('');

    if (currentQuestion + 1 < questions.length) {
      dispatch({ type: SET_CURRENT_QUESTION, currentQuestion: currentQuestion + 1 }) //setCurrentQuestion(currentQuestion + 1);
      return;
    }

    dispatch({ type: SET_SHOW_RESULTS, showResults: true }) //setShowResults(true);

  }

  if (showResults) {
    return (
      <div className='container results'>
        <h2>Results</h2>
        <ul>{renderResultsData()}</ul>
        <button className='btn btn-primary' onClick={restart}>
          Restart
      </button>
      </div>
    )

  } else {
    return (
      <div className="container">
        <Progress total="3" current={currentQuestion + 1} />
        <Question question={question.question} />
        {renderError()}
        <Answers question={question} currentAnswer={currentAnswer} dispatch={dispatch} />
        <button className='btn btn-primary' onClick={next}>
          Confirm and Continue
      </button>
      </div>
    );
  }
}

export default App;
