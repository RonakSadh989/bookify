import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFirebase} from "../context/Firebase"
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {
    const firebase = useFirebase()
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log("Logging a user...")
      await firebase.signIn(email, password)
  }
  console.log(firebase)
useEffect(() => {
  if(firebase.isLoggedIn){
    // navigate to home
    navigate("/")
  }
}, [firebase, navigate])



  return (
    <div className='container mt-5'>
     <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{
           setemail(e.target.value) 
        }} value={email}/>
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  onChange={(e)=>{
           setpassword(e.target.value) 
        }} value={password} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Login
      </Button>
    </Form>
    </div>
  )
}

