import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Match_Score_Sec_Header from './Match_Score_Sec_Header';
import { useParams } from 'react-router-dom';
import "../Css/Info.css"

function Info(props) {

    const params = useParams();
    console.log("sdgs :- ", params.id);
    const [allMatchData, setAllMatchData] = useState([]);

    useEffect(async () => {
        await fetch('https://apicricketlivescore.herokuapp.com/Info')
            .then(res => res.json())
            .then(res => {
                setAllMatchData(res)
            }).catch(err => console.log(err.message))
    }, [])

    return (
        <Container>
            <div>
                <Match_Score_Sec_Header />
                {allMatchData && allMatchData.filter((obj) => {
                    console.log("obj", params.id);
                    return obj.MatchId == params.id
                }).map((obj, index) => {
                    let title;
                    if (obj.jsondata.title) {
                        title = JSON.parse(obj.jsondata).jsondata.title.split('\n')[10].substring(7)
                        console.log("objvsvsvvvfvs :- ", title);
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
                                        <p className='Info__Match'>{obj.Matchtime.split('at ')[1]}</p>
                                    </div>
                                    <div className='d-flex'>
                                        <p className='info__title'>Venue :- </p>
                                        <p className='Info__Match'>{obj.venue}</p>
                                    </div>
                                   
                                </div>
                            </Col>
                            <Col xm={12} md={4} >
                                <p>Advertisement</p>
                            </Col>
                        </Row>
                    )
                })}
            </div>
        </Container>
    );
}

export default Info;