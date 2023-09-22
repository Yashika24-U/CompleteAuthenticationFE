import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'

function ForgotPassword() {
    const {id,token} = useParams()

    const history = useNavigate()

    const[password,setPassword] = useState("") 

    const[message,setMessage] = useState("")

    const userValid  = async()=>{
        const res = await fetch(`proxy/forgotpassword/${id}/${token}`,{
            method : "GET",
            headers : {
                "Content-Type":"application/json"
            }
        });

        const data = await res.json();

        if(data.status == 201)
        {
            console.log("user valid")
        }
        else{
            history("*")
        }
    }

const setVal = (e)=>{

    setPassword(e.target.value)
}

const sendpassword = async(e)=>{
    e.preventDefault();
    const res =  await fetch(`proxy/${id}/${token}`,{
        method : "POST",
        headers : {
            "Content-Type":"application/json"
        },
        body : JSON.stringify({password})
        
    });
    const data = await res.json();
    console.log(data)

    if(data.status === 201)
    {
       setPassword("")
       setMessage(true)
    }
    else{
      toast.error("! Token Expired generate newlink")
    }
}

    
useEffect(()=>{

    userValid()

},[])


   
  return (
    <>
     <section>
           <div className='form_data'>
                <div className = "form_heading">
                    <h1>Enter Your NEW Password</h1>   
                </div>
               

                <form>
                    {message ?  <p style = {{color:"green",fontWeight:"bold"}}>password successfully  updated</p>:""
                    }
                    <div className='form_input'>
                        <label htmlFor='email'>Enter Your NewPassowrd</label>
                        <input type = "password" name = "password" onChange = {setVal} value = {password} id = "password" placeholder='Enter Your NewPassword'/>
                    </div>

                    <button className='btn' onClick = {sendpassword}>Send</button>
                </form>
                <ToastContainer />

           </div>
        


        </section>
    
    </>
  )
  }

export default ForgotPassword
