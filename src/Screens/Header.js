import React from 'react';
import { Navbar, Container, Nav, NavLink } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../Css/Header.css";
import Secondary_Header from "./Secondary_Header"

function Header(props) {
    return (
        // className='position-fixed fixed-top' to add in navbar
        <div>
            <Navbar className='position-fixed fixed-top' bg="dark" variant="dark" expand="lg" collapseOnSelect >
                <Container className='Header'>
                    <Link to="/" className='text-decoration-none text-muted'>
                        <Navbar.Brand>
                            TATA IPL
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center basic-navbar-nav'>
                        <Nav className="ml-auto Header__options align-items-center">
                            <Link className='text-white text-decoration-none' to="/">MATCHES</Link>
                            <Link className='text-white text-decoration-none' to="/ipl-team-point">POINT TABLE</Link>
                            <Link className='text-white text-decoration-none' to="/contactus">CONTACT US</Link>
                            <Link className='text-white text-decoration-none' to="/ipl-news">NEWS</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
                <Secondary_Header />
        </div >
    );
}

export default Header;