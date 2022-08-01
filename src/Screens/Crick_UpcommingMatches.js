import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import Secondary_Header from "./Secondary_Header";
import { getMatchDateAndTime } from "../Utils/DateAndTimeFormatter/getMatchDateAndTime";
import NewsApi from "./NewsApi";

function Crick_UpcommingMatches(props) {


    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        await fetch('https://api.cricapi.com/v1/matches?apikey=b99abe70-6a02-41ec-9741-b50347818ab4&offset=0')
            .then(res => res.json())
            .then(res => {
                console.log("res :- ", res);
                setData(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

    }, [])

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
                    <Col xs={12} md={8}>
                        {data &&
                            // data.filter((obj) => {
                            //     if (obj.date == Todays__Date) {
                            //         console.log("obj is :- ", obj);
                            //         return obj
                            //     }
                            // })
                                data.slice(0).reverse().map((obj, index) => (
                                    <div key={index} >
                                        {/* <Link to={`/match-score/${obj.id}`} className='text-decoration-none text-muted'> */}
                                            <Card className='mb-2 CurrentMatch__Card' >
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

                                        {/* </Link> */}
                                    </div>
                                ))
                        }

                    </Col>
                    <Col xm={12} md={4}>
                        <NewsApi />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Crick_UpcommingMatches;