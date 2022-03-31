import React, {useEffect, useState} from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import Loader from "react-loader-spinner";
import bgimg from '../assets/bg1.png'
import {Button} from '@material-ui/core'
import { Link } from "react-router-dom";



export function SubjectiveQuiz(props) {
    // const questions = props.questions;
    let [questions, setQuestions] = useState(props.questions);
    const assessmentId = props.assessmentId;
    const alert = useAlert()

    const numberQuestions = props.numberQuestions;
    let [count, setCount] = useState(0);
    let [scoreLoading, setScoreLoading] = useState(false)
    let [currentAnswer, setCurrentAnswer] = useState('');
    let [answer, setAnswer] = useState();
    let [score, setScore] = useState();
    let [totalMarks,setTotalMarks] = useState();
    useEffect(() => {
        let tempObj = {};
        for (let i = 0; i < props.questions.length; i++) {
            let ques = props.questions[i].question;
            tempObj[ques._id] = '';
        }
        setAnswer(tempObj);
    }, []);

    function handleChange(e) {
        setCurrentAnswer(e.target.value);
    }

    function onNextClick() {
        if (count < (numberQuestions - 1)) {
            //Create a clone object
            let objClone = Object.assign({}, answer);
            objClone[questions[count].question._id] = currentAnswer;
            //Update answer obj
            setAnswer(objClone);
            //Set current Answer to next Questions saved answer
            setCurrentAnswer(answer[questions[count + 1].question._id])
            //Increment Count
            setCount(count + 1);
        } else {
            //SHOW ALERT
            alert.show('YOU CANNOT GO AHEAD!')
        }
    }

    function onPrevClick() {
        if (count > 0) {
            //Create a clone object
            let objClone = Object.assign({}, answer);
            objClone[questions[count].question._id] = currentAnswer;
            //Update answer obj
            setAnswer(objClone);
            //Set current Answer to next Questions saved answer
            setCurrentAnswer(answer[questions[count - 1].question._id])
            //Increment Count
            setCount(count - 1);
        } else {
            //SHOW ALERT
            alert.show('YOU CANNOT GO BACK!')
        }
    }

    function onButtonClick() {
        setScoreLoading(true)
        console.log("BUTTON CLICK")
        axios.post('https://honestgrade.herokuapp.com/assessment/answerSubjectiveAssessment', {
            answers: answer,
            assessmentId: assessmentId
        }).then(resp => {
            console.log(resp.data.assessment.score);
            setScore(resp.data.assessment.score.toString());
            setScoreLoading(false)
            setTotalMarks(resp.data.assessment.totalMarks.toString())
        })
            .catch(err => {
                console.log(err)
            })
        
    }
    const containerStyles = {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundImage:'url('+ bgimg +')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        
    }
    const questionStyles={
        padding:'7%',
        width:'50%',
        border:'0.5px solid lightgray',
        borderRadius:'5px',
        display:'flex',
        flexDirection:'column',
        flex:'flex-start'
    }
    const buttons = {
        width:'150px',
        alignSelf:'center',
        padding:'6px',
        color:'white',
        fontWeight:'bold',
        textTransform:'uppercase',
        fontSize:'16px',
        backgroundColor:'orange',
        border:'1px solid white',
        borderRadius:'5px'
    }

    if (props.disp === true) {
        if(scoreLoading===false && score===undefined){
            return (
            <div style={containerStyles}>
                <h1>Subjective Answer test</h1>
                <div style={questionStyles}>
                    <div style={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'space-between',
                        marginBottom:'5%'
                    }}>
                        {questions[count] !== undefined ?
                            <h2>Q. {questions[count].question.question}</h2>: <h2>Loading...</h2>}
                        {questions[count] !== undefined ?
                            <p style={{
                                display:'flex',
                                flex:'flex-end',
                                fontSize:'14px'
                            }}>{questions[count].question.outOf} Marks</p>: <h2>Loading...</h2>}
                    </div>
                    <textarea
                        type="text"
                        value={currentAnswer}
                        onChange={handleChange}
                        maxLength={1000}
                        placeholder="Fill your answer here"
                    />
                    <br/>
                    <button style={buttons} onClick={onPrevClick} >Back</button>
                    <button style={buttons} onClick={onNextClick}>Next</button>
                    <br/>
                    <br/>
                    <button style={buttons} onClick={onButtonClick}>Submit</button>


                </div>
            </div>)
        }
        else {
            if(scoreLoading){
            return (<Loader
                type="Circles"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000}
                />)}
            else{
                return(
                    <div style={containerStyles}>
                        <h1>CONGRATULATIONS!</h1>
                        <h2>You have scored {score} out of {totalMarks}</h2>
                        <h2 style={{marginTop:'5%'}}>TEST END</h2>
                            <Button color='default' variant='contained'>
                                <Link to="/">
                                Back to home
                                </Link>
                            </Button>
                    </div>
                )
            }
        }
        



    } else {
        return (<div></div>)
    }

}

export default SubjectiveQuiz;
