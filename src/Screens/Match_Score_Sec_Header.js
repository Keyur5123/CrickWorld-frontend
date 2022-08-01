import React from 'react';
import { Container, Nav, Navbar, Tab, Tabs } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useParams } from 'react-router-dom';
import "../Css/Secondary_Header.css";

function Match_Score_Sec_Header(props) {

    const params = useParams();

    var path = window.location.pathname;

    return (
        <Container>
            <div className='d-flex home mb-1'>

                {(path == `/match/${params.id}` || path == `/info/${params.id}`) ?
                    <>
                        <Nav variant="tabs" defaultActiveKey="home">
                            <Nav.Item>
                                <LinkContainer to={`/match/${params.id}`}>
                                    <Nav.Link eventKey="link-1" className="navLink__subHeader">ScoreBord</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer  to={`/info/${params.id}`}>
                                    <Nav.Link eventKey="link-2" className="navLink__subHeader">Info</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>

                    </>


                    :

                    <>
                        <Nav variant="tabs" defaultActiveKey="home">
                            <Nav.Item>
                                <LinkContainer to={`/match-score/${params.id}`}>
                                    <Nav.Link eventKey="link-1" className="navLink__subHeader">ScoreBord</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={`/squad/${params.id}`}>
                                    <Nav.Link eventKey="link-2" className="navLink__subHeader">Squads</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>

                    </>
                }

            </div>
            {/* <hr className='mt-0' /> */}
        </Container>
    );
}

export default Match_Score_Sec_Header;