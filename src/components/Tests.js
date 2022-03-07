import React,{useState,useEffect} from 'react'
import {Button} from '@material-ui/core'
import  {useHistory } from 'react-router-dom'
import Card from './Card.js'
import axios from 'axios'
import Loader from "react-loader-spinner";
import Navbar from './Navbar'


//styles
const loaderStyles = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'100%',
    width:'100%',
    flexDirection:'row',
}

const containerStyles = {
    backgroundColor:'white',
    margin:'5%'
}

const Tests = () => {
    const student_details = JSON.parse(localStorage.getItem('user_details'))
    const [pendingTests, setPendingTests] = useState([])
    const [testsLoaded,setTestsLoaded] = useState(false)
    const cardContent = {
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row'
    }
    console.log(student_details)
    const loadTests = async () => {
        const data = await axios.post('https://honestgrade.herokuapp.com/student/getCurrentExams',{
            id:student_details._id
        })   
        .then(res=>{
            console.log(res.data.exams)
            setTimeout(() => {
                
            }, 3000);
            setPendingTests(res.data.exams)
            console.log(pendingTests)
            setTestsLoaded(true)
        })
        .catch(err =>console.log(err))
    }
    useEffect(() =>{
        loadTests()
    }, [])
    
    const nav = useHistory()
    const clickSubjective = (id)=>{
            nav.replace(`/subjective/${id}`)
    }
    const clickObjective = (id) => {
        //change to objective later
        nav.replace(`/objective/${id}`);
    }
    return (
        <>
        <Navbar/>
        {testsLoaded?(
            <div style={containerStyles}>
            <div style={{display:'flex',flexDirection:'column'}}>
                <h3 style={{'marginBottom':'5%'}}>View your pending tests here</h3>
                    {pendingTests.map(item=>{
                        let due_date = new Date(parseInt(item.scheduleDate.substr(6)));
                        due_date = due_date.toDateString();
                        const test_details = {
                            test_id:item._id,
                            subject:item.name
                        }
                        return(
                            <Card>
                            <h4 style={{color:'blue'}}>{item.name}</h4>
                            <p style={{color:'black'}}>Due: {due_date}</p>
                            <div style={cardContent}>
                                <p style={{color:'black'}}>About: {item.description} </p>
                                <p>Questions: {item.numberQuestions}</p>
                            </div>
                            <div name='testButton' style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                {item.type === 0? 
                                (<Button  type="submit" variant="contained" color="primary" onClick={clickObjective.bind(this,JSON.stringify(test_details))}>
                                objective test
                                </Button>):
                                (<Button  type="submit" variant="contained" color="primary" onClick={clickSubjective.bind(this,JSON.stringify(test_details))}>
                                subjective test
                                </Button>)}
                                
                                
                            </div>
                            </Card>
                        )
                    })}
                
            </div>
        </div>
        ):
        (<div style={loaderStyles}>
            <Loader
                type="Circles"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={2000}
                />

        </div>)}
            
        </> 
        
     );
}
 
export default Tests;
