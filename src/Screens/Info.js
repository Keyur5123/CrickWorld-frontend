import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Spinner } from 'react-bootstrap';
import Match_Score_Sec_Header from './Match_Score_Sec_Header';
import { useParams } from 'react-router-dom';
import "../Css/Info.css";
import { googleAnalytics } from '../googleAnalytics/utils';

function Info(props) {

    const params = useParams();
    const [allMatchData, setAllMatchData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {

        googleAnalytics()

        await fetch('https://apicricketlivescore.herokuapp.com/Info')
            .then(res => res.json())
            .then(res => {
                setAllMatchData(res)
                setIsLoading(false)
            }).catch(err => console.log(err.message))
    }, [])

    return (
        <Container>
            <div>
                <Match_Score_Sec_Header />

                {isLoading &&
                    <div className='mx-auto text-center mt-5 spinner'>
                        <Spinner animation="grow" variant="primary" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                        <Spinner animation="grow" variant="info" />
                        <Spinner animation="grow" variant="dark" />
                    </div>
                }

                {allMatchData && allMatchData.filter((obj) => {
                    return obj.MatchId == params.id
                }).map((obj, index) => {
                    let title;
                    if (obj.jsondata.title) {
                        title = JSON.parse(obj.jsondata).jsondata.title.split('\n')[10].substring(7)
                    }

                    return (
                        <Row>
                            <Col xm={12} md={8} >
                                <div className='Info'>
                                    <div className='d-flex'>
                                        <p className='info__title'>Match :- </p>
                                        <p className='Info__Match'>{obj.TeamA} vs {obj.TeamB}</p>
                                    </div>
                                    <div className='d-flex'>
                                        <p className='info__title'>Date :- </p>
                                        <p className='Info__Match'>{obj.MatchDate}</p>
                                    </div>
                                    <div className='d-flex'>
                                        <p className='info__title'>Toss :- </p>
                                        {title ? <p className='Info__Match'>{title}</p> : <p className='Info__Match'>Not Due</p>}
                                    </div>
                                    <div className='d-flex'>
                                        <p className='info__title'>Time :- </p>
                                        <p className='Info__Match'>{obj.Matchtime.split('at ')}</p>
                                    </div>
                                    <div className='d-flex'>
                                        <p className='info__title'>Venue :- </p>
                                        <p className='Info__Match'>{obj.venue}</p>
                                    </div>
                                   
                                </div>
                            </Col>
                        </Row>
                    )
                })}
            </div>
        </Container>
    );
}

export default Info;