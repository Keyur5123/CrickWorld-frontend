import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import "../Css/PlayerInfo.css"
import PlayerFormate__LaptopRecords from '../DeviceSizeScereens/Laptop_PlayerProfileScreen/PlayerFormate__LaptopRecords';
import PlayerFormate__MobileRecords from '../DeviceSizeScereens/Laptop_PlayerProfileScreen/Mobile_PlayerProfileScreen.js/PlayerFormate__MobileRecords';
import Alert from "../Utils/AlertBox/AlertBox"

function PlayerInfo(props) {

    const params = useParams();

    const [playerInfo, setPlayerInfo] = useState([]);
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [reset, SetReset] = useState(false);

    useEffect(async () => {
        await fetch('https://apicricketlivescore.herokuapp.com/player-info', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: params.id })
        })
            .then(res => res.json())
            .then(res => {
                setResponse(res?.warn)
                setPlayerInfo(res?.data);
                setIsLoading(false)
            })
            .catch(err => console.log(err))

        setTimeout(() => {
            if (!playerInfo && !response) {
                SetReset(!reset)
            }
        }, 3000)
    }, [reset])

    return (
        <>
            {isLoading &&
                <div className='Loader__Spinner'>
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="success" />
                    <Spinner animation="grow" variant="danger" />
                    <Spinner animation="grow" variant="warning" />
                    <Spinner animation="grow" variant="info" />
                    <Spinner animation="grow" variant="dark" />
                </div>
            }
            {!response ?
                <Container>
                    <div className='mt-5 mb-2'>
                        {playerInfo &&
                            // <Container>
                            <div className='d-flex Player__Info__Header'>
                                <img src={`${playerInfo?.playerImg}`} height="120px" className="Player__img rounded" />
                                <div className='Player__Name'>
                                    <h4 className='player__name'>{playerInfo?.name}</h4>
                                    <h5 className='Player__CountryName'>{playerInfo?.country}</h5>
                                </div>
                            </div>
                            // {/* </Container> */}
                        }
                    </div>


                    <div>
                        <Row>
                            <Col xs={12} md={4}>

                                {(playerInfo?.name || playerInfo?.dateOfBirth) && <hr className='playerInfo__devider' />}

                                <Container>
                                    {(playerInfo?.name || playerInfo?.dateOfBirth) && <h4 className='mb-3'>Personal Information</h4>}

                                    {playerInfo?.name && <div className='Player__personalInfo' id="Player__Name">
                                        <h6>Name</h6>
                                        <p>{playerInfo?.name}</p>
                                    </div>}

                                    {playerInfo?.country && <div className='Player__personalInfo' id="Player__Country">
                                        <h6>Country</h6>
                                        <p>{playerInfo?.country}</p>
                                    </div>}

                                    {playerInfo?.dateOfBirth && <div className='Player__personalInfo'>
                                        <h6>Born</h6>
                                        <p>{playerInfo?.dateOfBirth}</p>
                                    </div>}

                                    {playerInfo?.placeOfBirth && <div className='Player__personalInfo'>
                                        <h6>Birth  Place</h6>
                                        <p>{playerInfo?.placeOfBirth}</p>
                                    </div>}

                                    {playerInfo?.role && <div className='Player__personalInfo'>
                                        <h6>Role</h6>
                                        <p>{playerInfo?.role}</p>
                                    </div>}

                                    {playerInfo?.battingStyle && <div className='Player__personalInfo'>
                                        <h6>Batting Style</h6>
                                        <p>{playerInfo?.battingStyle}</p>
                                    </div>}

                                    {playerInfo?.bowlingStyle && <div className='Player__personalInfo'>
                                        <h6>Bowling Style</h6>
                                        <p>{playerInfo?.bowlingStyle}</p>
                                    </div>}

                                </Container>

                                {(playerInfo?.name || playerInfo?.dateOfBirth) && <hr className='mt-3 playerInfo__devider' />}

                            </Col>


                            <Col xs={12} md={8}>

                                {playerInfo?.stats &&
                                    <>
                                        <div className='PlayerFormate__LaptopRecords'>
                                            <PlayerFormate__LaptopRecords playerInfo={playerInfo} Category="batting" />
                                            <PlayerFormate__LaptopRecords playerInfo={playerInfo} Category="bowling" />
                                        </div>
                                        <div className='PlayerFormate__MobileRecords'>
                                            <PlayerFormate__MobileRecords playerInfo={playerInfo} Category="batting" />
                                            <PlayerFormate__MobileRecords playerInfo={playerInfo} Category="bowling" />
                                        </div>
                                    </>
                                }

                            </Col>
                        </Row>
                    </div>

                </Container>

                :

                <Alert />
            }
        </>
    );
}

export default PlayerInfo;