import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useParams, Navigate, Route, useNavigate } from 'react-router-dom';
import Match_Score_Sec_Header from './Match_Score_Sec_Header';
import "../Css/Crick_scoreBoard.css"
import Crick_info from './Crick_info';
import NewsApi from './NewsApi';
import AlertBox from '../Utils/AlertBox/AlertBox';
// import { styled } from '@material-ui/styles';

function Cric_ScoreBoard(props) {

    const params = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [extra, setExtra] = useState([])
    const [score, setScore] = useState([])
    const [batsmans, setBatsmans] = useState([])
    const [bowlers, setBowlers] = useState([])
    const [teamInning, setTeamInning] = useState(1)
    const [teamScore, setTeamScore] = useState([])
    const [refresh, setRefresh] = useState(false)

    const [apiStatus, setApiStatus] = useState('')
    const [show, setShow] = useState(false);

    const setPlayer = (data, currTeamData) => {
        getBatsmans(data?.scorecard[currTeamData]?.batting)
        getBowlers(data?.scorecard[currTeamData]?.bowling)
        getExtra(data?.scorecard[currTeamData]?.extras)
        getCurrentTeamScore(data?.scorecard[currTeamData]?.totals)
        setIsLoading(false)
    }

    const getBatsmans = (bastmans) => {
        setBatsmans(bastmans)
    }

    const getBowlers = (bowlers) => {
        setBowlers(bowlers)
    }

    const getExtra = (extra) => {
        const arr = [];
        for (const key in extra) {
            arr.push(extra[key])
        }
        setExtra(arr)
    }

    const getCurrentTeamScore = (score) => {
        const arr = []
        arr.push({ over: score.O, run: score.R, wicket: score.W, runRate: score.RR })
        setScore(arr)
    }

    const setAllTeamsTotalScore = (Score) => {
        // console.log("Score :- ",Score);
        setTeamScore(Score)
        // if (teamScore.length == 0) {

        //     for (const addTeamScore of Score) {
        //         const TeamName = addTeamScore?.inning?.split(' Inning')[0]
        //         const arr = []

        //         arr.push({
        //             teamName: TeamName,
        //             runs: addTeamScore?.r,
        //             wickets: addTeamScore?.w,
        //             overs: addTeamScore?.o
        //         })

        //         setTeamScore(teamScore => [...teamScore, arr])
        //     }
        // }
    }

    const getVideos = () => {

        return (
            <video width="750" height="500" controls >
                <source src="https://api.talkies.tv/widget" type="video/mp4" />
            </video>
        )
        //  <script data-search="cricket" src="https://api.talkies.tv/widget"></script>
    }

    const getTeamAScore = (Team) => {
        // const a = `${Team?.teamName} ${Team?.runs} / ${Team?.wickets} (${Team?.overs})`
        return `${Team?.inning} - ${Team?.r} / ${Team?.w} (${Team?.o})`
    }

    const getTeamBScore = (Team) => {
        // const a = `${Team?.teamName} ${Team?.runs} / ${Team?.wickets} (${Team?.overs})`
        // console.log("a :- ", a);
        return `${Team?.inning} - ${Team?.r} / ${Team?.w} (${Team?.o})`
    }


    useEffect(async () => {
        
        await fetch('https://apicricketlivescore.herokuapp.com/crick__ScoreBoard', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: params.id })
        })
        .then(res => res.json())
        .then(res => {
            if (res?.status != "failure") {
                setIsLoading(true)
                    setData(res)
                    setPlayer(res, teamInning)
                    setAllTeamsTotalScore(res?.score)
                    setApiStatus(res?.status)
                }
                else {
                    setIsLoading(false)
                    setShow(true)
                }
            })
            .catch(err => console.log(err))

    }, [teamInning,refresh])

    useEffect(function () {
        setInterval(() => { 
            // if (apiStatus?.split(' ')[1] != "won" && apiStatus?.split(' ')[2] != "by") {
                // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,>>>>>>");
                setRefresh(current => !current);
            // }
        }, 3000);
    }, []) 

    return (
        <div>
            <Match_Score_Sec_Header />
            {apiStatus != 'failure' ? <div>
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
                        <Col xm={12} md={8} className="p-0">
                            {(data && data?.status != 'failure') ?
                                <div className="m-2">
                                    <div>

                                        <h4 className='mb-1'>{data.name}</h4>

                                        <h5 className='mb-4 mt-2 match__status'>{data?.status}</h5>

                                        {
                                            !isLoading &&
                                            <div>
                                                <div className='mt-3'>
                                                    {teamScore.length >= 2 &&
                                                        <div className='d-flex Team__Score__Buttons'>
                                                            <Row className='justify-content-center'>
                                                                <Col xs={5} >
                                                                    <button
                                                                        onClick={() => setTeamInning(0)}
                                                                        className={teamInning == 0 ? "SelectedTeam__Button" : 'UnSelectedTeam__Button'}
                                                                    >
                                                                        {getTeamAScore(teamScore[0])}
                                                                    </button>
                                                                </Col>
                                                                <Col xs={5} >
                                                                    <button
                                                                        className={teamInning == 1 ? "SelectedTeam__Button" : 'UnSelectedTeam__Button'}
                                                                        onClick={() => setTeamInning(1)}
                                                                    >
                                                                        {getTeamBScore(teamScore[1])}
                                                                    </button>
                                                                </Col>
                                                            </Row>




                                                        </div>
                                                    }

                                                    {teamScore.length > 0 ?? <h6>{getTeamAScore(teamScore[0][0])}</h6>}

                                                </div>

                                                <table className='mt-4' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                                                    <thead>
                                                        <tr style={{ backgroundColor: "#BC8CF2" }}>
                                                            <th>Batsmen</th>
                                                            <th className='player__status__row'></th>
                                                            <th>R</th>
                                                            <th>B</th>
                                                            <th>4s</th>
                                                            <th>6s</th>
                                                            <th>SR</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {batsmans && batsmans?.map((player, index) => {
                                                            var four = player[`4s`];
                                                            var six = player[`6s`];
                                                            var batsman_status = player[`dismissal-text`]
                                                            return (
                                                                <>
                                                                    {index % 2 == 0 ?
                                                                        <tr key={index}>
                                                                            <Link className="w-100 Link__PlayerInfo" to={`/match-score/profile/${player.batsman.id}`}> {batsman_status == "batting" ? <th style={{ color: 'purple' }} >{player.batsman.name}</th> : <th className='pt-1 pb-1 d-flex align-items-center'> {player.batsman.name} </th>} </Link>
                                                                            <td className='player__status__row'>{batsman_status}</td>
                                                                            <th>{player.r}</th>
                                                                            <td>{player.b}</td>
                                                                            <td>{four}</td>
                                                                            <td>{six}</td>
                                                                            <td>{player.sr}</td>
                                                                        </tr>
                                                                        :
                                                                        <tr key={index} style={{ backgroundColor: "whitesmoke" }}>
                                                                            <Link className="w-100 Link__PlayerInfo" to={`/match-score/profile/${player.batsman.id}`}>{batsman_status == "batting" ? <th style={{ color: 'purple' }} >{player.batsman.name}</th> : <th className='pt-1 pb-1 d-flex align-items-center'> {player.batsman.name} </th>} </Link>
                                                                            <td className='player__status__row'>{batsman_status}</td>
                                                                            <th>{player.r}</th>
                                                                            <td>{player.b}</td>
                                                                            <td>{four}</td>
                                                                            <td>{six}</td>
                                                                            <td>{player.sr}</td>
                                                                        </tr>
                                                                    }
                                                                    <tr className='player__status__col'>
                                                                        <td className='pt-1 pb-1' colSpan="6">{batsman_status}</td>
                                                                    </tr>

                                                                </>
                                                            )
                                                        })}

                                                    </tbody>
                                                </table>

                                            </div>
                                        }
                                    </div>

                                    <div className='mt-3'>
                                        {extra.length != 0 &&
                                            <div className='d-flex align-items-center'>
                                                <p className='ScoreBoard__title'>Extra :- </p>
                                                <p className='ScoreBoard__extra'>{extra[0]} (b {extra[1]}, lb {extra[2]}, nb {extra[3]}, p {extra[4]})</p>
                                            </div>
                                        }

                                        {score.length != 0 &&
                                            <div className='d-flex align-items-center'>
                                                <p className='ScoreBoard__title'>Score :- </p>
                                                <p className='ScoreBoard__score'>{score[0]?.run} / {score[0]?.wicket} ({score[0]?.over})</p>
                                            </div>
                                        }
                                    </div>

                                    <div className='mt-3 mb-3'>

                                        {
                                            !isLoading &&
                                            <table className='Score_Table' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                                                <thead>
                                                    <tr style={{ backgroundColor: "#BC8CF2" }}>
                                                        <th>Bollwers</th>
                                                        <th>O</th>
                                                        <th>R</th>
                                                        <th>W</th>
                                                        <th>M</th>
                                                        <th>ECO</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {bowlers && bowlers?.map((bowler, index) => (
                                                        <>
                                                            {index % 2 != 0 ?
                                                                <tr className='pt-1 pb-1 align-items-center' key={index} style={{ backgroundColor: "whitesmoke" }}>
                                                                    <Link className="Link__PlayerInfo" to={`/match-score/profile/${bowler.bowler.id}`}> <th className='pt-1 pb-1 align-items-center'>{bowler.bowler.name}</th> </Link>
                                                                    <td>{bowler.o}</td>
                                                                    <td>{bowler.r}</td>
                                                                    <th>{bowler.w}</th>
                                                                    <td>{bowler.m}</td>
                                                                    <td>{bowler.eco}</td>
                                                                </tr>
                                                                :
                                                                <tr key={index}>
                                                                    <Link className="Link__PlayerInfo" to={`/match-score/profile/${bowler.bowler.id}`}> <th className='pt-1 pb-1 align-items-center'>{bowler.bowler.name}</th> </Link>
                                                                    <td>{bowler.o}</td>
                                                                    <td>{bowler.r}</td>
                                                                    <th>{bowler.w}</th>
                                                                    <td>{bowler.m}</td>
                                                                    <td>{bowler.eco}</td>
                                                                </tr>
                                                            }
                                                        </>
                                                    ))}
                                                </tbody>

                                            </table>
                                        }
                                    </div>

                                    {data &&
                                        <div className='mb-4'>
                                            <Crick_info data={data} isLoading={isLoading} />
                                        </div>
                                    }

                                </div>
                                :
                                <>
                                    <AlertBox />
                                </>
                            }
                        </Col>
                        <Col xm={12} md={4}>
                            {/* {getVideos()}  */}
                            <NewsApi />

                        </Col>
                    </Row>
                </Container>
            </div>
                :
                <>
                    <Route path='/' element={<Navigate to="/" />} />
                </>
            }

        </div>
    );
}

export default Cric_ScoreBoard;