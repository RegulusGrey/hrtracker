import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import axiosInc from '../Axios/Axios';

export default function UpdateTicket(props) {
  const [validated, setValidated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAsignee, setSelectedAsignee] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [department, setDepartment] = useState('');
  const [Description, setDescription] = useState('');
  const [ticketName, setTicketName] = useState('');
  const [reporter, setReporter] = useState([]);
  const [dateCreation, setDateCreation] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  const [ticket, setTicket] = useState([]);

  const handleClose = () => props.setShow(false);

  const fetchTicket = async () => {
    try {
      const response = await axiosInc.get(`/ticket/ticketById/${props.ticketId}`);
      localStorage.setItem("ticketData", JSON.stringify(response.data))
      const localData = JSON.stringify(response.data)
      setTicket(JSON.parse(localData))

      const empResponse = await axiosInc.get("/user/all");
      setReporter(empResponse.data);

    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } 
    setValidated(true);

    console.log(getFormattedDate(new Date(dateCreation), "/"));
    console.log(getFormattedDate(new Date(dueDate), "/"));

    try {
      const response = await axiosInc.post(`/ticket/update/${props.ticketId}`, {
        ticketId: props.ticketId,
        ticketName: ticketName,
        ticketDescription: Description,
        ticketCategory: selectedCategory,
        ticketPriority: selectedPriority,
        dueDate: getFormattedDate(new Date(dueDate), "/"),
        employeeId: ticket.employeeId,
        assigneeId: selectedAsignee,
        creationDate: getFormattedDate(new Date(dateCreation), "/"),
        statusId: 1,
        filePath: file
      })
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getFormattedDate = (date, format) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    if (format === "/")
      return `${month}/${day}/${year}`;
    else if (format === "-")
      return `${year}-${month}-${day}`;
  }

  const getReporterNameById = (reporterId) => {
    const foundReporter = reporter.find((r) => r.employeeID === reporterId);
    return foundReporter && foundReporter.employeeName;
  }

  const getReporterEmailById = (reporterId) => {
    const foundReporter = reporter.find((r) => r.employeeID === reporterId);
    return foundReporter && foundReporter.employeeEmail;
  }

  const getReporterRoleById = (reporterId) => {
    const foundReporter = reporter.find((r) => r.employeeID === reporterId)
    const roleId = foundReporter && foundReporter.employeeRole
    const role = [
      { id: 1, name: 'Employee' },
      { id: 2, name: 'HR' },
      { id: 3, name: 'Admin' },
    ]
    const foundRole = role.find((s) => s.id === roleId);
    return foundRole && foundRole.name;
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log("file", file.name);
    setFile("C:\\Users\\MY PC\\OneDrive\Desktop\\Alliance project\\FrontEnd - Template\\HRTracker-backend\\Attachments\\" + file.name);
  };


  useEffect(() => {
    fetchTicket()
      .then(() => {
        const ticketData = JSON.parse(localStorage.getItem("ticketData"))
        setDateCreation(getFormattedDate(new Date(ticketData.creationDate), "-"))
        setDueDate(getFormattedDate(new Date(ticketData.dueDate), "-"))
        setSelectedAsignee(ticketData.assigneeId)
        setSelectedCategory(ticketData.ticketCategory)
        setSelectedPriority(ticketData.ticketPriority)
        setDescription(ticketData.ticketDescription)
        setTicketName(ticketData.ticketName)
        setFile(ticketData.filePath)
      })
  }, []);

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        size='xl'
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Ticket</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId='Username' >
                <Form.Label className='fw-bold'>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Name"
                  defaultValue={getReporterNameById(ticket.employeeId)}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId='category' >
                <Form.Label className='fw-bold'>Category</Form.Label>
                <Form.Select required aria-label="Floating label select category"
                  value={selectedCategory}
                  onChange={(event) => {
                    setSelectedCategory(event.target.value);
                    switch (event.target.value) {
                      case "1":
                      case "6":
                      case "7":
                      case "8":
                      case "10":
                      case "11":
                        setSelectedAsignee("5")
                        break;

                      case "2":
                        setSelectedAsignee("6")
                        break;

                      case "3":
                        setSelectedAsignee("7")
                        break;

                      case "4":
                      case "5":
                        setSelectedAsignee("8")
                        break;

                      case "9":
                      case "12":
                        setSelectedAsignee("9")
                        break;

                      default:
                        setSelectedAsignee("")
                        break;
                    }
                  }}
                  isValid={selectedCategory === ''}
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
              <Form.Group as={Col} md="6" controlId='Email'>
                <Form.Label className='fw-bold'>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter Email"
                  defaultValue={getReporterEmailById(ticket.employeeId)}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId='HR'>
                <Form.Label className='fw-bold'>HR Assignee</Form.Label>
                <Form.Select required aria-label="Floating label select HR"
                  value={selectedAsignee}
                  defaultValue={selectedAsignee}
                  onChange={(event) => setSelectedAsignee(event.target.value)}
                  isValid={selectedAsignee === ''}
                >
                  <option value="">Choose...</option>
                  <option value="5">Saturnina Alvarez</option>
                  <option value="6">Rejine Alquisa</option>
                  <option value="7">Pelisa Jane Ligalig</option>
                  <option value="8">Ma. Giselle Mabunga</option>
                  <option value="9">Jasmine Patalinghug</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select hr assign.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId='Department'>
                <Form.Label className='fw-bold'>Role</Form.Label>
                <Form.Control
                  type='text'
                  defaultValue={getReporterRoleById(ticket.employeeId)}
                  required
                  readOnly
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId='Priority'>
                <Form.Label className='fw-bold'>Priority</Form.Label>
                <Form.Select required aria-label="Floating label select example"
                  value={selectedPriority}
                  onChange={(event) => setSelectedPriority(event.target.value)}
                  isValid={selectedPriority === ''}
                >
                  <option value="">Choose...</option>
                  <option value="1">Low</option>
                  <option value="2">Medium-Low</option>
                  <option value="3">Medium</option>
                  <option value="4">High</option>
                  <option value="5">Urgent</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select priority
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId='DateCreate'>
                <Form.Label className='fw-bold'>Ticket Date Creation</Form.Label>
                <Form.Control
                  required
                  type='date'
                  defaultValue={dateCreation}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId='DueDate'>
                <Form.Label className='fw-bold'>Due Date</Form.Label>
                <Form.Control
                  required
                  type='date'
                  defaultValue={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  onInvalid={dateCreation >= dueDate}
                  placeholder="Select Date"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide date due
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId='TicketTittle'>
                <Form.Label className='fw-bold'>Ticket Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Ticket Tittle"
                  value={ticketName}
                  defaultValue={ticketName}
                  onChange={(event) => setTicketName(event.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide ticket tittle.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId='Attach File'>
                <Form.Label className='fw-bold'>Attach File</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileSelect}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId='Description'>
                <Form.Label className='fw-bold'>Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  type="text"
                  value={Description}
                  defaultValue={Description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Enter Ticket Description"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a description.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
