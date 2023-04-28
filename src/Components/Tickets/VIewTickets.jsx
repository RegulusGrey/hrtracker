import React, { useEffect, useState } from 'react'
import { Button, Modal, Col, Form, Row, Figure } from 'react-bootstrap'
import axiosInc from '../Axios/Axios';

export default function VIewTickets(props) {
    const [ticket, setTicket] = useState([]);
    const [reporter, setReporter] = useState([]);
    const [category, setCategory] = useState([]);
    const [status, setStatus] = useState('');
    const { filePath, setFilePath } = useState('');

    const handleClose = () => props.setShow(false);

    const empdata = JSON.parse(localStorage.getItem("employeeData"))
    const empRole = empdata.employeeRole

    const downloadFile = () => {
        const filePathUrl = `http://localhost:3000/Attachments/${ticket.filePath}`
        const fileName = filePathUrl.split('/').pop()
        const download = document.createElement('a')
        download.href = filePathUrl
        download.setAttribute('download', fileName)
        document.body.appendChild(download)
        download.click()
    }

    const fetchTicket = async () => {
        try {
            const response = await axiosInc.get(`/ticket/ticketById/${props.ticketId}`)

            console.log(response.data)
            setTicket(response.data)

            const empResponse = await axiosInc.get("/user/all")

            console.log(empResponse.data)
            setReporter(empResponse.data)

            const catResponse = await axiosInc.get("/ticket/categories")

            console.log(catResponse.data)
            setCategory(catResponse.data)

        } catch (error) {
            console.log(error.response.data)
        }
    }

    const getReporterById = (empId, emp) => {
        const foundReporter = reporter.find((r) => r.employeeID === empId)
        if (emp === "name")
            return foundReporter && foundReporter.employeeName;
        else if (emp === "email")
            return foundReporter && foundReporter.employeeEmail;
        else if (emp === "Role")
            return foundReporter && foundReporter.employeeRole;
    }

    const getCategoryById = (categoryID) => {
        const foundCategory = category.find((c) => c.categoryId === categoryID)
        return foundCategory && foundCategory.categoryName
    }

    const getPriorityById = (priorityId) => {
        const priority = [
            { id: "1", name: 'Low' },
            { id: "2", name: 'Medium-Low' },
            { id: "3", name: 'Medium' },
            { id: "4", name: 'High' },
            { id: "5", name: 'Urgent' },
        ]
        const foundPriority = priority.find((p) => p.id === priorityId);
        return foundPriority ? foundPriority.name : '';
    }

    useEffect(() => {
        fetchTicket()
    }, []);

    const handleSubmit = async () => {
        console.log("Status: " + status)

        try {
            const response = await axiosInc.post(`ticket/status/${props.ticketId}`, {
                ticketId: props.ticketId,
                statusId: status
            })
            console.log(response.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                size='md'
                centered
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='me-4'>View Ticket</Modal.Title>
                    <Form.Text className='ms-5'>Tikcet #{ticket.ticketId} </Form.Text>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Row className='mb-1'>
                            <Col>
                                <Form.Group >
                                    <Form.Text className='fw-bold'>From : </Form.Text>
                                    <Form.Label className='fw-bold'>{getReporterById(ticket.employeeId, "name")}</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Text className='fw-bold'>Created Date : </Form.Text>
                                    <Form.Label className='fw-bold'>{ticket.creationDate}</Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col>
                                <Form.Group >
                                    <Form.Text className='fw-bold'>To : </Form.Text>
                                    <Form.Label className='fw-bold'>{getReporterById(ticket.assigneeId, "name")}</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Text className='fw-bold'>Due Date : </Form.Text>
                                    <Form.Label className='fw-bold'>{ticket.dueDate}</Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Form.Group>
                                <Form.Text className='fw-bold'>Category : </Form.Text>
                                <Form.Label className='fw-bold'>{getCategoryById(ticket.ticketCategory)}</Form.Label>
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group>
                                <Form.Text className='fw-bold'>Priority : </Form.Text>
                                <Form.Label className='fw-bold'>{getPriorityById(ticket.ticketPriority)}</Form.Label>
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group>
                                <Form.Label className='fw-bold'>Ticket Tittle</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ticket Tittle'
                                    defaultValue={ticket.ticketName}
                                    readOnly
                                >
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group>
                                <Form.Label className='fw-bold'>Ticket Description</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    type='text'
                                    rows={5}
                                    placeholder='Ticket Description'
                                    defaultValue={ticket.ticketDescription}
                                    readOnly
                                >
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label className='fw-bold'>Attachment File</Form.Label>
                                {ticket.filePath != null ? (
                                    <>
                                        <br />
                                        <Button size='sm' onClick={() => { downloadFile() }}>Download File</Button>
                                    </>
                                ) : (<></>)}
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>

                        {empRole == 2 && ticket.statusId == 1 ? (
                            <Button variant="success" type='submit' onClick={() => setStatus(2)}>Accept</Button>
                        ) : empRole == 2 && ticket.statusId == 2 ?
                            (<Button variant="success" type='submit' onClick={() => setStatus(3)}>Complete</Button>) : (<></>)}

                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    )
}
