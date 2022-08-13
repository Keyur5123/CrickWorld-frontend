import React, { useEffect, useState } from 'react';
import { getTodaysDate } from '../Utils/DateAndTimeFormatter/getMatchDateAndTime';
import Crick_CurrMatches_Card from "../Utils/Crick_CurrentMatches_Card/Crick_CurrMatches_Card";
import NewsApi from './NewsApi';
import Secondary_Header from "./Secondary_Header";
import { Col, Container, Row, Spinner } from 'react-bootstrap';

function Recent_Matches(props) {

    const [prevMatches, setPrevMatches] = useState([])
    const [apiStatus, setApiStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {

        await fetch('https://apicricketlivescore.herokuapp.com/crick__currentMatches')
            .then(res => res.json())
            .then(res => {
                setApiStatus(res?.status)
                res?.data?.map((obj) => {
                    if (obj?.date != getTodaysDate()) {
                        setPrevMatches(data => [...data, obj])
                    }
                })

                setIsLoading(false)
            })
            .catch(err => console.log(err?.message))
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

                    {(apiStatus != 'failure' && prevMatches.length > 0) &&
                        <Col xs={12} md={8}>
                            <Crick_CurrMatches_Card matches={prevMatches} />
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

export default Recent_Matches;