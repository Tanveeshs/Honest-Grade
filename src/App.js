import React, {useEffect, useReducer, useState} from 'react';
import {Quiz} from './components/Quiz'
import axios from "axios";
import './App.css';

function App() {
  const [questions,setQuestions] = useState([]);
  const [disp,setDisp] = useState(false);

  useEffect(()=>{
    axios.post('https://honestgrade.herokuapp.com/assessment/start', {
          "studentId": "61366028e87ffc38b8f8f937",
          "examId": "616f12e40f50d70016d32c30"
        }
    ).then(resp=>{
      console.log("RESP",resp.data.questions)
      setQuestions([...resp.data.questions]);
    })
  },[])
  function onClick(){
    setDisp(true)
  }
  if(!disp){

    return (
        <div>
          <button onClick={onClick}>Start </button>
          <Quiz disp={disp} questions={questions}></Quiz>
        </div>
    );
  }else{

    return (
        <div>
          <Quiz disp={disp} questions={questions}></Quiz>
        </div>
    );
  }
}

export default App;
