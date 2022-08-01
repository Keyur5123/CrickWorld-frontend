import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import Secondary_Header from "./Secondary_Header";
import "../Css/Upcomming_Matches.css";
import { googleAnalytics } from '../Utils/googleAnalytics/utils';
import { getUpcommingMatchesImages } from '../Utils/ImagesFromBuffer/getImagesFromBuffer';
import NewsApi from './NewsApi';

function Upcomming_Matches(props) {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(5);
    const [isLoading, setIsLoading] = useState(true);
    const [img, setImg] = useState([]);

    let curr_month;
    const date = new Date();

    const curr_date = date.getDate();  //21 

    curr_month = date.toLocaleString('en-us', { month: 'short' });  //'Mar'

    useEffect(async () => {

        googleAnalytics()

        await fetch('https://apicricketlivescore.herokuapp.com/matches/upcomming-matches')
            .then((res) => res.json())
            .then(res => {
                const temp = [].concat(res.AllMatch).sort((a, b) => a.Matchtime > b.Matchtime ? 1 : -1);
                setData(res.AllMatch)
                setIsLoading(false)

                for (let i = 0; i < temp.length; i++) {
                    if(temp[i].Matchtime.split(' at ')[0].split('-')[1] == curr_month){
                        // setData1(data1 => [...data1 , temp[i]])
                    }
                    getUpcommingMatchesImages(temp[i].TeamAImage, temp[i].TeamBImage, setImg)
                }
            })
            .catch(err => console.log(err))

    }, []);

    return (
        <div className='UpcommingMatch'>
            <Secondary_Header />
            <Container>
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
                <Row>
                    <Col xs={12} md={8}>
                        <div className='justify-items-center'>
                            {data.slice(0, visible).map((obj, index) => {
                                if (!obj) {
                                    <h3>No Matches Found!...</h3>
                                }

                                let TeamAImage, TeamBImage;
                                img.filter((obj1, index) => {
                                    if (obj1[0].TeamAImage == obj.TeamAImage) {
                                        TeamAImage = obj1[0].TeamAurl
                                        TeamBImage = obj1[0].TeamBurl
                                    }
                                })

                                return (
                                    <div key={index}>
                                        <div key={index}>
                                            <Card className='mt-2 UpcommingMatch__Card' style={{ boxShadow: "3px 6px 3px #b0a0c4" }}>
                                                <Container className='UpcommingMatch__Card__Container'>
                                                    <Card.Text className='mb-1 mt-1'>{obj.Matchtime}</Card.Text>
                                                    <hr className='m-0' />
                                                    <Card.Body className='p-0 pt-2 pb-2'>
                                                        <Row>
                                                            <Col xs={5}>
                                                                <div className='d-flex-end align-items-center text-center'>
                                                                    <img className='mb-1 UpcommingMatch__team1__img' variant="top" height="60px" src={TeamAImage} alt={obj.TeamAImage} />
                                                                    <Card.Title>{obj.TeamA}</Card.Title>
                                                                </div>
                                                            </Col>
                                                            <Col xs={2} className='d-flex align-items-center justify-content-center'>
                                                                <div>
                                                                    <Card.Title>VS</Card.Title>
                                                                </div>
                                                            </Col>
                                                            <Col xs={5}>
                                                                <div className='d-flex-center align-items-center text-center'>
                                                                    <img variant="top" className='mb-1 UpcommingMatch__team2__img' height="60px" src={TeamBImage} alt={obj.TeamBImage} />
                                                                    <Card.Title>{obj.TeamB}</Card.Title>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <hr className='m-0 mb-2' />
                                                        <Card.Text>{obj.Venue}</Card.Text>
                                                    </Card.Body>
                                                </Container>
                                            </Card>
                                        </div>
                                    </div>
                                )

                            })}
                        </div>
                        <div className='d-flex justify-content-center'>
                            {visible < data.length && (
                                <button className='loadMore__btn1 d-flex justify-content-center' onClick={() => setVisible(visible + 5)}>Load More Matches</button>
                            )}
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        <NewsApi />
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default Upcomming_Matches;