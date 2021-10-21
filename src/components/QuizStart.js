import React, {useEffect, useState} from 'react';
import {Quiz} from './Quiz'
import axios from "axios";
import '../App.css';

function QuizStart() {
    const [questions,setQuestions] = useState([]);
    const [assessmentId,setAssessment] = useState();
    const [examId,setExam] = useState();
    const [numberQuestions,setNumberQuestions] = useState(0);
    const [disp,setDisp] = useState(false);

    useEffect(()=>{
        axios.post('https://honestgrade.herokuapp.com/assessment/start', {
                "studentId": "61366028e87ffc38b8f8f937",
                "examId": "616f12e40f50d70016d32c30"
            }
        ).then(resp=>{
            console.log("RESP",resp.data)
            setQuestions([...resp.data.questions]);
            setAssessment(resp.data.assessmentId);
            setExam(resp.data.examId);
            setNumberQuestions(resp.data.numberQuestions);
        })
    },[])
    function onClick(){
        setDisp(true)
    }
    if(!disp){
        return (
            <div>
                <button onClick={onClick}>Start </button>
                <Quiz disp={disp} questions={questions} assessmentId={assessmentId} examId={examId} numberQuestions={numberQuestions}></Quiz>
            </div>
        );
    }else{

        return (
            <div>
                <Quiz disp={disp} questions={questions} assessmentId={assessmentId} examId={examId} numberQuestions={numberQuestions}></Quiz>
            </div>
        );
    }
}

export default QuizStart;
