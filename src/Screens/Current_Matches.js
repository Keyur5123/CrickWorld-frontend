import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import Secondary_Header from "./Secondary_Header";
import "../Css/Current_Matches.css";
import { Link } from 'react-router-dom';
import { googleAnalytics } from '../Utils/googleAnalytics/utils';
import { getImages } from '../Utils/ImagesFromBuffer/getImagesFromBuffer';
import NewsApi from "./NewsApi";

function Current_Matches() {
    const [data1, setData1] = useState([]);
    const [img, setImg] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {

        googleAnalytics()

        await fetch('https://apicricketlivescore.herokuapp.com/matches/current-matches')
            .then((res) => res.json())
            .then(res => {
                const temp = [].concat(res).sort((a, b) => a.Matchtime > b.Matchtime ? 1 : -1);
                setData1(temp)
                for (let i = 0; i < temp.length; i++) {
                    getImages(temp[i].TeamAImage, temp[i].TeamBImage, temp[i].MatchId, setImg)
                }
            })
            .catch(err => console.log(err))
    }, []);

    let Todays__Date = new Date();
    var dd = String(Todays__Date.getDate()).padStart(2, '0');
    var mm = String(Todays__Date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = Todays__Date.getFullYear();

    Todays__Date = dd + '-' + mm + '-' + yyyy;


    const getFormattedDate = (str) => {

        if (str.split(' ')[0] == (new Date()).toString().split(' ')[1]) {
            return str
        }

        return str ? str.split(' ')[0] + " : " + str.split(' ')[2].split('-')[0] : ''
    }



    // const arrayBufferToBase64 = (buffer) => {
    //     var binary = '';
    //     var bytes = [].slice.call(new Uint8Array(buffer));
    //     bytes.forEach((b) => binary += String.fromCharCode(b));
    //     return window.btoa(binary);
    // }

    // const getImages = async (TeamAImage, TeamBImage, matchId, setImg) => {
    //     const arr = []

    //     await fetch(`http://localhost:5000/matches/get-images/${TeamAImage}/${TeamBImage}`, {
    //         method: "POST",
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             var base64Flag = 'data:image;base64,';

    //             var imageAStr = arrayBufferToBase64(res.TeamAImage.data);
    //             var TeamAurl = base64Flag + imageAStr

    //             var imageBStr = arrayBufferToBase64(res.TeamBImage.data);
    //             var TeamBurl = base64Flag + imageBStr

    //             arr.push({ matchId: matchId, TeamAurl: TeamAurl , TeamBurl: TeamBurl })
    //             setImg(img => [...img,arr ] )
    //         })
    //         .catch(err => console.log(">>>>> ", err.message))
    // }

    return (
        <div className='CurrentMatch'>
            {/* {isLoading &&
                <div className='mx-auto text-center mt-5 spinner Loader__Spinner'>
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="success" />
                    <Spinner animation="grow" variant="danger" />
                    <Spinner animation="grow" variant="warning" />
                    <Spinner animation="grow" variant="info" />
                    <Spinner animation="grow" variant="dark" />
                </div>
            } */}
            <div className='justify-items-center'>
                {data1 &&
                    data1
                        .filter((obj) => {
                            if (!obj) {
                                return <h2>Today is not any match!...</h2>
                            }
                            return (obj.MatchDate) === Todays__Date
                        })
                        .map((obj, index) => {
                            let TeamAImage, TeamBImage;
                            img.filter((obj1, index) => {
                                if (obj1[0].matchId == obj.MatchId) {
                                    TeamAImage = obj1[0].TeamAurl
                                    TeamBImage = obj1[0].TeamBurl
                                }
                            })
                            return (<div key={index} className="CurrentMatch__Card">
                                <Link to={`/match/${obj.MatchId}`} className='text-decoration-none text-muted'>
                                    <div key={index}>
                                        <Card className='mt-2 CurrentMatch__Card' >
                                            <Container className='CurrentMatch__Card__Container'>
                                                <Card.Text className='match__Info mb-1 mt-1'> {getFormattedDate(obj.Matchtime)} </Card.Text>
                                                <hr className='m-0' />
                                                <Card.Body className='p-0 pt-2 pb-2'>
                                                    <Row>
                                                        <Col xs={5}>
                                                            <div className='d-flex-end align-items-center text-center'>
                                                                <img className='mb-1 CurrMatch__team1__img' variant="top" height="60px" src={TeamAImage} alt={obj.TeamAImage} />
                                                                <Card.Title className='TeamName'>{obj.TeamA}</Card.Title>
                                                            </div>
                                                        </Col>
                                                        <Col xs={2} className='d-flex align-items-center justify-content-center'>
                                                            <div>
                                                                <Card.Title className='TeamName'>VS</Card.Title>
                                                            </div>
                                                        </Col>
                                                        <Col xs={5}>
                                                            <div className='d-flex-center align-items-center text-center'>
                                                                <img variant="top" className='mb-1 CurrMatch__team2__img' height="60px" src={TeamBImage} alt={obj.TeamBImage} />
                                                                <Card.Title className='TeamName'>{obj.TeamB}</Card.Title>
                                                            </div>
                                                        </Col>
                                                    </ Row>
                                                    <hr className='m-0 mb-1' />
                                                    <Card.Text className='match__Info'>{obj.venue}</Card.Text>
                                                </Card.Body>
                                            </Container>
                                        </Card>

                                    </div>
                                </Link>
                            </div>)

                        }
                        )}
            </div>
        </div>

    );

}

export default Current_Matches;
