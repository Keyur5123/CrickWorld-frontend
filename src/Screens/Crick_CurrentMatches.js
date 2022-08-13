import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Secondary_Header from "./Secondary_Header";
import NewsApi from "./NewsApi";
import { getTodaysDate } from "../Utils/DateAndTimeFormatter/getMatchDateAndTime";
import Current_Matches from './Current_Matches';
import Crick_CurrMatches_Card from "../Utils/Crick_CurrentMatches_Card/Crick_CurrMatches_Card";

function Crick_CurrentMatches(props) {

    const [data, setData] = useState([])
    const [apiStatus, setApiStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(5);

    useEffect(async () => {

        await fetch('https://apicricketlivescore.herokuapp.com/crick__currentMatches')
            .then(res => res.json())
            .then(res => {
                setApiStatus(res?.status);

                // setData(res?.data)

                res?.data?.filter((match) => match?.date == getTodaysDate())
                    .map((match_obj) => setData(data => [...data, match_obj]))

                // res?.data?.map((obj) => {
                //     if (obj?.date == getTodaysDate()) {
                //         setData(data => [...data, obj])
                //     }
                // })

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

                    {(apiStatus != 'failure' && data.length > 0) ?

                        <Col xs={12} md={8}>
                            <Crick_CurrMatches_Card matches={data} />
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