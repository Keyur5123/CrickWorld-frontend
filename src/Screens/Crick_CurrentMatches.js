import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Secondary_Header from "./Secondary_Header";
import NewsApi from "./NewsApi";
import { getTodaysDate } from "../Utils/DateAndTimeFormatter/getMatchDateAndTime";
import Current_Matches from './Current_Matches';
import Crick_CurrMatches_Card from "../Utils/Crick_CurrentMatches_Card/Crick_CurrMatches_Card";
import Loader from "../Utils/Loader"

function Crick_CurrentMatches(props) {

    const [data, setData] = useState([])
    const [apiStatus, setApiStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(5);

    useEffect(async () => {

        await fetch('http://localhost:5000/crick__currentMatches')
            .then(res => res.json())
            .then(res => {
                setApiStatus(res?.status);
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
                { isLoading && <Loader isLoading={isLoading}/> }

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