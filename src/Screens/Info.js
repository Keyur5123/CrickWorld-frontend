import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Spinner } from 'react-bootstrap';
import Match_Score_Sec_Header from './Match_Score_Sec_Header';
import { useParams } from 'react-router-dom';
import "../Css/Info.css";
import { googleAnalytics } from '../Utils/googleAnalytics/utils';
import Loader from '../Utils/Loader';

function Info(props) {

    const params = useParams();
    const [allMatchData, setAllMatchData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {

        googleAnalytics()

        await fetch('https://crickworld-backend51234.onrender.com/Info')
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

                {isLoading && <Loader isLoading={isLoading} />}

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