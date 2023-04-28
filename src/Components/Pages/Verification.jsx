import React, { useState } from 'react'
import { Form, Button, Alert } from "react-bootstrap";
import './Login.css'
import logo from '../../Assets/AllianceLogo.png'
import axiosInc from '../Axios/Axios';
import { useNavigate } from 'react-router-dom';


export default function Verification() {
    const [error, setError] = useState(null);
    const [vcCode, setVcCode] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axiosInc.post(`/user/verify/${vcCode}`)

            console.log(response)
            if (response.data) {

                setError("Success")

                setTimeout(() => {
                    navigate("/ResetPassword");
                }, 2000);
            }else 
                setError("Wrong Credentials")
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
                                    type="text"
                                    value={vcCode}
                                    onChange={(event) => setVcCode(event.target.value)}
                                    required
                                />
                                <Form.Label htmlFor='floatingName'>Enter Verification Code</Form.Label>
                            </Form.Floating>
                        </Form.Group>
                        {error === "Success" ? <Alert variant="Success">{error}</Alert> : error && <Alert variant="danger">{error}</Alert>}
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
