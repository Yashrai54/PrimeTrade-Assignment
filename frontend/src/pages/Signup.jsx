import React from 'react'
import axios from 'axios'
import { ApiContext } from '../../context/ApiContext'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Signup = () => {
    const {baseUrl}=useContext(ApiContext)
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage]=useState("")
    const navigate=useNavigate()

        const handleChange = (e) => {
      const { name, value } = e.target
      if (name === "username") setUsername(value)
      else if (name === "email") setEmail(value)
       else if (name === "password") setPassword(value)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
            const res=await axios.post(`${baseUrl}/auth/signup`,{username,email,password})
            console.log(res.data)
            setMessage(res.data.message)
            navigate("/signin")
        }
        catch(error){
            setMessage(error.response?.data?.message || "Something Went Wrong")
        }
    }
  return (
    <div class="form-container" >    
        <form onSubmit={handleSubmit}>
            <h1>Register Yourself</h1>
            <input type="text" name="username" id="" placeholder='Enter Your username' onChange={handleChange}/>
            <input type="email" name="email" id="" placeholder='Enter Your E-Mail:' onChange={handleChange}/>
            <input type="password" name="password" id="" placeholder='Enter the password:' onChange={handleChange}/>
            <button type='submit'>Sign Up</button>
            {message && <p>{message}</p>}
        </form>
    </div>
  )
}

export default Signup