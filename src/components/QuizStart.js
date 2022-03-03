import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button} from '@material-ui/core'
import {Quiz} from './Quiz'
import axios from "axios";
import '../App.css';
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function QuizStart() {
    const [questions, setQuestions] = useState([]);
    const [assessmentId, setAssessment] = useState();
    const [examId, setExam] = useState();
    const [numberQuestions, setNumberQuestions] = useState(0);
    const [disp, setDisp] = useState(false);
    const [student_details, setStudentDetails] = useState({});

    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {
            if (webcamRef && webcamRef.current) {
                const imageSrc = webcamRef.current.getScreenshot();
                axios.post('http://localhost:5000/proctor',{
                    file:imageSrc
                }).then((resp)=>{
                    console.log("got resp",resp.data)

                }).catch(e=>{
                    console.log("ERROR")
                })
            } else {
                console.log("WEBCAM NOT THERE")
            }
        },
        [webcamRef]
    );

    setInterval(function () {
        capture()
    }, 10000)
    useEffect(() => {
        axios.post('https://honestgrade.herokuapp.com/assessment/start', {
                "studentId": "61366028e87ffc38b8f8f937",
                "examId": "616f12e40f50d70016d32c30"
            }
        ).then(resp => {
            console.log(resp.data);
            setQuestions([...resp.data.questions]);
            setAssessment(resp.data.assessmentId);
            setExam(resp.data.examId);
            setNumberQuestions(resp.data.numberQuestions);
            alert("Done Loading")
        })
    }, [])

    function startTest() {
        setDisp(true)
    }

    function quizDetails() {
        return (
            <div>
                <h2>Review your details</h2>
                <ul>
                    <li>Student ID: DJC6384</li>
                    <li>Subject Name: Computer Science</li>
                </ul>
                <Button variant='outlined' color="primary" style={{marginLeft: '5%'}}
                        onClick={startTest}>Start Quiz</Button>
            </div>
        )
    }

    // if(!disp){
    //     return (
    //         <div>
    //             {quizDetails()}
    //             <Webcam
    //                 audio={false}
    //                 height={20}
    //                 ref={webcamRef}
    //                 screenshotFormat="image/jpeg"
    //                 width={10}
    //                 videoConstraints={videoConstraints}
    //             />
    //             <Quiz disp={disp} questions={questions} assessmentId={assessmentId} examId={examId}  numberQuestions={numberQuestions}></Quiz>
    //         </div>
    //     );
    // }else{
    return (
        <div>
            {!disp ? quizDetails() : ""}
            <Webcam
                audio={false}
                height={1920}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={720}
                videoConstraints={videoConstraints}
            />
            <Quiz disp={disp} questions={questions} assessmentId={assessmentId} examId={examId}
                  numberQuestions={numberQuestions}></Quiz>
        </div>
    );
    // }
}

export default QuizStart;
