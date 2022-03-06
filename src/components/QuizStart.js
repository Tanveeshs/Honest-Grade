import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button} from '@material-ui/core'
import {Quiz} from './Quiz'
import {useLocation} from 'react-router-dom'
import axios from "axios";
import '../App.css';
import Webcam from "react-webcam";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import blue_bg from '../assets/blue_bg.jpg'


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function QuizStart(props) {
    
    //grabbing the examID from the URL
    const loc = useLocation()
    const curr_url = loc.pathname
    let test_details_string = curr_url.split('/')[2]
    const test_details = JSON.parse(test_details_string)

    //grab the student details
    const student_details = JSON.parse(localStorage.getItem('user_details'))



    const [questions, setQuestions] = useState([]);
    const [assessmentId, setAssessment] = useState();
    const [examId, setExam] = useState();
    const [numberQuestions, setNumberQuestions] = useState(0);
    const [disp, setDisp] = useState(false);
    // const [student_details, setStudentDetails] = useState({});


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
                "studentId": student_details._id,
                "examId": test_details.test_id
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

    // styles
    const main = {
        display: 'flex',
        padding: '1%',
        backgroundImage: 'url(' + blue_bg + ')',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    }

    function quizDetails() {
        return (
            <>
                <div style={main}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <h2>Review your details</h2>
                    <ul>
                        <li>Student ID: {student_details.userID}</li>
                        <li>Subject Name: {test_details.subject}  </li>
                    </ul>
                    <Button variant='outlined' color="primary" style={{marginLeft: '5%'}}
                            onClick={startTest}>Start Quiz</Button>
                    <Button variant='outlined' color="primary" style={{marginLeft: '5%'}}
                            onClick={viewTranscript}>View Transcript</Button>
                    </div>
                </div>
            </>
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
