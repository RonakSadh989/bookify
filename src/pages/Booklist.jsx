import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/Firebase"
export default function Booklist() {
    const [Name, setName] = useState("")
    const [isbnNumber, setisbnNumber] = useState("")
    const [Price, setPrice] = useState("")
    const [CoverPic, setCoverPic] = useState("")
  const firebase = useFirebase()
    const handleSubmit = async (e)=>{
        e.preventDefault()
    await  firebase.CreateNewListing(Name, isbnNumber, Price, CoverPic)
    }
  return (
    <div className='container mt-5'>
     <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name of the Book</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>{
           setName(e.target.value) 
        }} value={Name}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ISBN Number</Form.Label>
        <Form.Control type="text" placeholder="ISBN Number"  onChange={(e)=>{
           setisbnNumber(e.target.value) 
        }} value={isbnNumber} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Enter Price"  onChange={(e)=>{
           setPrice(e.target.value) 
        }} value={Price} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Cover Pic</Form.Label>
        <Form.Control type="file"   onChange={(e)=>{
           setCoverPic(e.target.files[0]) 
        }}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Create
      </Button>
    </Form>

    </div>
  )
}
