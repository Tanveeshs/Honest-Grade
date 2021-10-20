import React, { useContext } from 'react';
import Answer from './Answer';
import QuizContext from '../context/quizContext';


function Answers() {
    const {state, dispatch} = useContext(QuizContext);
    const {currentAnswer, currentQuestion, questions} = state;
    const question = questions[currentQuestion]


    return (
        <>n
            <Answer
                letter='a'
                answer={question.question.options[0]}
                dispatch={dispatch}
                selected={currentAnswer === 'a'}
            />
            <Answer letter='b'
                answer={question.question.options[1]}
                dispatch={dispatch} //handleClick={props.handleClick}
                selected={currentAnswer === 'b'}
            />
            <Answer
                letter='c'
                answer={question.question.options[2]}
                dispatch={dispatch}
                selected={currentAnswer === 'c'}
            />
            <Answer
                letter='d'
                answer={question.question.options[3]}
                dispatch={dispatch}
                selected={currentAnswer === 'd'}
            />
        </>


    );
}

export default Answers;