import React from 'react';
import { Navbar, Container, Nav, NavLink } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../Css/Header.css";
import Secondary_Header from "./Secondary_Header"
import { LinkContainer } from 'react-router-bootstrap';

function Header(props) {
    return (
        <>
            <Navbar className='position-fixed fixed-top' bg="dark" variant="dark" expand="lg" collapseOnSelect >
                <Container className='Header'>
                    <Link to="/" className='text-decoration-none text-muted'>
                        <Navbar.Brand>
                            TustB
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {/* <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center basic-navbar-nav'>
                        <Nav className="ml-auto Header__options align-items-center">
                            <Link className='text-white text-decoration-none' to="/">MATCHES</Link>
                            <Link className='text-white text-decoration-none' to="/top-ranking-players">ICC RANKINGS</Link>
                            <Link className='text-white text-decoration-none' to="/contactus">CONTACT US</Link>
                            <Link className='text-white text-decoration-none' to="/cricket-news">NEWS</Link>
                            <Link className='text-white text-decoration-none' to="/privacypolicy">PRIVACY POLICY</Link>
                        </Nav>
                    </Navbar.Collapse> */}

                    {/* <Navbar.Collapse id="basic-navbar-nav text-center" className='nav__header'>
                        <Nav className="ml-auto ">
                            <LinkContainer to="/">
                                <Nav.Link >MATCHES</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/top-ranking-players">
                                <Nav.Link >ICC RANKINGS</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/contactus">
                                <Nav.Link >CONTACT US</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/cricket-news">
                                <Nav.Link >NEWS</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/privacypolicy">
                                <Nav.Link >PRIVACY POLICY</Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse> */}
                    <Navbar.Collapse id="basic-navbar-nav text-center" className='nav__header'>
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