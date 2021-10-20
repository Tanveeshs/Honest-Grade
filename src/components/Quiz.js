import React, {useEffect, useReducer, useState} from 'react';
import Progress from './Progress';
import Question from './Question';
import Answers from './Answers';
import QuizContext from '../context/quizContext';

import {
    SET_CURRENT_ANSWER,
    SET_CURRENT_QUESTION,
    SET_ANSWERS,
    SET_SHOW_RESULTS,
    SET_ERROR,
    RESET_QUIZ
} from "../Reducers/types"

import quizReducer from '../Reducers/QuizReducer'
import axios from "axios";
import '../App.css';

export function Quiz(props) {
    const questions = props.questions;
    const initialState = {
        questions,
        currentQuestion: 0,
        currentAnswer: '',
        answers: [],
        showResults: false,
        error: ''
    }

    const [state, dispatch] = useReducer(quizReducer, initialState)
    const { currentQuestion, currentAnswer, answers, showResults, error } = state;
    const question = questions[currentQuestion];
    const renderError = () => {
        if (!error) {
            return;
        }

        return <div className='error'>{error}</div>
    }

    const next = () => {
        const answer = {
            questionId: question.question._id,
            answer: currentAnswer
        }
        console.log(answer)
        if (!currentAnswer) {
            dispatch({ type: SET_ERROR, error: 'Please select an option!' })
            return;
        }
        dispatch({ type: SET_ANSWERS, answers: [...answers, answer] })
        dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' })
        if (currentQuestion + 1 < questions.length) {
            dispatch({ type: SET_CURRENT_QUESTION, currentQuestion: currentQuestion + 1 }) //setCurrentQuestion(currentQuestion + 1);
            return;
        }
        dispatch({ type: SET_SHOW_RESULTS, showResults: true }) //setShowResults(true);

    }
    if(props.disp===true){
        return (
            <QuizContext.Provider value={{ state, dispatch }}>
                <div className="container">
                    <Progress total="3" current={currentQuestion + 1} />
                    <Question question={question.question.question} />
                    {renderError()}
                    <Answers question={question} currentAnswer={currentAnswer} dispatch={dispatch} />
                    <button className='btn btn-primary' onClick={next}>
                        Confirm and Continue
                    </button>
                </div>
            </QuizContext.Provider >
        );
    }else {
        return (<div></div>)
    }

}

export default Quiz;
