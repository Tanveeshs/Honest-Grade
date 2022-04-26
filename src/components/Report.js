import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Card from './Card'
import SchoolIcon from '@material-ui/icons/School'
import { textTransform } from '@mui/system'
import Subject from '@material-ui/icons/Subject'
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'
import Drop from '@material-ui/icons/ArrowDropDown'
import Question from '@material-ui/icons/QuestionAnswerSharp'
import {Button} from '@material-ui/core'
import Navbar from './Navbar'




const main = {
    backgroundColor:'lightgray',
    minHeight:'100vh',
    padding:'4%'
}
const textStylesHeading = {
    color:'white',
    fontSize:'20px',
    fontFamily:'Helvetica, Arial',
    fontWeight:'bold'
}
const textStylesDesc = {
    color:'white',
    fontSize:'17px',
    fontFamily:'Helvetica, Arial',
}
const iconStyles={
    marginRight:'10px',
    fontSize:'30px',
    color:'#80cae0'
}

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

const Report = () => {

    const [showDrop, setShowDrop] = React.useState(false);

    function toggleDrop() {
        setShowDrop(!showDrop);
    }

    const student_details = JSON.parse(localStorage.getItem('user_details'))
    const [givenTests, setGivenTests] = useState([])
    const [testsLoaded,setTestsLoaded] = useState(false)
    const loadTests = async () => {
        const data = await axios.post('https://honestgrade.herokuapp.com/student/getGivenAssessments',{
            studentID:student_details._id
        })
        .then(res=>{
            console.log(res.data)
            setTimeout(() => {

            }, 3000);
            setGivenTests(res.data.assessmentData)
            setTestsLoaded(true)
        })
        .catch(err =>console.log(err))
    }
    useEffect(() =>{
        loadTests()
        console.log(givenTests)
    }, [])

    return ( 
        <>
        <Navbar/>
        
        <div style={main}>
            <div>
                <h3 style={{fontFamily:'Noto Serif Display',fontWeight:'bold'}}>View the student Test report</h3>
            </div>
            <Card name='completedTests' style={{fontFamily:'Noto Serif Display'}}>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                    <span style={{marginRight:'20px'}}>
                        <SchoolIcon
                        style={{fontSize:'30px',color:'#80cae0'}}
                        />
                    </span>
                    <h5 style={textStylesHeading}>{givenTests.length} tests completed</h5>
                </div>
            </Card>

            {testsLoaded?(
            <div style={{display:'flex',flexWrap:'flex-wrap'}}>
                    {givenTests.map(test=>{
                        let assn = test.exam[0]
                        let due_date = assn.scheduleDate.split('T')[0];
                        return(
                            <>  
                            
                                    
                            <Card key={test._id} style={{minWidth:'40vw'}}>
                                <div style={{display:'flex',alignContent:'center',flexDirection:'row',alignItems:'center',color:'#80cae0'}}>
                                
                                <Subject style={{fontSize:'30px',fontWeight:'bold',marginRight:'10px'}}/>
                                <p style={textStylesHeading}>{test.exam[0].name}</p>
                                </div>
                                <p style={textStylesDesc}>Date: {due_date}</p>
                                <h4 style={textStylesDesc}>Score: {test.score} out of {test.totalMarks}</h4>
                                <div onClick={toggleDrop} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <p style={{...textStylesDesc,fontWeight:'bold'}}>View Details
                                    <span>
                                        <Drop
                                            style={{fontSize:'40px',color:'#80cae0',cursor:'pointer'}}
                                        />
                                    </span>
                                    </p>
                                    
                                </div>
                                {showDrop?(<div>
                                        <p style={textStylesDesc}>No. of questions in exam: {assn.numberQuestions}</p>
                                        {assn.type=='1'?(
                                            <div>
                                            <p style={textStylesDesc}>
                                            <span>
                                                <Question
                                                    style={{fontSize:'30px',color:'#80cae0'}}
                                                />
                                            </span>
                                                Question specifics</p>
                                                        {test.answers.map(item=>{
                                                            return(
                                                                <div style={{display:'flex',flexDirection:'column',fontFamily:'Sans Serif'}}>
                                                                    
                                                                    <p style={{color:'lightgray',fontSize:'15px'}}>{test.answers.indexOf(item)+1}. {item.question.question}</p>
                                                                        {item.yourAnswer === item.question.answer?
                                                                        <p style={{fontSize:'12px'}}>Your answer was correct
                                                                            <span><Check
                                                                        style={{fontSize:'20px',color:'green'}}
                                                                        /></span>
                                                                        </p>
                                                                            :(
                                                                                <p style={{fontSize:'12px'}}>Your answer was wrong
                                                                                <span><Close
                                                                            style={{fontSize:'24px',color:'red'}}
                                                                            /></span>
                                                                            </p>
                                                                        )
                                                        
                                                </div>
                                        ):
                                        null}
                                            
                                                    </div>
                                                    
                                                ):null
                                                
                                            }
                                   
                                    </div>):(null)}
                            </Card>
                            </>
                        )
                        
                    })}
            </div>
            )
            :
            (
                <div>
                    </div>
            )}
        </div>
        </>
     );
}
 
export default Report;
