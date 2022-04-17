import React, {useEffect, useRef, useState} from 'react';
import {Button} from '@material-ui/core'
import {useLocation} from 'react-router-dom'
import {Quiz} from './Quiz'
import axios from "axios";
import '../App.css';
import Modal from 'react-modal';
import Webcam from "react-webcam";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import Card from './Card.js'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};
const bg = {
    backgroundColor:'#afccdb',
    padding:'5%',
    minHeight:'100vh'
}

function QuizStart() {
    Modal.setAppElement('#root')
    let subtitle;
    //student details
    let userDetails = JSON.parse(localStorage.getItem("user_details"));

    //grabbing the examID from the URL
    const loc = useLocation()
    const curr_url = loc.pathname
    let test_details_string = curr_url.split('/')[2]
    const test_details = JSON.parse(test_details_string)

    const {
        transcript,
        resetTranscript,
        listening,
        interimTranscript,
        finalTranscript,
    } = useSpeechRecognition();

    const [questions, setQuestions] = useState([]);
    const [assessmentId, setAssessment] = useState();
    const [examId, setExam] = useState();
    const [numberQuestions, setNumberQuestions] = useState(0);
    const [disp, setDisp] = useState(false);
    const [startTestFlag, setStartTestFlag] = useState(false)
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
        axios.post('https://honestgrade.herokuapp.com/violations/add', {
            assessmentId: assessmentId,
            violationType: 0,
            notes: "Caught tab switching"
        })
    }

    const webcamRef = useRef(null);
    const capture = (assessmentId) => {
        console.log("CAPTURE CALLED FOR ASSESSMENT ID",assessmentId)
        if (webcamRef && webcamRef.current && assessmentId) {
            const imageSrc = webcamRef.current.getScreenshot();
            axios.post('http://localhost:5000/proctor', {
                file: imageSrc,
                assessmentId: assessmentId
            }).then((resp) => {
                console.log("got resp", resp.data)
            }).catch(e => {
                console.log("ERROR")
            })
        } else {
            console.log("WEBCAM NOT THERE")
        }
    }
    useEffect(async () => {
        let resp = await axios.post('https://honestgrade.herokuapp.com/assessment/start', {
                "studentId": userDetails._id,
                "examId": test_details.test_id
            }
        )
        setQuestions([...resp.data.questions]);
        setAssessment(resp.data.assessmentId);
        let assessmentIdAg = resp.data.assessmentId;
        setExam(resp.data.examId);
        setNumberQuestions(resp.data.numberQuestions);
        setStartTestFlag(true)
        setInterval(() => {
            if (document.hasFocus() === false) {
                openModal()
            }
        }, 500)
        setInterval(() => {
            capture(assessmentIdAg)
        }, 10000)
    }, [])

    useEffect(()=>{
        if(!listening){
            SpeechRecognition.startListening({continue:true})
            if(assessmentId && transcript!==""){
                console.log("Assessment ID is",assessmentId)
                axios.post('https://honestgrade.herokuapp.com/violations/add',{
                    assessmentId:assessmentId,
                    violationType:2,
                    notes:transcript
                }).then(v=>{
                    console.log("Violation Recorded")
                })
            }
        }
    },[listening])

    function startTest() {
        setDisp(true)
        SpeechRecognition.startListening({continue:true})
    }

    function quizDetails() {
        return (
            <Card style={{backgroundColor:'lightblue'}}>
                <h2 style={{fontWeight:'bold'}}>Confirm your details</h2>
                <ul>
                    <li>Student ID: {userDetails.userID}</li>
                    <li>Subject Name: {test_details.subject}</li>
                </ul>
                <Button variant='outlined' color="default" disabled={!startTestFlag} style={{marginLeft: '5%'}}
                        onClick={startTest}>Start Quiz</Button>
            </Card>
        )
    }

    if (!disp) {
        return (
            <div style={bg}>
                {quizDetails()}
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Warning"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>You are caught switching tabs!This is a warning</h2>
                    <button onClick={closeModal}>close</button>
                </Modal>
                <Quiz disp={disp} questions={questions} assessmentId={assessmentId} examId={examId}
                      numberQuestions={numberQuestions}></Quiz>
                <div style={{marginTop:'5%'}}>
                    <h4 style={{fontFamily:'Noto Serif Display'}}>
                        Video feed
                    </h4>
                <Webcam
                    audio={false}
                    height={200}
                    width={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                </div>
                
            </div>
        );
    } else {

        return (
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Warning"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>You are caught switching tabs!This is a warning</h2>
                    <button onClick={closeModal}>close</button>
                </Modal>
                <Quiz disp={disp} questions={questions} assessmentId={assessmentId} examId={examId}
                      numberQuestions={numberQuestions}></Quiz>

                <Webcam
                    audio={false}
                    height={200}
                    width={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    // style={webcamStyles}
                />
                Transcript {transcript}
            </div>
        );
    }
}

export default QuizStart;
