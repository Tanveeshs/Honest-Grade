import React, {useEffect, useState} from "react";
import axios from "axios";

export function SubjectiveStart(){
    useEffect(()=>{
        axios.post('https://honestgrade.herokuapp.com/assessment/startSubjectiveAssessment',{
            studentId:"61366028e87ffc38b8f8f937",
            examId:"6171b080d08dfa2db40ee8d0"
        })
            .then((resp)=>{
                console.log(resp.data)
            })
    },[])
    let [answer,setAnswer] = useState('');
    let [score,setScore] = useState('');
    function handleChange(e){
        setAnswer(e.target.value);
    }
    function onButtonClick(){
        axios.post('https://honestgrade.herokuapp.com/assessment/answerSubjectiveAssessment',{
            answers:[{questionId:"6171aee12305c9001685d54a",answer:answer}],
            assessmentId:"6171b1c1e7162d2d13d0e8bc"
        })
            .then(resp=>{
                console.log(resp.data.assessment.score)
                setScore(resp.data.assessment.score.toString());
            })
    }
    console.log("SCORE",score)
    if(score===''){
        return(<div>
            Subjective Answer Checker
            <div>
                <h2>What is HTML?</h2>
                <textarea
                    type="text"
                    value={answer}
                    onChange={handleChange}
                />
                <button onClick={onButtonClick}>Submit</button>
            </div>
        </div>)
    }else {
        return(
            <div>
                Subjective Answer Checker
                <div>
                    <h2>What is HTML?</h2>
                    <textarea
                        type="text"
                        value={answer}
                        onChange={handleChange}
                    />
                    <div>Your score is {score} out of 3</div>
                </div>


            </div>


        )

    }

}


export default SubjectiveStart;