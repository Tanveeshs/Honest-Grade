import React,{useState,useEffect} from 'react'
import {Button} from '@material-ui/core'
import  {useHistory } from 'react-router-dom'
import Card from './Card.js'
import axios from 'axios'
import Loader from "react-loader-spinner";
import Navbar from './Navbar'
import SchoolIcon from '@material-ui/icons/School'
import Timer from '@material-ui/icons/AccessTime'
import Subject from '@material-ui/icons/Subject'


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
    backgroundColor:'#aedcf5',
    margin:'3%',
}
const main = {
    backgroundColor:'lightgray',
    width:'100vw',
    // height:'100vh'
    minHeight:'100%'
}
const iconStyles={
    marginRight:'10px',
    fontSize:'30px',
    color:'#80cae0'
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
    const textStyles={
        color:'white',

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
        <div style={main}>
        <Navbar/>
            {testsLoaded?(
            <div style={{maxWidth:'100vw',maxHeight:'100vh',margin:'5%'}}>
                <div style={{display:'flex'}}>
                <Card style={{display:'flex',justifyContent:'flex-start',flexDirection:'row',padding:'10px',backgroundColor:'#2fbafa'}}>
                    <div style={{display:'flex',flexDirection:'row',width:'40%'}}>
                    <span style={{marginRight:'10px'}}>
                        <SchoolIcon
                        style={{fontSize:'30px',color:'#80cae0'}}
                        />
                    </span>
                    <h3 style={{...textStyles,}}>{pendingTests.length}</h3>
                    </div>
                    <div style={{marginLeft:'10px'}}>
                        <p style={{...textStyles,fontWeight:'bold'}}>Pending Tests</p>
                    </div>
                    
                </Card>
            </div>
            <div style={{display:'flex',flexWrap:'wrap'}}>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                    {
                    pendingTests.length !== 0?(
                        pendingTests.map(item=>{
                            let due_date = new Date(parseInt(item.scheduleDate.substr(6)));
                            due_date = due_date.toDateString();
                            const test_details = {
                                test_id:item._id,
                                subject:item.name
                            }
                            
                            return(
                                
                                <Card>
                                <h4 style={{...textStyles,fontWeight:'bold'}}>
                                    <span style={iconStyles}>
                                        <Subject style={{fontSize:'24px',fontWeight:'bold'}}/>
                                    </span>
                                    {item.name}</h4>
                                <p style={{...textStyles}}>
                                    <span style={iconStyles}>
                                        <Timer style={{fontSize:'24px',fontWeight:'bold'}}/>
                                    </span>
                                    Due: {due_date}</p>
                                <div style={cardContent}>
                                    <p style={{...textStyles}}>About: {item.description} </p>
                                    <p style={{...textStyles}}>Questions: {item.numberQuestions}</p>
                                </div>
                                <div name='testButton' style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                    {item.type === 0? 
                                    (<Button  type="submit" variant="contained" color="default" onClick={clickObjective.bind(this,JSON.stringify(test_details))}>
                                    objective test
                                    </Button>):
                                    (<Button  type="submit" variant="contained" color="default" onClick={clickSubjective.bind(this,JSON.stringify(test_details))}>
                                    subjective test
                                    </Button>)}
                                </div>
                                </Card>
                            )
                        })
                    )
                    :(
                        null
                    )
                    }
                 
            </div>
            </div>
            
        </div>

        ):
        (<div style={loaderStyles}>
            <Loader
                type="Circles"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={10000}
                />

        </div>)
        
        }
            

        </div> 
        
     );
}
 
export default Tests;
