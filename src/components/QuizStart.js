import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button} from '@material-ui/core'
import {Quiz} from './Quiz'
import axios from "axios";
import '../App.css';
import Webcam from "react-webcam";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

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


    //Proctoring camera
    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {
            if (webcamRef && webcamRef.current) {
                const imageSrc = webcamRef.current.getScreenshot();
                // axios.post('http://localhost:5000/proctor', {
                //     file: imageSrc
                // }).then((resp) => {
                //     console.log("got resp", resp.data)
                //
                // }).catch(e => {
                //     console.log("ERROR")
                // })
            } else {
                console.log("WEBCAM NOT THERE")
            }
        },
        [webcamRef]
    );
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        console.log('Browser doesn\'t support speech recognition.')
    }

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
        //Recursive task of 10 seconds for image frame
        setInterval(capture, 10000)
        SpeechRecognition.startListening()
        //Recursive task of 20 seconds for voice detection
        setInterval(viewTranscript, 20000)
    }, [])

    function startTest() {
        setDisp(true)
    }

    async function viewTranscript() {
        SpeechRecognition.stopListening()
        console.log("TRANSCRIPT", transcript)
        resetTranscript()
        SpeechRecognition.startListening()
        let words = transcript.split(" ");
        if (words.length > 0) {
            await axios.post('https://honestgrade.herokuapp.com/violations/add', {
                assessmentId: assessmentId,
                notes: transcript,
                violationType: 2
            })
        }
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
                <Button variant='outlined' color="primary" style={{marginLeft: '5%'}}
                        onClick={viewTranscript}>View Transcript</Button>

            </div>
        )
    }

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
                  numberQuestions={numberQuestions}/>
        </div>
    );
    // }
}

export default QuizStart;
