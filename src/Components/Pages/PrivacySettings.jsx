import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import ChangePassword from '../Empolyee/ChangePassword'
import { Col, Container, Row, Button, ButtonToolbar, InputGroup, FormControl } from 'react-bootstrap'


export default function PrivacySettings() {
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
                            <ChangePassword />
                        </Row>
                    </Col>
                </Row >
            </Container >
        </>
    )
}
