import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import EmployeeList from '../Empolyee/EmployeeList'
import { Col, Container, Row, Button, ButtonToolbar, InputGroup, FormControl } from 'react-bootstrap'

export default function Users() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <div className='sticky-top'>
              <Sidebar />
            </div>
          </Col>
          <Col xs={10} className='flex-column bg-light'>
            <Row className='p-2 ms-2 me-2'>
              <EmployeeList/>
            </Row>
          </Col>
        </Row >
      </Container >
    </>
  )
}
