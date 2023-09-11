import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';

const PasswordReset = () => {

    const [email,setEmail] = useState("")

    const [message,setMsessage] = useState("")

    const setVal = (e) => {
       setEmail(e.target.value)

    }

    const sendLink = async (e)=>{
        e.preventDefault();

        const res = await fetch("/sendpasswordlink",{
            method : "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({email})
        });

        const data = await res.json();

        if(data.status == 201)
        {
            setEmail("");
            setMsessage(true)
        }
        else{
            toast.error("Invalid User",{
                position: "top-center"
            })
        }
    }

  return (
   <>
    <section>
           <div className='form_data'>
                <div className = "form_heading">
                    <h1>Enter Your Email</h1>   
                </div>
                {
                     message ? <p style = {{color:"green",fontWeight:"bold"}}>password reset link send successfully to your Email</p>:""
                }
               

                <form>
                    <div className='form_input'>
                        <label htmlFor='email'>Email</label>
                        <input type = "email" name = "email" onChange = {setVal} value = {email} id = "email" placeholder='Enter Your EmailAddress'/>
                    </div>

                    <button className='btn' onClick = {sendLink}>Send</button>
                </form>
                <ToastContainer />

           </div>
        


        </section>
    
   
   
   
   
   
   </>
  )
}

export default PasswordReset