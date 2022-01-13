import React, {useEffect, useState} from "react";
import axios from "axios";
import SubjectiveQuiz from "./SubjectiveQuiz";
import bg2 from '../assets/bg2.png'

export function SubjectiveStart(){
    const [questions,setQuestions] = useState([]);
    const [assessmentId,setAssessment] = useState();
    const [numberQuestions,setNumberQuestions] = useState(0);
    const [disp,setDisp] = useState(false);
    const startButton = {
        padding:'7px',
        display:'flex',
        width:'200px',
        justifyContent:'center',
        color:'white',
        alignContent:'center',
        backgroundColor:'orange',
        border:'1px solid white',
        borderRadius:'5px',
        textTransform:'uppercase',
        fontWeight:'bold',
        fontSize:'16px',
    }
    const main={
        display:'flex',
        padding:'5%',
        backgroundImage:'url('+ bg2 +')',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    }
    const container={
        display:'flex',
        flexDirection:'column',
        alignContent:'center',
    }
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
            <div style={main}>
                <div style={container}>
                    <h1 style={{fontSize:'48px'}}>Welcome to your Test!</h1>
                    <button onClick={onClick} style={startButton}>Start </button>
                    <SubjectiveQuiz disp={disp} questions={questions} 
                    assessmentId={assessmentId}  numberQuestions={numberQuestions}>
                </SubjectiveQuiz>
                </div>
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
