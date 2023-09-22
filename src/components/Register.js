import React,{useState}from 'react'
import "./mix.css"
import { NavLink } from 'react-router-dom'



function Register() {

    const[passShow,setPassShow] = useState(false)
    const[cpassShow,csetPassShow] = useState(false)

    const[inpval,setInpval] = useState({
        fname:"",
        email:"",
        password:"",
        cpassword:""
    });

  //  console.log(inpval)

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

    const addUserdata = async(e)=>{
        e.preventDefault();

        const{fname,email,password,cpassword} = inpval;

        if(fname === ""){
            alert("please enter Your name")
        }else if(email === ""){
            alert("please enter your email")
        }else if(!email.includes("@")){
            alert("enter valid email")
        }else if(password === ""){
            alert("enter your password")
        }else if(cpassword === ""){
            alert("enter your confirm password")
        }
        else if(password.length < 6){
            alert("password must be atleast 6 characters")
        }else if(cpassword.length < 6){
            alert("confirmpassword must be atleast 6 characters")
        }else if(password !==  cpassword){
            alert("password and confirm password doesnot match")
        }else{

            // console.log("Registered Successfully")

            const data = await fetch("proxy/register",{
                method:"POST",
                headers:{
                    "content-Type":"application/json",
                },
                body:JSON.stringify({
                    fname,email,password,cpassword
                })

                
            }); 
             const res = await data.json()
            //   console.log(res.status)
            //   console.log(res.storeData)

            if(res.status === 201){
                alert("Registered successfull")
                setInpval({...inpval,fname:"",email:"",password:"",cpassword:""})
            }
        }
        
    }

  return (
   <>
   
   <section>
           <div className='form_data'>
                <div className = "form_heading">
                    <h1>Sign Up</h1>
                    <p style = {{textAlign:'center'}}>We are glad that you're using ONESTOP for your purchase!<br/>We hope you like it.</p>
                </div>
                <form>
                <div className='form_input'>
                        <label htmlFor ='fname'>Name</label>
                        <input type = "text" onChange={setVal}  value = {inpval.fname} name = "fname" id = "fname" placeholder='Enter Your Name'/>
                    </div>
                    <div className='form_input'>
                        <label htmlFor ='email'>Email</label>
                        <input type = "email"  onChange={setVal}  value = {inpval.email} name = "email" id = "email" placeholder='Enter Your EmailAddress'/>
                    </div>
                    <div className='form_input'>
                        <label htmlFor='email'>Password</label>
                        <div className='two'>
                            <input type = {!passShow ? "password" : "text"}   onChange={setVal} value = {inpval.password} name = "password" id = "password" placeholder='Enter Your Password'/>
                            <div className='showpass' onClick = {()=>setPassShow(!passShow)}  >
                                {!passShow ? "Show" : "Hide"}
                            </div>                      
                        </div>
                       
                    </div>

                <div className='form_input'>
                    <label htmlFor='email'>Confirm Password</label>
                        <div className='two'>
                            <input type = {!cpassShow ? "password" : "text"}  onChange={setVal} value = {inpval.cpassword} name = "cpassword" id = "cpassword" placeholder='Confirm Password'/>
                            <div className='showpass' onClick = {()=>csetPassShow(!cpassShow)}  >
                                {!cpassShow ? "Show" : "Hide"}
                            </div>                      
                        </div>
                       
                </div>
                    <button className='btn'onClick = {addUserdata}>Sign Up</button>
                    <p>Already have an account?<NavLink to = "/">Log In</NavLink></p>
              
                    </form>
           </div>
        
           

        </section>
   
   
   
   </>
  )
}

export default Register