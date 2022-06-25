import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Container, Form, Image, Row } from "react-bootstrap"
import "../Css/ContactUs.css"

function Ipl_Teams(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [suggestions, setSuggestions] = useState('')

    useEffect(async () => {

    })

    async function sendSuggestion() {
        try {
            const eee = await fetch('https://apicricketlivescore.herokuapp.com/contactUs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ name, email, suggestions })
        })
        console.log("fdsffdf",eee);
        } catch (error) {
            console.warn("error occure :- ",error)
        }
        
    }

    return (
        <div>
            <img
                className="carousel d-block w-100"
                //, filter: brightness(50%)
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzAv5yZ96H06spu2rAXYpSLuHOR_saRxM58w&usqp=CAU"
                alt="First slide"
                height="300px"
            />

            <Container>
                <div className='justify-content-center justify-items-center'>
                    <h3 className='text-center mt-3'>Contact Us</h3>
                    <Row className="justify-content-md-center mt-3">
                        <Col sm={6}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicName" onChange={(e) => setName(e.target.value)}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e) => setEmail(e.target.value)}>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => setSuggestions(e.target.value)}>
                                    <Form.Label>How may we help you?</Form.Label>
                                    <Form.Control type="text" placeholder="Sent A Responce" />
                                </Form.Group>

                                <div className='mt-2 mb-2 justify-content-center d-flex'>
                                    <Button variant="primary" type="submit" onClick={sendSuggestion}>
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>

            </Container>
        </div>
    );
}

export default Ipl_Teams;