import React, { useState } from 'react'
import { Form, Button, Alert } from "react-bootstrap";
import './Login.css'
import logo from '../../Assets/AllianceLogo.png'
import axiosInc from '../Axios/Axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInc.post("/user/forgot", {
        employeeEmail: email
      });

      console.log(response.data);

      if (response.data !== "Email not registered") {
        localStorage.setItem("employeeData", JSON.stringify(response.data));
        
        setError("Verification Sent");

        setTimeout(() => {
          navigate("/Verification");
        }, 2000);
      } else {
        setError(response.data);
      }

    } catch (error) {
      console.log(error.response.data);
    }
  }
  return (
    <>
      <div className='body text-center bg-secondary bg-opacity-25'>
        <div className="mt-5 form-signin">
          <img src={logo} className="logo mb-4" alt='Logo' />
          <h1 className='h3 mb-3 fw-normal'>Forgot Password?</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Floating>
                <Form.Control
                  placeholder='Email'
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <Form.Label htmlFor='floatingName'>Email</Form.Label>
              </Form.Floating>
            </Form.Group>
            {error === "Verification Sent" ? <Alert variant="success">{error}</Alert> : error && <Alert variant="danger">{error}</Alert>}
            <Button className='w-100' size='lg' variant="primary" type="submit">
              Verify
            </Button>
            <Form.Text>
              &copy; Group-4
            </Form.Text>
          </Form>
        </div>
      </div>
    </>
  )
}
