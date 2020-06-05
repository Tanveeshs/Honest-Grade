import React, { useReducer } from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';

import './App.css';

const SET_CURRENT_ANSWER = 'SET_CURRENT_ANSWER';
const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
const SET_ANSWERS = 'SET_ANSWERS';
const SET_SHOW_RESULTS = 'SET_SHOW_RESULTS';
const SET_ERROR = 'SET_ERROR';

function quizReducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_ANSWER:
      return {
        ...state,
        currentAnswer: action.currentAnswer,
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentAnswer: action.currentQuestion,
      };
    case SET_ANSWERS:
      return {
        ...state,
        currentAnswer: action.answers,
      };
    case SET_SHOW_RESULTS:
      return {
        ...state,
        currentAnswer: action.showResults,
      };
    case SET_ERROR:
      return {
        ...state,
        currentAnswer: action.error,
      };

    default:
      return state;
  }
}

function App() {
  const initialState = {
    currentQuestion: 0,
    currentAnswer: '',
    answers: [].correct_answer,
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

  const handleClick = e => {
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: e.target.answer })  // setCurrentAnswer('');
    setError('');
  }

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
    setAnswers([]);
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' })  // setCurrentAnswer('');
    setCurrentQuestion(0);
    setShowResults(false);
  }

  const next = () => {
    const answer = {
      questionId: question.id,
      answer: currentAnswer
    }

    if (!currentAnswer) {
      setError('Please select an option!');
      return;
    }


    /////////POTENTIAL BUG -   ANSWER PUSH IS ALWAYS ONE BEHINd///////
    // answers.push(answer);
    setAnswers([...answers, answer]);
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' })  // setCurrentAnswer('');

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    setShowResults(true);

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
        <Answers question={question} currentAnswer={currentAnswer} handleClick={handleClick} />
        <button className='btn btn-primary' onClick={next}>
          Confirm and Continue
      </button>
      </div>
    );
  }
}

export default App;
