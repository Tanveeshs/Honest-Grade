import React, {useEffect, useState,useRef,useCallback} from 'react';
import {Button} from '@material-ui/core'
import {useLocation} from 'react-router-dom'
import {Quiz} from './Quiz'
import axios from "axios";
import '../App.css';
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

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
    console.log('TEST DETAILS', test_details)

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

     //Proctoring camera
     const webcamRef = useRef(null);
    //  const capture = useCallback(
    //      () => {
    //          if (webcamRef && webcamRef.current) {
    //              const imageSrc = webcamRef.current.getScreenshot();
    //              axios.post('http://localhost:5000/proctor', {
    //                  file: imageSrc
    //              }).then((resp) => {
    //                  console.log("got resp", resp.data)
 
    //              }).catch(e => {
    //                  console.log("ERROR")
    //              })
    //          } else {
    //              console.log("WEBCAM NOT THERE")
    //          }
    //      },
    //      [webcamRef]
    //  );
     const {
         transcript,
         resetTranscript,
         browserSupportsSpeechRecognition
     } = useSpeechRecognition();
 
     if (!browserSupportsSpeechRecognition) {
         console.log('Browser doesn\'t support speech recognition.')
     }

    useEffect(() => {
        setInterval(() => {
            if (document.hasFocus() === false) {
                openModal()
            }
        }, 200)
        axios.post('https://honestgrade.herokuapp.com/assessment/start', {
                "studentId": userDetails._id,
                "examId": test_details.test_id
            }
        ).then(resp => {
            console.log(resp.data);
            setQuestions([...resp.data.questions]);
            setAssessment(resp.data.assessmentId);
            setExam(resp.data.examId);
            setNumberQuestions(resp.data.numberQuestions);
            setStartTestFlag(true)
        })
        //Recursive task of 10 seconds for image frame
        // setInterval(capture, 10000)
        SpeechRecognition.startListening()
        //Recursive task of 20 seconds for voice detection
        setInterval(viewTranscript, 20000)
        setInterval(() => {
            if (document.hasFocus() === false) {
                openModal()
            }
        }, 200)
    }, [])

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


    function startTest() {
        setDisp(true)
    }

    function quizDetails() {
        return (
            <div>
                <h2>Review your details</h2>
                <ul>
                    <li>Student ID: {userDetails.userID}</li>
                    <li>Subject Name: {test_details.subject}</li>
                </ul>
                <Button variant='outlined' color="primary" disabled={!startTestFlag} style={{marginLeft: '5%'}}
                        onClick={startTest}>Start Quiz</Button>
            </div>
        )
    }

    if (!disp) {
        return (
            <div>
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
            </div>
        );
    }
}

export default QuizStart;
