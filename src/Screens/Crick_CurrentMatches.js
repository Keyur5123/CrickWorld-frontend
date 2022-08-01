import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Secondary_Header from "./Secondary_Header";
import NewsApi from "./NewsApi";
import { getMatchDateAndTime } from "../Utils/DateAndTimeFormatter/getMatchDateAndTime";
import Current_Matches from './Current_Matches';
import { Box } from '@mui/system';

function Crick_CurrentMatches(props) {

    const [data, setData] = useState([])
    const [apiStatus, setApiStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(5);

    useEffect(async () => {

        await fetch('http://localhost:5000/crick__currentMatches')
            .then(res => res.json())
            .then(res => {
                setApiStatus(res?.status)

                res?.data?.map((obj) => {
                    // if (obj.date == Todays__Date) {
                    //     setData(data => [...data, obj])
                    // }
                    setData(data => [...data, obj])
                })

                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    let Todays__Date = new Date();
    var dd = String(Todays__Date.getDate()).padStart(2, '0');
    var mm = String(Todays__Date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = Todays__Date.getFullYear();

    Todays__Date = yyyy + '-' + mm + '-' + dd;

    return (
        <div>
            <Secondary_Header />
            <Container>
                {isLoading &&
                    <div className='mx-auto text-center mt-5 spinner Loader__Spinner'>
                        <Spinner animation="grow" variant="primary" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                        <Spinner animation="grow" variant="info" />
                        <Spinner animation="grow" variant="dark" />
                    </div>
                }

                <Row>
                    {(apiStatus != 'failure' && data.length > 0) ?
                        <Col xs={12} md={8}>
                            {data &&
                                data.slice(0, visible)
                                    .map((obj, index) => (
                                        <div key={index}>
                                            <Box bgcolor={"background.default"} color={"text.primary"}>
                                                <Link to={`/match-score/${obj.id}`} className='text-decoration-none text-muted'>
                                                    <Card className='mt-2 CurrentMatch__Card' >
                                                        <Container className='CurrentMatch__Card__Container'>
                                                            <Card.Text className='match__Info mb-1 mt-1'>{getMatchDateAndTime(obj.dateTimeGMT)}</Card.Text>
                                                            <hr className='m-0' />
                                                            <Card.Body className='p-0 pt-2 pb-2'>
                                                                <Row>
                                                                    <Col xs={5}>
                                                                        <div className='d-flex-end align-items-center text-center'>
                                                                            <img className='mb-1 CurrMatch__team1__img' variant="top" height="60px" src={obj.teamInfo[0].img} />
                                                                            <Card.Title className='TeamName'>{obj.teamInfo[0].name}</Card.Title>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={2} className='d-flex align-items-center justify-content-center'>
                                                                        <div>
                                                                            <Card.Title className='TeamName'>VS</Card.Title>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={5}>
                                                                        <div className='d-flex-center align-items-center text-center'>
                                                                            <img variant="top" className='mb-1 CurrMatch__team2__img' height="60px" src={obj.teamInfo[1].img} />
                                                                            <Card.Title className='TeamName'>{obj.teamInfo[1].name}</Card.Title>
                                                                        </div>
                                                                    </Col>
                                                                </ Row>
                                                                <hr className='m-0 mb-2' />
                                                                <Card.Text className='match__Info'>{obj.venue}</Card.Text>
                                                            </Card.Body>
                                                        </Container>
                                                    </Card>

                                                </Link>
                                            </Box>
                                        </div>
                                    ))
                            }

                            <div className='d-flex justify-content-center'>
                                {visible <= data.length &&
                                    <button className='loadMore__btn1 d-flex justify-content-center' onClick={() => setVisible(visible + 5)}>Load More Matches</button>
                                }
                            </div>
                        </Col>

                        :

                        <Col xs={12} md={8}>
                            <Current_Matches />
                        </Col>

                    }

                    <Col xm={12} md={4}>
                        <NewsApi />
                    </Col>

                </Row>
            </Container>
        </div>
    );
}

export default Crick_CurrentMatches;