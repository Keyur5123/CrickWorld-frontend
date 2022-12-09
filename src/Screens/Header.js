import React from 'react';
import { Navbar, Container, Nav, NavLink } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../Css/Header.css";
import { LinkContainer } from 'react-router-bootstrap';

function Header(props) {
    return (
        <>
            <Navbar className='position-fixed fixed-top' bg="dark" variant="dark" expand="lg" collapseOnSelect >
                <Container className='Header'>
                    <Link to="/" className='text-decoration-none text-muted'>
                        <Navbar.Brand>
                            crickWorld
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav" className='nav__header text-center w-50 justify-content-around'>
                        <Nav className="ml-auto nav__header">
                            <Nav.Item>
                                <LinkContainer to="/">
                                    <Nav.Link>MATCHES</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/top-ranking-players">
                                    <Nav.Link eventKey="link-1">ICC RANKINGS</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/contactus">
                                    <Nav.Link eventKey="link-2">CONTACT US</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/cricket-news">
                                    <Nav.Link eventKey="link-3">NEWS</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/privacypolicy">
                                    <Nav.Link eventKey="link-4">PRIVACY POLICY</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;