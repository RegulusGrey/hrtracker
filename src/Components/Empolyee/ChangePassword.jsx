import React from 'react'

export default function ChangePassword() {
    return (
        <>
            <div className='body text-center bg-secondary bg-opacity-25'>
                <div className="mt-5 form-signin">
                    {/* <img src={logo} className="logo mb-4" alt='Logo' /> */}
                    <h1 className='h3 mb-3 fw-normal'>Reset Password</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Floating>
                                <Form.Control
                                    placeholder='New Password'
                                    type="password"
                                    // value={newPass}
                                    // onChange={(event) => setNewPass(event.target.value)}
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
                                    // value={newPass}
                                    // onChange={(event) => setNewPass(event.target.value)}
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
                                    // value={confirmPass}
                                    // onChange={(event) => setConfirmPass(event.target.value)}
                                    required
                                />
                                <Form.Label htmlFor='floatingName'>Confirm Passowrd</Form.Label>
                            </Form.Floating>
                        </Form.Group>

                        {error && <Alert variant="danger">{error}</Alert>}
                        <Button className='w-100' size='lg' variant="primary" type="submit">
                            Save
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
