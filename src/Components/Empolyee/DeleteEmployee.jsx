import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axiosInc from '../Axios/Axios';

export default function DeleteEmployee(props) {

  const handleClose = () => props.setShow(false);

  const handleSubmit = async (event) => {
    try{
        const response = await axiosInc.get(`/user/delete/${props.employeeId}`)
        console.log(response.data)
    }catch(error){
        console.log(error.response.data)
    }
}
  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        centered
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header className='bg-primary bg-opacity-50'>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Label>Do you want to delete the user?</Form.Label>
          </Modal.Body>
          <Modal.Footer className='p-2'>
            <Button variant="danger" type="submit">Delete</Button>
            <Button variant="secondary" onClick={handleClose}>cancel</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
