import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import TicketList from '../Tickets/TicketList'
import { Col, Container, Row, Button, ButtonToolbar, InputGroup, FormControl } from 'react-bootstrap'

export default function Dashboard() {
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
            <h1 className='pt-5 ps-3'>Dashboard</h1>
            <Row className='p-2 ms-2 me-2'>
              <TicketList />
            </Row>
          </Col>
        </Row >
      </Container >
    </>
  )
}
