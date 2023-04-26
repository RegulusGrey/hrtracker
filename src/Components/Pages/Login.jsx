import React, { useState } from 'react'
import logo from '../../Assets/AllianceLogo.png'
import './Login.css'
import { Form, Button, Alert } from "react-bootstrap";
import axiosInc from "../Axios/Axios";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInc.post("/user/login", {
                employeeEmail: email,
                employeePassword: password,
            });

            console.log(response.data);

            if (response.data !== "Invalid email or password") {
                // Store employee data in local storage
                localStorage.setItem("employeeData", JSON.stringify(response.data));

                setTimeout(() => {
                    navigate("/Dashboard");
                }, 2000);
            } else {
                setError(response.data);
            }

        } catch (error) {
            console.log(error.response.data)
        }
    }
    return (
        <>
            <div className='body text-center bg-secondary bg-opacity-25'>
                <div className="mt-5 form-signin">
                    <img src={logo} className="logo mb-4" alt='Logo' />
                    <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Floating>
                                <Form.Control
                                    placeholder='Email'
                                    type="text"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                                <Form.Label htmlFor='floatingName'>Email</Form.Label>
                            </Form.Floating>
                        </Form.Group>
                        <Form.Group>
                            <Form.Floating>
                                <Form.Control
                                    placeholder='Password'
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                                <Form.Label htmlFor='floatingName'>Password</Form.Label>
                            </Form.Floating>
                        </Form.Group>
                        <div className='mt-1 mb-4 '>
                            <Link to="/ForgotPassword">
                                Forgot Password?
                            </Link>
                        </div>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Button className='w-100' size='lg' variant="primary" type="submit">
                            Login
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
