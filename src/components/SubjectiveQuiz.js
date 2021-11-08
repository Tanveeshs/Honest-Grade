import React, {useEffect, useState} from "react";
import axios from "axios";
import use from "use";


export function SubjectiveQuiz(props) {
    // const questions = props.questions;
    let [questions, setQuestions] = useState(props.questions);
    const assessmentId = props.assessmentId;
    console.log(assessmentId)

    const numberQuestions = props.numberQuestions;
    let [count, setCount] = useState(0);
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
    console.log(answer)

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
            console.log("CANT GO AHEAD")
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
            console.log("CANT GO BEFORE")
        }
    }

    function onButtonClick() {
        console.log("BUTTON CLICK")
        axios.post('https://honestgrade.herokuapp.com/assessment/answerSubjectiveAssessment', {
            answers: answer,
            assessmentId: assessmentId
        }).then(resp => {
            console.log(resp.data.assessment.score);
            setScore(resp.data.assessment.score.toString());
            setTotalMarks(resp.data.assessment.totalMarks.toString())
        })
            .catch(err => {
                console.log(err)
            })
    }
    console.log("SCORE",score)

    // console.log("SCORE",score)
    if (props.disp === true) {
        if(score===undefined){
            return (<div style={{margin: 20}}>
                <h1>Subjective Answer Checker</h1>
                <div>
                    {questions[count] !== undefined ?
                        <h2>{questions[count].question.question}</h2>: <h2>Loading...</h2>}
                    {questions[count] !== undefined ?
                        <h3>{questions[count].question.outOf} Marks</h3>: <h2>Loading...</h2>}

                    <textarea
                        type="text"
                        value={currentAnswer}
                        onChange={handleChange}
                    />
                    <br/>
                    <button onClick={onPrevClick}>Prev</button>
                    <button onClick={onNextClick}>Next</button>
                    <br/>
                    <br/>
                    <button onClick={onButtonClick}>Submit</button>


                </div>
            </div>)
        }else {
            return (<div>
                Congratulations! You have got {score} marks out of {totalMarks}
            </div>)
        }



    } else {
        return (<div></div>)
    }

}

export default SubjectiveQuiz;
