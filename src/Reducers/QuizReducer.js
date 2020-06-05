import {
    SET_CURRENT_ANSWER,
    SET_CURRENT_QUESTION,
    SET_ANSWERS,
    SET_SHOW_RESULTS,
    SET_ERROR,
    RESET_QUIZ
  } from "./types"

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
          currentQuestion: action.currentQuestion,
        };
      case SET_ANSWERS:
        return {
          ...state,
          answers: action.answers,
        };
      case SET_SHOW_RESULTS:
        return {
          ...state,
          showResults: action.showResults,
        };
      case SET_ERROR:
        return {
          ...state,
          error: action.error,
        };
      case RESET_QUIZ:
        return {
          ...state,
          currentQuestion: 0,
          currentAnswer: '',
          answers: [],
          showResults: false,
          error: ''
        }
  
      default:
        return state;
    }
  }

  export default quizReducer;