import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import axiosInc from '../Axios/Axios';

export default function UpdateEmployee(props) {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleClose = () => props.setShow(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    try {
      const response = await axiosInc.post("/user/create", {
        employeeEmail: email,
        employeeName: name,
        employeePassword: password,
        employeeRole: role
      })
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    setPassword("12345")
  }, []);
  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        size='md'
        centered
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header >
          <Modal.Title>New Employee</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Form.Label className='fw-bold'>Email</Form.Label>
              <Form.Control
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter Email"
              />
              <Form.Control.Feedback type="invalid">
                Please provide an email.
              </Form.Control.Feedback>
            </Row>
            <Row>
              <Form.Label className='fw-bold'>Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter Name"
              />
              <Form.Control.Feedback type="invalid">
                Please provide an anme.
              </Form.Control.Feedback>
            </Row>
            <Row>
              <Form.Group>
                <Form.Label className='fw-bold'>Role</Form.Label>
                <Form.Select required aria-label="Floating label select HR"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="1">Employee</option>
                  <option value="2">HR</option>
                  <option value="3">Admin</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select hr assign.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer className='p-2'>
            <Button variant="primary" type="submit">Save</Button>
            <Button variant="secondary" onClick={handleClose}>cancel</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
