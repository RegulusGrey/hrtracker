import React, { useState } from 'react'
import { Button, Form, Modal, Row, Col } from 'react-bootstrap'
import exportFromJSON from 'export-from-json'
import axiosInc from '../Axios/Axios';

export default function ExportTicket(props) {
    const [validated, setValidated] = useState(false);
    const [category, setCategory] = useState('');
    const [dataExport, setDataExport] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [dateValid, setDateValid] = useState(false);
    const [HrEmployee, setHrEmployee] = useState('');

    const handleClose = () => props.setShow(false)

    const getFormattedDate = (date, format) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${month}/${day}/${year}`;
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else
            event.preventDefault();
        setValidated(true);

        const validateDate = new Date(dateFrom) >= new Date(dateTo)
        if (validateDate)
            setDateValid(true)

        //export for all tickets
        const exportType = exportFromJSON.types.csv
        try {
            const generateAllResponse = await axiosInc.post("/ticket/getAllTickets", {
                from: getFormattedDate(new Date(dateFrom)),
                to: getFormattedDate(new Date(dateTo))
            })
            console.log(generateAllResponse.data)
            const data = generateAllResponse.data
            const fileName = "Generate all Tickets"
            exportFromJSON({ data, fileName, exportType })
        } catch (error) {
            console.log(error.generateAllResponse.data)
        }

        //export for Aging by Category
        try {
            const agingResponse = await axiosInc.post("/ticket/getAgingByCategory", {
                categoryId: category,
                from: getFormattedDate(new Date(dateFrom)),
                to: getFormattedDate(new Date(dateTo))
            })
            console.log(agingResponse.data)
            const data = agingResponse.data
            const fileName = "Aging by category"
            exportFromJSON({ data, fileName, exportType })
        } catch (error) {
            console.log(error.agingResponse.data)
        }

        //export for count per Category
        try {
            // data for csv file
            const dataCategory = [
                { Category: 'Benefits', count: 0 },
                { Category: 'Payroll', count: 0 },
                { Category: 'Recruitment', count: 0 },
                { Category: 'Training', count: 0 },
                { Category: 'PES', count: 0 },
                { Category: 'Employee Relation', count: 0 },
                { Category: 'Memo', count: 0 },
                { Category: 'COE', count: 0 },
                { Category: 'Engagement', count: 0 },
                { Category: 'Policy', count: 0 },
                { Category: 'Others', count: 0 },
                { Category: 'HR Business Partner', count: 0 }
            ]

            for (let index = 0; index < dataCategory.length; index++) {

                const categoryCountResponse = await axiosInc.post("/ticket/getTicketCountPerCategory", {
                    categoryId: (index + 1),
                    from: getFormattedDate(new Date(dateFrom)),
                    to: getFormattedDate(new Date(dateTo))
                })
                dataCategory[index].count = categoryCountResponse.data
            }

            console.log(dataCategory);

            const data = dataCategory
            const fileName = "Count per category"
            exportFromJSON({ data, fileName, exportType })
        } catch (error) {
            console.log(error.categoryCountResponse.data)
        }
        //export for count per hr
        try {

            let hr = 5;
            const dataHr = [
                { "HR Employee": 'Saturnina Alvarez', count: 0 },
                { "HR Employee": 'Rejine Alquisa', count: 0 },
                { "HR Employee": 'Pelisa Jane Ligalig', count: 0 },
                { "HR Employee": 'Ma. Giselle Mabunga', count: 0 },
                { "HR Employee": 'Jasmine Patalinghug', count: 0 },
            ]

            for (let index = 0; index < dataHr.length; index++) {

                const hrCountResponse = await axiosInc.post("/ticket/getTicketCountPerHr", {
                    hrId: hr,
                    from: getFormattedDate(new Date(dateFrom)),
                    to: getFormattedDate(new Date(dateTo))
                })
                dataHr[index].count = hrCountResponse.data
                hr++;
            }

            console.log(dataHr)
            const data = dataHr
            const fileName = "Ticket Count per Hr"
            exportFromJSON({ data, fileName, exportType })
        } catch (error) {
            console.log(error.hrCountResponse.data)
        }
    }

    return (
        <>
            <Modal
                show={props.show}
                size='md'
                onHide={handleClose}
                backdrop="static"
                centered
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Export CSV File</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId='category' >
                                <Form.Label className='fw-bold'>Category</Form.Label>
                                <Form.Select required aria-label="Floating label select category"
                                    value={category}
                                    onChange={(event) => {
                                        setCategory(event.target.value)
                                    }}

                                >
                                    <option value="">Choose...</option>
                                    <option value="1">Benefits</option>
                                    <option value="2">Payroll</option>
                                    <option value="3">Recruitment</option>
                                    <option value="4">Training</option>
                                    <option value="5">PES</option>
                                    <option value="6">Employee Relation</option>
                                    <option value="7">Memo</option>
                                    <option value="8">COE</option>
                                    <option value="9">Engagement (RNR)</option>
                                    <option value="10">Policy</option>
                                    <option value="11">Others</option>
                                    <option value="12">HR Business Partner</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please select category.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId='DateCreate'>
                                <Form.Label className='fw-bold'>From</Form.Label>
                                <Form.Control
                                    required
                                    type='date'
                                    defaultValue={dateFrom}
                                    onChange={(event) => setDateFrom(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Control.Feedback type="invalid">
                                Please provide date from
                            </Form.Control.Feedback>
                            <Form.Group as={Col} md="6" controlId='DueDate'>
                                <Form.Label className='fw-bold'>To</Form.Label>
                                <Form.Control
                                    required
                                    type='date'
                                    value={dateTo}
                                    onChange={(event) => setDateTo(event.target.value)}
                                    isInvalid={dateValid}
                                />
                            </Form.Group>
                            <Form.Control.Feedback type="invalid">
                                {dateValid ? (<>Date to must not less than by date from</>) : (<>Please provide date To</>)}
                            </Form.Control.Feedback>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <Button variant='primary' type='submit' >Export File</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
