import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import "../Css/Secondary_Header.css";
import { LinkContainer } from 'react-router-bootstrap';

function Home(props) {

    return (
        <Container>
            <div className='d-flex home'>
                
                <Nav variant="tabs" defaultActiveKey="home">

                    <Nav.Item>
                        <LinkContainer to="/">
                            <Nav.Link eventKey="link-1" className="navLink__subHeader">Live</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>

                    <Nav.Item>
                        <LinkContainer to="/matches/upcomming-matches">
                            <Nav.Link eventKey="link-2" className="navLink__subHeader">Upcoming</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>

                </Nav>

            </div>
            {/* <hr className='mt-0' /> */}
        </Container>
    );
}

export default Home;