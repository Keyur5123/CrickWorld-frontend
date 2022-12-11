import React, { useState } from 'react';
import { Box, CircularProgress } from "@mui/material";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getMatchDateAndTime } from "../DateAndTimeFormatter/getMatchDateAndTime";
import "../Crick_CurrentMatches_Card/Crick_CurrMatches_Card.css"

function Crick_CurrMatches_Card({ matches, clicks }) {

    const [visible, setVisible] = useState(5);
    const [imgLoadedForTeamA, setImgLoadedForTeamA] = useState(false);
    const [imgLoadedForTeamB, setImgLoadedForTeamB] = useState(false);

    const isImageLoadedForTeamA = () => {
        setImgLoadedForTeamA(true)
    }

    const isImageLoadedForTeamB = () => {
        setImgLoadedForTeamB(true)
    }

    return (
        <div>
            {matches &&
                matches.slice(0, visible)
                    .map((obj, index) => (
                        <div key={index}>
                            <Box bgcolor={"background.default"} color={"text.primary"}>
                                <Link to={`/match-score/${obj?.id}`} className='text-decoration-none text-muted'>
                                    <Card className='mt-2 CurrentMatch__Card' >
                                        <Container className='CurrentMatch__Card__Container'>
                                            <Card.Text className='match__Info mb-1 mt-1'>{getMatchDateAndTime(obj?.dateTimeGMT)}</Card.Text>
                                            <hr className='m-0' />
                                            <Card.Body className='p-0 pt-2 pb-2'>
                                                <Row>
                                                    <Col xs={5}>
                                                        {obj?.teamInfo && <div className='d-flex-end align-items-center text-center'>
                                                            <img className='mb-1 CurrMatch__team1__img' variant="top" height="60px" src={obj?.teamInfo[0]?.img} onLoad={isImageLoadedForTeamA} alt={imgLoadedForTeamB === true ? 'Image' : ''} />
                                                            {!imgLoadedForTeamA && <CircularProgress className='image__loader' />}
                                                            <Card.Title className='TeamName'>{obj?.teamInfo[0]?.name}</Card.Title>
                                                        </div>}
                                                    </Col>
                                                    <Col xs={2} className='d-flex align-items-center justify-content-center'>
                                                        <div>
                                                            <Card.Title className='TeamName'>VS</Card.Title>
                                                        </div>
                                                    </Col>
                                                    <Col xs={5}>
                                                        {obj?.teamInfo && <div className='d-flex-center align-items-center text-center'>
                                                            <img variant="top" className='mb-1 CurrMatch__team2__img' height="60px" src={obj?.teamInfo[1]?.img} onLoad={isImageLoadedForTeamB} alt={imgLoadedForTeamB === true ? 'Image' : ''} />
                                                            {!imgLoadedForTeamB && <CircularProgress className='image__loader' />}
                                                            <Card.Title className='TeamName'>{obj?.teamInfo[1]?.name}</Card.Title>
                                                        </div>}
                                                    </Col>
                                                </ Row>
                                                <hr className='m-0 mb-2' />
                                                <Card.Text className='match__Info'>{obj?.venue}</Card.Text>
                                            </Card.Body>
                                        </Container>
                                    </Card>
                                </Link>
                            </Box>
                        </div>
                    ))}

            <div className='d-flex justify-content-center'>
                {visible <= matches.length &&
                    clicks % 2 === 0 ?
                    <a className='text-decoration-none' href="https://blogvioforyou.netlify.app/" target="_blank">
                        <button
                            className='loadMore__btn1 d-flex justify-content-center'
                            onClick={() => {
                                setVisible(visible + 5);
                                // setClicks(clicks + 1)
                                clicks = clicks+1 ;
                            }
                            }>
                            Load More Matches
                        </button>
                    </a>
                    :
                    visible <= matches.length && <button className='loadMore__btn1 d-flex justify-content-center' onClick={() => setVisible(visible + 5)}>Load More Matches</button>
                }
            </div>
        </div>
    );
}

export default Crick_CurrMatches_Card;