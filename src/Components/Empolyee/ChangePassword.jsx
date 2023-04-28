import React, { useState } from 'react'
import { Form, Button, Alert } from "react-bootstrap";
import '../Pages/Login.css'
import axiosInc from '../Axios/Axios';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
    const [error, setError] = useState(null)
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [currentPass, setCurrentPass] = useState("")
    const navigate = useNavigate()

    const employeeData = JSON.parse(localStorage.getItem("employeeData"));

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (currentPass === employeeData.employeePassword){
                if (newPass === confirmPass) {
                
                    const empID = employeeData.employeeID;
                    const response = await axiosInc.post("/user/reset", {
                        employeeID: empID,
                        employeePassword: confirmPass
                    });
    
                    if (response.data !== null) {
                        console.log(response.data);
                        
                        setError("Success")    

                        setTimeout(() => {
                            navigate("/Login");
                        }, 2000);
                    }
                } else {
                    setError("Password does not match")
                }
            }setError("Wrong Current Password")
        } catch (error) {
            console.log(error.response.data);
        }
    }
    return (
        <>
            <div className='body text-center'>
                <div className="mt-5 form-changePassword">
                    <h1 className='h3 mb-3 fw-normal'>Change Password</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Floating>
                                <Form.Control
                                    placeholder='Current Passowrd'
                                    type="password"
                                    value={currentPass}
                                    onChange={(event) => setCurrentPass(event.target.value)}
                                    required
                                />
                                <Form.Label htmlFor='floatingName'>Current Password</Form.Label>
                            </Form.Floating>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Floating>
                                <Form.Control
                                    placeholder='New Password'
                                    type="password"
                                    value={newPass}
                                    onChange={(event) => setNewPass(event.target.value)}
                                    required
                                />
                                <Form.Label htmlFor='floatingName'>New Password</Form.Label>
                            </Form.Floating>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Floating>
                                <Form.Control
                                    placeholder='Confirm Password'
                                    type="password"
                                    value={confirmPass}
                                    onChange={(event) => setConfirmPass(event.target.value)}
                                    required
                                />
                                <Form.Label htmlFor='floatingName'>Confirm Passowrd</Form.Label>
                            </Form.Floating>
                        </Form.Group>

                        {error === "Success" ? <Alert variant="success">{error}</Alert> : error && <Alert variant="danger">{error}</Alert>}
                        <Button className='w-100' size='lg' variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}
