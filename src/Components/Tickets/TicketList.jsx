import React, { useState, useEffect } from 'react';
import axiosInc from '../Axios/Axios';
import { Button, Card, Row, Col, ButtonToolbar, InputGroup, FormControl, Form, ButtonGroup } from 'react-bootstrap';
import UpdateTicket from './UpdateTicket';
import VIewTickets from './VIewTickets';
import DeleteTicket from './DeleteTicket';

export default function TicketList() {
    const [ticket, setTicket] = useState([]);
    const [categories, setCategories] = useState([]);
    const [assign, setAssign] = useState([]);
    const [error, setError] = useState(null);
    const [ticketId, setTicketId] = useState(null);
    const [show, setShow] = useState(false);
    const [viewShow, setViewShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [allTicketsCount, setAllTicketsCount] = useState([]);
    const [agingTicketCount, setAgingTicketCount] = useState([]);
    const [progressTicketCount, setProgressTicketCount] = useState([]);
    const [finishTicketCount, setFinishticketCount] = useState([]);
    const [newTicketCount, setNewTicketCount] = useState([]);

    const empData = JSON.parse(localStorage.getItem("employeeData"))
    const empRole = empData.employeeRole
    const empID = empData.employeeID

    const fetchTickets = async () => {
        try {
            let response
            if (empRole == "1") {
                response = await axiosInc.get(`/ticket/ticketByUserId/${empID}`)
            } else if (empRole == "2") {
                response = await axiosInc.get(`/ticket/getTicketByUser/${empID}`)
            } else if (empRole == "3") {
                response = await axiosInc.get(`/ticket/all`)
            }
            setTicket(response.data);
            setAllTicketsCount(response.data.length)

            const cateogryResponse = await axiosInc.get("/ticket/categories");
            setCategories(cateogryResponse.data);

            const assignResponse = await axiosInc.get("/user/all");
            setAssign(assignResponse.data)

            const progressResposnse = await axiosInc.get(`/ticket/started/${empID}`)
            setProgressTicketCount(progressResposnse.data.length)

            const finishResponse = await axiosInc.get(`/ticket/completed/${empID}`)
            setFinishticketCount(finishResponse.data.length)

            const newResponse = await axiosInc.get(`/ticket/new/${empID}`)
            setNewTicketCount(newResponse.data.length)

            const agingResponse = await axiosInc.get(`/ticket/getAgingByUser/${empID}`)
            setAgingTicketCount(agingResponse.data.length)

        } catch (error) {
            console.log(error.response.data);
            setError('No Employee Found');
        }
    };

    const fetchStartedTicket = async () => {
        try {
            const response = await axiosInc.get(`/ticket/started/${empID}`)
            setTicket(response.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const fetchNewTicket = async () => {
        try {
            const response = await axiosInc.get(`/ticket/new/${empID}`)
            setTicket(response.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const fetchFinishTicket = async () => {
        try {
            const response = await axiosInc.get(`/ticket/completed/${empID}`)
            setTicket(response.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }
    const fetchAgingTicket = async () => {
        try {
            const response = await axiosInc.get(`/ticket/getAgingByUser/${empID}`)
            setTicket(response.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const fetchAllTicket = async () => {
        try {
            const response = await axiosInc.get("/ticket/all")
            setTicket(response.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        fetchTickets()
            .then(() => {
            })
    }, []);

    const getCategoryNameById = (categoryId) => {
        const foundCategory = categories.find((c) => c.categoryId === categoryId);
        return foundCategory ? foundCategory.categoryName : '';
    };

    const getAssigneeNameById = (assigneeId) => {
        const foundAsignee = assign.find((a) => a.employeeID === assigneeId);
        return foundAsignee ? foundAsignee.employeeName : '';
    }

    const getTicketStatus = (statusId) => {
        const status = [
            { id: 1, name: 'New' },
            { id: 2, name: 'On Progress' },
            { id: 3, name: 'Finished' },
        ]
        const foundStatus = status.find((s) => s.id === statusId);
        return foundStatus ? foundStatus.name : '';
    }

    const getPriorityStatus = (priorityId) => {
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

    const handleTicket = (ticketId, modal) => {
        setTicketId(ticketId)
        if (modal === "Update")
            setShow(true)
        else if (modal === "View")
            setViewShow(true)
        else if (modal === "Delete")
            setDeleteShow(true)
    }

    return (
        <>
            <Row>
                <Col xs={8}>
                    <ButtonToolbar className='mb-3' aria-label='Toolbar with Button groups'>
                        <InputGroup className='sm-1 mx-2'>
                            <Button variant='outline-primary' id="button-addon1" onClick={fetchAllTicket}>All</Button>
                            <FormControl
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                style={{ width: '50px', border: '3px solid #007bff' }}
                                defaultValue={allTicketsCount}
                                disabled />
                        </InputGroup>

                        <InputGroup className='sm-1 mx-2'>
                            <Button variant='outline-primary' id="button-addon1" onClick={fetchAgingTicket} >Aging</Button>
                            <FormControl
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                style={{ width: '50px', border: '3px solid #007bff' }}
                                defaultValue={agingTicketCount}
                                disabled />
                        </InputGroup>

                        <InputGroup className='sm-1 mx-2'>
                            <Button variant='outline-primary' id="button-addon1" onClick={fetchStartedTicket}>Started</Button>
                            <FormControl aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                style={{ width: '50px', border: '3px solid #007bff' }}
                                defaultValue={progressTicketCount}
                                disabled />
                        </InputGroup>

                        <InputGroup className='sm-1 mx-2'>
                            <Button variant='outline-primary' id="button-addon1" onClick={fetchFinishTicket}>Finished</Button>
                            <FormControl aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                style={{ width: '50px', border: '3px solid #007bff' }}
                                defaultValue={finishTicketCount}
                                disabled />
                        </InputGroup>

                        <InputGroup className='sm-1 mx-2'>
                            <Button variant='outline-primary' id="button-addon1" onClick={fetchNewTicket}>New</Button>
                            <FormControl aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                style={{ width: '50px', border: '3px solid #007bff' }}
                                defaultValue={newTicketCount}
                                disabled />
                        </InputGroup>
                    </ButtonToolbar>
                </Col>

                <Col xs={4}>
                    <ButtonGroup size='sm'>
                        <InputGroup>
                            <Button variant='outline-primary'>Export File</Button>
                            <Form.Select>
                                <option value="">Choose...</option>
                                <option value="1">Aging Tickets According to Category</option>
                                <option value="2">Ticket Count Per Category</option>
                                <option value="3">Ticket Count Per HR Personnel</option>
                                <option value="4">Generate All Tickets</option>
                            </Form.Select>
                        </InputGroup>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row className='mb-3 mt-3'>
                <h2 className='ms-3'>Tickets</h2>
            </Row>
            <Row>
                <div className="row m-1">
                    {ticket.map((ticket) => (
                        <div key={ticket.ticketId} className="col-lg-4 col-md-6 mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{ticket.ticketName}</Card.Title>
                                    <Card.Text>
                                        Reporter: {' '}
                                        <span style={{
                                            fontWeight: 'bold', color:
                                                empID === ticket.employeeId
                                                    ? 'orange' : 'green'
                                        }}>
                                            {getAssigneeNameById(ticket.employeeId)}
                                        </span>
                                        <br />
                                        Assignee: {' '}
                                        <span style={{ fontWeight: 'bold', color: 'blue' }}>
                                            {getAssigneeNameById(ticket.assigneeId)}
                                        </span>
                                        <br />
                                        Category: {getCategoryNameById(ticket.ticketCategory)}
                                        <br />
                                        Priority: {getPriorityStatus(ticket.ticketPriority)}
                                        <br />
                                        Create Date: {ticket.creationDate}
                                        <br />
                                        Due Date: {ticket.dueDate}
                                        <br />
                                        Status: {' '}
                                        <span
                                            style={{
                                                color:
                                                    ticket.statusId === 1
                                                        ? 'green'
                                                        : ticket.statusId === 2
                                                            ? 'blue'
                                                            : 'red'
                                            }}
                                        >
                                            {getTicketStatus(ticket.statusId)}
                                        </span>
                                    </Card.Text>
                                    <Button
                                        variant="outline-primary"
                                        className="me-2"
                                        size="sm"
                                        onClick={() => handleTicket(ticket.ticketId, "View")}
                                    >
                                        <i class="bi bi-eye-fill"></i> View
                                    </Button>
                                    {empRole != "3" && (
                                        <>
                                            <Button
                                                variant="outline-success"
                                                className="me-2"
                                                size="sm"
                                                onClick={() => handleTicket(ticket.ticketId, "Update")}
                                            >
                                                <i className="bi bi-pencil-square"></i> Edit
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleTicket(ticket.ticketId, "Delete")}
                                            >
                                                <i className="bi bi-trash-fill"></i> Delete
                                            </Button>
                                        </>
                                    )}

                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                    {
                        show &&
                        <UpdateTicket
                            show={show}
                            setShow={setShow}
                            ticketId={ticketId}
                        />
                    }
                    {
                        viewShow &&
                        <VIewTickets
                            show={viewShow}
                            setShow={setViewShow}
                            ticketId={ticketId}
                        />
                    }
                    {
                        deleteShow &&
                        <DeleteTicket
                            show={deleteShow}
                            setShow={setDeleteShow}
                            ticketId={ticketId}
                        />
                    }
                </div>
            </Row>
        </>
    )
}

