import React, {useEffect, useState, useRef, useCallback} from "react";
import axios from "axios";
import SubjectiveQuiz from "./SubjectiveQuiz";
import {useLocation} from 'react-router-dom'
import blue_bg from '../assets/blue_bg.jpg'
import Loader from "react-loader-spinner";
import Webcam from "react-webcam";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import Modal from "react-modal";

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

const startButton = {
    padding: '7px',
    display: 'flex',
    width: '200px',
    justifyContent: 'center',
    color: 'white',
    alignContent: 'center',
    backgroundColor: 'orange',
    border: '1px solid white',
    borderRadius: '5px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '2%'
}
const main = {
    display: 'flex',
    padding: '1%',
    backgroundImage: 'url(' + blue_bg + ')',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'
}
const container = {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
}
const footnoteStyles = {
    border: '0.5px solid white',
    padding: '2%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderRadius: '10px'
}
const buttonStyles = {
    backgroundColor:'white',
    border:'0.5px solid gray',
    padding:'5px',
    marginLeft:'5px'
}

export function SubjectiveStart() {
    Modal.setAppElement('#root')
    let subtitle;
    let userDetails = JSON.parse(localStorage.getItem("user_details"));

    //grabbing the examID from the URL
    const loc = useLocation()
    const curr_url = loc.pathname
    let test_details_string = curr_url.split('/')[2]
    const test_details = JSON.parse(test_details_string)
    console.log('TEST DETAILS', test_details)

    console.log('USER', userDetails)
    const [questions, setQuestions] = useState([]);
    const [assessmentId, setAssessment] = useState();
    const [numberQuestions, setNumberQuestions] = useState(0);
    const [disp, setDisp] = useState(false);
    const [warningCount, setWarningCount] = useState(0);
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
    const capture = useCallback(
        () => {
            if (webcamRef && webcamRef.current) {
                const imageSrc = webcamRef.current.getScreenshot();
                axios.post('http://localhost:5000/proctor', {
                    file: imageSrc
                }).then((resp) => {
                    console.log("got resp", resp.data)

                }).catch(e => {
                    console.log("ERROR")
                })
            } else {
                console.log("WEBCAM NOT THERE")
            }
        },
        [webcamRef]
    );
    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        console.log('Browser doesn\'t support speech recognition.')
    }
    useEffect(() => {
        // setInterval(checkFocus, 200, [tabWarning, warningCount])
        axios.post('https://honestgrade.herokuapp.com/assessment/startSubjectiveAssessment', {
            studentId: userDetails._id,
            examId: test_details.test_id
        })
            .then((resp) => {
                console.log("RESP", resp.data)
                setQuestions([...resp.data.questions]);
                setAssessment(resp.data.assessmentId);
                setNumberQuestions(resp.data.questions.length);
            })
        //Recursive task of 10 seconds for image frame
        setInterval(capture, 10000)
        SpeechRecognition.startListening()
        //Recursive task of 20 seconds for voice detection
        setInterval(viewTranscript, 5000)
        setInterval(() => {
            if (document.hasFocus() === false) {
                openModal()
            }
        }, 200)
    }, [])

    async function viewTranscript() {
        SpeechRecognition.stopListening()
        console.log("TRANSCRIPT", transcript)
       
        let words = transcript.split(" ");
        if (words.length > 0) {
            await axios.post('https://honestgrade.herokuapp.com/violations/add', {
                assessmentId: assessmentId,
                notes: transcript,
                violationType: 2
            })
        }
        resetTranscript()
        SpeechRecognition.startListening()
    }

    function onClick() {
        setDisp(true)
    }

    if (!disp) {
        return (
            <div style={main}>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Warning"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>You were caught switching tabs!This is a warning</h2>
                    <button onClick={closeModal} style={buttonStyles}>close</button>
                </Modal>
                <div style={container}>
                    <div name='footnote' style={footnoteStyles}>
                        <p>This test is proctored. Please do not leave or minimize this page at any point of time.
                            <span style={{fontWeight: 'bold'}}> Any changes that take place will lead to test being cancelled</span>
                        </p>
                        <p style={{fontSize: '22px'}}>Welcome to your Test!</p>
                        <p style={{fontSize: '18px'}}>UserID: {userDetails.userID}</p>
                        <p style={{fontSize: '18px'}}>Subject: {test_details.subject}</p>
                    </div>


                    <button onClick={onClick} style={startButton}>Start</button>
                    <SubjectiveQuiz disp={disp} questions={questions}
                                    assessmentId={assessmentId} numberQuestions={numberQuestions}>
                    </SubjectiveQuiz>
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
                    <button onClick={closeModal}>Close</button>
                </Modal>
                <SubjectiveQuiz disp={disp} questions={questions} assessmentId={assessmentId}
                                numberQuestions={numberQuestions}></SubjectiveQuiz>
            </div>
        );
    }
}


export default SubjectiveStart;
