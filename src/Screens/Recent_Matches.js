import React, { useEffect, useState } from 'react';
import { getTodaysDate } from '../Utils/DateAndTimeFormatter/getMatchDateAndTime';
import Crick_CurrMatches_Card from "../Utils/Crick_CurrentMatches_Card/Crick_CurrMatches_Card";
import NewsApi from './NewsApi';
import Secondary_Header from "./Secondary_Header";
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Loader from '../Utils/Loader';

function Recent_Matches(props) {

    const [prevMatches, setPrevMatches] = useState([])
    const [apiStatus, setApiStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [recentClicks, setRecentClicks] = useState(0)

    useEffect(async () => {
        
        await fetch('https://crickworld-backend51234.onrender.com/crick__currentMatches')
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

                {isLoading && <Loader isLoading={isLoading} />}

                <Row>

                    {(apiStatus != 'failure') && 
                        <Col xs={12} md={8}>
                            <Crick_CurrMatches_Card matches={prevMatches} />
                        </Col>
                    }

                    <Col xm={12} md={4}>
                        <NewsApi setClicks={setRecentClicks} clicks={recentClicks} />
                    </Col>

                </Row>
            </Container>
        </div>
    );
}

export default Recent_Matches;