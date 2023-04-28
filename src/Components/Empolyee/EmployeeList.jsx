import React, { useState, useEffect } from 'react';
import axiosInc from '../Axios/Axios';
import { Button, Form, ButtonGroup, Row, Col } from 'react-bootstrap';
import DeleteEmployee from './DeleteEmployee';
import NewEmployee from './NewEmployee';
import UpdateEmployee from './UpdateEmployee';

export default function EmployeeList() {
    const [employee, setEmployee] = useState([]);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [newShow, setNewShow] = useState(false);
    const [empId, setEmpId] = useState(null);

    const fetchEmployees = async () => {
        const employeeData = JSON.parse(localStorage.getItem("employeeData"));
        const empRole = employeeData.employeeRole;
        try {
            const response = await axiosInc.get(`/user/all`)
            console.log(response.data);
            setEmployee(response.data);
        } catch (error) {
            console.log(error.response.data);
            setError('No Employee Found');
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleEmployee = (employeeId, modal) => {
        setEmpId(employeeId)
        if (modal === "Update")
            setShow(true)
        else if (modal === "Delete")
            setDeleteShow(true)
        else if (modal === "New")
            setNewShow(true)
    }

    return (
        <div>
            <Row className="text-left mb-3 mt-5 ms-3">
                <Col xs={10}>
                    <h2 >Users List</h2>
                </Col>
                <Col xs={2}>
                    <Button variant='outline-success' size='md'
                        onClick={() => handleEmployee(employee.employeeID, "New")} >
                        <i class="bi bi-person-plus">   </i>
                        New User
                    </Button>
                </Col>
            </Row>
            <Row>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th className='align-middle text-center'> User ID </th>
                            <th className='align-middle text-center'> User Email </th>
                            <th className='align-middle text-center'> User Name </th>
                            <th className='align-middle text-center'> Role </th>
                            <th className='align-middle text-center'> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map(employee => (
                            <tr key={employee.employeeID}>
                                <td className='align-middle text-center'> {employee.employeeID}</td>
                                <td className='align-middle text-center'> {employee.employeeEmail}</td>
                                <td className='align-middle text-center'> {employee.employeeName}</td>
                                <td className='align-middle text-center'> {employee.employeeRole}</td>

                                <td className='align-middle text-center'>
                                    <ButtonGroup >
                                        <Button variant="outline-success" size='sm' className='me-2'
                                            onClick={() => handleEmployee(employee.employeeID, "Update")}>
                                                <i class="bi bi-pencil-square"></i>
                                        </Button>
                                        <Button variant="outline-danger" size='sm'
                                            onClick={() => handleEmployee(employee.employeeID, "Delete")}>
                                            <i class="bi bi-trash-fill"></i>
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Row>
            {
                deleteShow &&
                <DeleteEmployee
                    show={deleteShow}
                    setShow={setDeleteShow}
                    employeeId={empId}
                />
            }
            {
                newShow &&
                <NewEmployee
                    show={newShow}
                    setShow={setNewShow}
                />
            }
            {
                show &&
                <UpdateEmployee
                    show={show}
                    setShow={setShow}
                    employeeId={empId}
                />
            }
        </div>
    )
}

