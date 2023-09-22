import React,{useState} from 'react'
import {NavLink , useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import "./mix.css"

function Login() {

const[passShow,setPassShow] = useState(false)

const[inpval,setInpval] = useState({
    email:"",
    password:"",
  
});

const history = useNavigate()

// console.log(inpval)
const setVal = (e)=>{
    // console.log(e.target.value)
    const {name,value} = e.target

    setInpval(()=>{
        return{
            ...inpval,
            [name]:value
        }
    })
};


const loginuser = async(e)=>{
    e.preventDefault();

    const{email,password} = inpval;

    if (email === "") {
        toast.error("email is required!", {
            position: "top-center"
        });
    } else if (!email.includes("@")) {
        toast.warning("includes @ in your email!", {
            position: "top-center"
        });
    } else if (password === "") {
        toast.error("password is required!", {
            position: "top-center"
        });
    } else if (password.length < 6) {
        toast.error("password must be 6 char!", {
            position: "top-center"
        });
    } else{
        
        
        const data = await fetch("https://authenticationbe.onrender.com/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email,password
            })

             
        }); 
         const res = await data.json()
        console.log(res)
        //   console.log(res.storeData)

        if(res.status === 201){
            localStorage.setItem("usersdatatoken",res.result.token)
            history("/dash")
            setInpval({...inpval,email:"",password:""})
        }
    }
    
}





  return (
    <>
        <section>
           <div className='form_data'>
                <div className = "form_heading">
                    <h1>Welcome Back, Log In</h1>
                    <p>Hi, we are you glad you are back. Please login</p>
                </div>

                <form>
                    <div className='form_input'>
                        <label htmlFor='email'>Email</label>
                        <input type = "email" name = "email" onChange = {setVal} value = {inpval.email} id = "email" placeholder='Enter Your EmailAddress'/>
                    </div>
                    <div className='form_input'>
                        <label htmlFor='email'>Password</label>
                        <div className='two'>
                            <input type = {!passShow ? "password" : "text"} name = "password" onChange = {setVal}  value = {inpval.password} id = "password" placeholder='Enter Your Password'/>
                            <div className='showpass' onClick = {()=>setPassShow(!passShow)}  >
                                {!passShow ? "Show" : "Hide"}
                            </div>                      
                        </div>
                       
                    </div>
                    <button className='btn' onClick={loginuser}>Login</button>
                    <p>Don't have an Account?<NavLink to = "/register"> Sign Up</NavLink> </p>
                    <p style = {{color:"black",fontWeight:"bold"}}>Forgot Password ?<NavLink to = "/password-reset">Click here</NavLink></p>
                </form>
                <ToastContainer />

           </div>
        


        </section>
    
    </>
    )


  }
export default Login