import React,{useState} from 'react'
import {Button} from '@material-ui/core'
import  {useHistory } from 'react-router-dom'

const Tests = () => {
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
        <div className='container' style={containerStyles}>
            <div style={{display:'flex',flexDirection:'column'}}>
                <Button style={{marginBottom:'5%'}} type="submit" variant="contained" color="primary" onClick={clickSubjective}>
                    Start subjective test
                </Button>
                <Button type="submit" variant="contained" color="primary" onClick={clickObjective}>
                    Start objective test
                </Button>
            </div>
        </div>
     );
}
 
export default Tests;
