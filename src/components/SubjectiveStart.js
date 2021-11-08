import React, {useEffect, useState} from "react";
import axios from "axios";
import SubjectiveQuiz from "./SubjectiveQuiz";

export function SubjectiveStart(){
    const [questions,setQuestions] = useState([]);
    const [assessmentId,setAssessment] = useState();
    const [numberQuestions,setNumberQuestions] = useState(0);
    const [disp,setDisp] = useState(false);

    useEffect(()=>{
        axios.post('https://honestgrade.herokuapp.com/assessment/startSubjectiveAssessment',{
            studentId:"61366028e87ffc38b8f8f937",
            examId:"618900ea55116c0804ad761e"
        })
            .then((resp)=>{
                console.log("RESP",resp.data)
                setQuestions([...resp.data.questions]);
                setAssessment(resp.data.assessmentId);
                setNumberQuestions(resp.data.questions.length);
            })
    },[])
    function onClick(){
        setDisp(true)
    }
    if(!disp){
        return (
            <div style={{margin:10}}>
                <button onClick={onClick}>Start </button>
                <SubjectiveQuiz disp={disp} questions={questions} assessmentId={assessmentId}  numberQuestions={numberQuestions}></SubjectiveQuiz>
            </div>
        );
    }else{
        return (
            <div>
                <SubjectiveQuiz disp={disp} questions={questions} assessmentId={assessmentId}  numberQuestions={numberQuestions}></SubjectiveQuiz>
            </div>
        );
    }
}


export default SubjectiveStart;
