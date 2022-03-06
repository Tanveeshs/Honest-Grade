import React, {useEffect, useState} from 'react';
import {Button} from '@material-ui/core'
import {useLocation} from 'react-router-dom'
import {Quiz} from './Quiz'
import axios from "axios";
import '../App.css';

function QuizStart() {

    const switchesAllowed = 10
    //student details
    let userDetails = JSON.parse(localStorage.getItem("user_details"));

    //grabbing the examID from the URL
    const loc = useLocation()
    const curr_url = loc.pathname
    let test_details_string = curr_url.split('/')[2]
    const test_details = JSON.parse(test_details_string)
    console.log('TEST DETAILS',test_details)


    const [questions,setQuestions] = useState([]);
    const [assessmentId,setAssessment] = useState();
    const [examId,setExam] = useState();
    const [numberQuestions,setNumberQuestions] = useState(0);
    const [disp,setDisp] = useState(false);
    const [startTestFlag,setStartTestFlag] = useState(false)

    const [tabWarning, setTabWarning] = useState(false);
    const [warningCount, setWarningCount] = useState(0);
    const [tabSwitched,setTabSwitched] = useState(false)


    useEffect(()=>{
        setInterval(checkFocus, 200)
        axios.post('https://honestgrade.herokuapp.com/assessment/start', {
                "studentId": userDetails._id,
                "examId": test_details.test_id
            }
        ).then(resp=>{
            console.log(resp.data);
            setQuestions([...resp.data.questions]);
            setAssessment(resp.data.assessmentId);
            setExam(resp.data.examId);
            setNumberQuestions(resp.data.numberQuestions);
            setStartTestFlag(true)
        })
    },[tabSwitched])

    function checkFocus() {
    console.log(warningCount)

        if (document.hasFocus() === false) {
                console.log("Caught you switching")
                setTabSwitched(true)
                let temp = warningCount
                setWarningCount(temp+1)
        //     Send request get warning count,
            }
        

    }


    function startTest(){
        setDisp(true)
    }
    function quizDetails(){
        return (
            <div>
                <h2>Review your details</h2>
                <ul>
                    <li>Student ID: {userDetails.userID}</li>
                    <li>Subject Name: {test_details.subject}</li>
                </ul>
                <Button variant='outlined' color="primary" disabled={!startTestFlag} style={{marginLeft:'5%'}}
                onClick={startTest}>Start Quiz</Button>
            </div>
        )
    }
    if(!disp){
        return (
            <div>
                {quizDetails()}

                <Quiz disp={disp} questions={questions} assessmentId={assessmentId} examId={examId}  numberQuestions={numberQuestions}></Quiz>
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