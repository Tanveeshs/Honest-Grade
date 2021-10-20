import React, {useReducer} from 'react';
import Progress from './Progress';
import Question from './Question';
import Answers from './Answers';
import QuizContext from '../context/quizContext';

import {
    SET_CURRENT_ANSWER,
    SET_CURRENT_QUESTION,
    SET_ANSWERS,
    SET_ERROR, ADD_QUESTIONS,
} from "../Reducers/types"

import quizReducer from '../Reducers/QuizReducer'
import axios from "axios";
import '../App.css';

export function Quiz(props) {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const questions = props.questions;
    const assessmentId = props.assessmentId;
    const numberQuestions = props.numberQuestions
    const examId = props.examId;
    const initialState = {
        questions,
        assessmentId,
        examId,
        currentQuestion: 0,
        currentAnswer: '',
        answers: [],
        error: '',
    }
    const [state, dispatch] = useReducer(quizReducer, initialState)
    const { currentQuestion, currentAnswer, answers, error } = state;
    console.log(questions);
    const question = questions[currentQuestion];
    console.log("STATE",state);

    const renderError = () => {
        if (!error) {
            return;
        }

        return <div className='error'>{error}</div>
    }
    const next = async () => {
        const answer = {
            questionId: question.question._id,
            answer: currentAnswer
        }
        if (!currentAnswer) {
            dispatch({ type: SET_ERROR, error: 'Please select an option!' })
            return;
        }
        await dispatch({ type: SET_ANSWERS, answers: [...answers, answer] })
        if((currentQuestion+1)%2===0){
            const resp = await axios.post('https://honestgrade.herokuapp.com/assessment/answerQuestion',{
                assessmentId:assessmentId,
                examId:examId,
                questionId1:answers[0].questionId,
                questionId2:answer.questionId,
                answer1:answers[0].answer,
                answer2:answer.answer
            });
            await dispatch({type:ADD_QUESTIONS,questions:resp.data.questions});
            await dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' })
            if (currentQuestion + 1 < numberQuestions) {

                console.log("OR HERE??")
                await dispatch({ type: SET_CURRENT_QUESTION, currentQuestion: currentQuestion + 1 }) //setCurrentQuestion(currentQuestion + 1);
                forceUpdate();
                return;
            }else {
                console.log("IS IT HERE?")
                //TEST IS OVER
            }
        }else {
            dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' })
            if (currentQuestion + 1 < questions.length) {
                dispatch({ type: SET_CURRENT_QUESTION, currentQuestion: currentQuestion + 1 }) //setCurrentQuestion(currentQuestion + 1);
                forceUpdate();
                return;
            }
        }

    }
    if(props.disp===true){
        return (
            <QuizContext.Provider value={{ state, dispatch }}>
                <div className="container">
                    <Progress total={numberQuestions} current={currentQuestion + 1} />
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
