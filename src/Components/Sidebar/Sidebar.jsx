import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import logo from '../../Assets/AllianceLogo.png'
import icon from '../../Assets/alliance_icon.png'
import { Row } from 'react-bootstrap'
import NewTicket from '../Tickets/NewTicket'


export default function Sidebar() {
    const employeeData = JSON.parse(localStorage.getItem("employeeData"));
    const empID = employeeData.employeeID;
    const empName = employeeData.employeeName;
    const empEmail = employeeData.employeeEmail;
    const empRole = employeeData.employeeRole;
    return (
        <>
            <Row>
                <div className='bg-secondary bg-opacity-25 min-vh-100 d-flex justify-content-beetwen flex-column'>
                    <div>
                        <a className='text-decoration-none d-none d-sm-inline-flex  align-itemcenter mt-4'>
                            <img src={logo} className="logos d-sm-inline" alt='Logo' />
                        </a>
                        <a className='text-decoration-none d-inline-flex d-sm-none align-itemcenter mt-4'>
                            <img src={icon} className="icon d-sm-inline ms-2" alt='icon' />
                        </a>
                        <hr className='text-black' />
                        <ul className="nav nav-pills flex-column mt-3 mt-sm-3">
                            <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                                <a href="/Dashboard" className="nav-link text-black fs-5" aria-current="page">
                                    <i className='bi bi-speedometer2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item fs-4 my-1 py-2 py-sm-0">
                                <div>
                                    <NewTicket />
                                </div>
                            </li>
                            {empRole == "3" && (
                                <>
                                    <hr className='text-black' />
                                    <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                                        <span className='text-secondary ms-5 d-none d-sm-inline fs-4'>Admin</span>
                                    </li>
                                    <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                                        <a href="/Users" className="nav-link text-black fs-5" aria-current="page">
                                            <i className="bi bi-people"></i>
                                            <span className='ms-2 d-none d-sm-inline'>Users</span>
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <div className="dropdown open mt-auto">
                        <a className="text-decoration-none text-black dropdown-toggle p-3" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <i className='bi bi-person-circle'></i><span className='ms-3 d-none d-sm-inline'>{empName}</span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="triggerId">
                            <a className="dropdown-item" href="#">
                                <span className='d-xl-none'>{empID}</span>
                                <span className='d-none d-sm-block'>{empID}</span></a>
                            <a className="dropdown-item" href="/UpdateEmployee">
                                <span className='d-xl-none'>Change Password</span>
                                <span className='d-none d-sm-block'>Change Password</span></a>
                            <a className="dropdown-item" href="#">
                                <span className='d-xl-none'>{empEmail}</span>
                                <span className='d-none d-sm-block'>{empEmail}</span></a>
                            <a className="dropdown-item" href="/Login">
                                <span className='d-xl-none text-danger'>Logout</span>
                                <span className='d-none d-sm-block text-danger text-left font-weight-bold'>Logout</span></a>
                        </div>
                    </div>
                </div>
            </Row>
        </>
    )
}
