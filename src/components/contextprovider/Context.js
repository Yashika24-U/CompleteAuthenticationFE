import React,{createContext}from 'react'
import {useState} from 'react'

export const LoginContext = createContext("")

const Context = ({children}) => {

    const[logindata,setLoginData] = useState("")
    
  return (
    <>
    <LoginContext.Provider value = {{logindata , setLoginData}}>
        {children}
    </LoginContext.Provider>
    </>
  )
}

export default Context