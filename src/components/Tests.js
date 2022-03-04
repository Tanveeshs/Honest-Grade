import React,{useState,useEffect} from 'react'
import {Button} from '@material-ui/core'
import  {useHistory } from 'react-router-dom'
import Card from './Card.js'
import axios from 'axios'
import Loader from "react-loader-spinner";


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
    const containerStyles = {
        backgroundColor:'white'
    }
    const nav = useHistory()
    const clickSubjective = ()=>{
            nav.replace('/subjective')
    }
    const clickObjective = () => {
        nav.replace('/objective')
    }
    return (
        <>
        {testsLoaded?(
            <div style={containerStyles}>
            <div style={{display:'flex',flexDirection:'column'}}>
                <h3>View your pending tests here</h3>
                    {pendingTests.map(item=>{
                        return(
                            <Card>
                            <h3 style={{color:'blue'}}>{item.name}</h3>
                        <h5 style={{color:'black'}}>Due date:</h5>
                        <div style={cardContent}>
                            <p style={{color:'black'}}>Description</p>
                        </div>
                </Card>
                        )
                    })}
                        
                <div style={{}}>
                    <Button style={{marginBottom:'5%'}} type="submit" variant="contained" color="primary" onClick={clickSubjective}>
                        Start subjective test
                    </Button>
                    <Button type="submit" variant="contained" color="primary" onClick={clickObjective}>
                        Start objective test
                    </Button>
                </div>
                
            </div>
        </div>
        ):
        (<div>
            <Loader
                type="Circles"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000}
                />

        </div>)}
            
        </> 
        
     );
}
 
export default Tests;
