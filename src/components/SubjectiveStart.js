import React, {useEffect, useState, useRef, useCallback} from "react";
import axios from "axios";
import SubjectiveQuiz from "./SubjectiveQuiz";
import {useLocation} from 'react-router-dom'
import blue_bg from '../assets/blue_bg.jpg'
import Webcam from "react-webcam";
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

export function SubjectiveStart() {
    Modal.setAppElement('#root')
    let subtitle;
    let userDetails = JSON.parse(localStorage.getItem("user_details"));

    //grabbing the examID from the URL
    const loc = useLocation()
    const curr_url = loc.pathname
    let test_details_string = curr_url.split('/')[2]
    const test_details = JSON.parse(test_details_string)

    const [questions, setQuestions] = useState([]);
    const [assessmentId, setAssessment] = useState();
    const [numberQuestions, setNumberQuestions] = useState(0);
    const [disp, setDisp] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    // const {
        // transcript,
        // listening,
        // resetTranscript,
        // browserSupportsSpeechRecognition
    // } = useSpeechRecognition();

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
    const capture = (assessmentId) => {
        console.log(assessmentId)
        if (webcamRef && webcamRef.current && assessmentId) {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(assessmentId)
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
            console.log(assessmentId, webcamRef)
        }
    }

    // if (!browserSupportsSpeechRecognition) {
    //     console.log('Browser doesn\'t support speech recognition.')
    // }
    useEffect(async () => {
        // setInterval(checkFocus, 200, [tabWarning, warningCount])
        let resp = await axios.post('https://honestgrade.herokuapp.com/assessment/startSubjectiveAssessment', {
            studentId: userDetails._id,
            examId: test_details.test_id
        })
        let assessmentId = resp.data.assessmentId
        setQuestions([...resp.data.questions]);
        setAssessment(resp.data.assessmentId);
        setNumberQuestions(resp.data.questions.length);
        setInterval(() => {
            capture(assessmentId)
        }, 10000)
        setInterval(() => {
            if (document.hasFocus() === false) {
                openModal()
            }
        }, 500)
    }, [])

    function onClick() {
        setDisp(true)
    }

    if (!disp) {
        return (
            <div>
                <div style={main}>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Warning"
                    >

                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>You are caught switching tabs!This is a
                            warning</h2>
                        <button onClick={closeModal}>close</button>
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
                <Webcam
                    audio={false}
                    height={200}
                    width={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
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
                <SubjectiveQuiz disp={disp} questions={questions} assessmentId={assessmentId}
                                numberQuestions={numberQuestions}></SubjectiveQuiz>
                <div style={{height: 0}}>
                    <Webcam
                        audio={false}
                        height={200}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={200}
                        videoConstraints={videoConstraints}
                    />
                </div>
            </div>
        );
    }
}


export default SubjectiveStart;
