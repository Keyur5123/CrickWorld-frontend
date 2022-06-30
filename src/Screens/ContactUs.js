import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Carousel, Col, Container, Form, Image, Row } from "react-bootstrap"
import "../Css/ContactUs.css"
import contactUs__Banner from "../Images/contactUs__Banner.jpg"

function Ipl_Teams(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [suggestions, setSuggestions] = useState('')

    const [contact, setContact] = useState({ name: '', email: '', suggestions: '' })
    const [isResponseSave, setIsResponseSave] = useState('')


    const handlerChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setContact({ ...contact, [name]: value })
    }

    const sendSuggestion = async (e) => {
        try {
            e.preventDefault();

            const { name, email, suggestions } = contact

            const res = await fetch('https://apicricketlivescore.herokuapp.com/contactUs', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, suggestions })
            })
                .then(res => res.json())
                .then(res => {
                    setContact({ name: '', email: '', suggestions: '' })
                    setIsResponseSave(res?.message)
                })


        } catch (error) {
            setIsResponseSave("Something wrong happening!...." + <br /> + "Please try again!....")
        }

    }

    return (
        <div>

            <div className='contactUs__Banner'>

                {/* <img
                    className="w-100 carousel"
                    src={contactUs__Banner}
                    alt="Banner"
                /> */}

                <Image className='carousel' src={contactUs__Banner} />
                <h2 className='centered mb-0'>Contact Us</h2>

            </div>

            <Container>

                {isResponseSave &&
                    <Alert className='mt-5' variant='success'>
                        <span role="img" aria-label="sad">{isResponseSave} 😃</span>
                    </Alert>
                }
                <div className='justify-content-center justify-items-center'>

                    <Row className="justify-content-md-center mt-3">
                        <Col sm={6}>
                            <Form onSubmit={sendSuggestion}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        name="name"
                                        value={contact.name}
                                        onChange={handlerChange}
                                        required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={contact.email}
                                        onChange={handlerChange}
                                        required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>How may we help you?</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Sent A Responce"
                                        name="suggestions"
                                        value={contact.suggestions}
                                        onChange={handlerChange}
                                        required />
                                </Form.Group>

                                <div className='mt-2 mb-3 justify-content-center d-flex'>
                                    <Button variant="primary" type="submit">
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