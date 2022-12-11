import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import "../Css/ScoreBoard.css";
import Match_Score_Sec_Header from './Match_Score_Sec_Header';
import { googleAnalyticsForScoreBoard } from '../Utils/googleAnalytics/utils';
import NewsApi from './NewsApi';
import Loader from '../Utils/Loader';

function Match_Score() {
    const params = useParams();

    const [teams, setTeams] = useState('')
    const [title, setTitle] = useState('')
    const [partnership, setPartnership] = useState('')
    const [last6Balls, setLast6Balls] = useState('')
    const [lastwicket, setLastWicket] = useState('')
    const [runRate, setRunRate] = useState('')
    const [matchStatus, setMatchStatus] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [result, setResult] = useState(true)

    const [teamA, setTeamA] = useState({
        teamAOver: '',
        teamAScore: '',
        teamAName: ''
    })

    const [teamB, setTeamB] = useState({
        teamBOver: '',
        teamBScore: '',
        teamBName: ''
    })

    const [firstInningScore, setFirstInningScore] = useState({
        FirstInningScore: '',
        FirstInningName: ''
    });

    const [bowlerData, setBowlerData] = useState([]);
    const [batsmanData, setBatsManData] = useState([]);

    // const [error,set]

    useEffect(async () => {

        await fetch('https://crickworld-backend51234.onrender.com/match-score/')
            .then(res => res.json())
            .then(res => {
                res.map((match) => {
                    if (match?.MatchId == params?.id) {
                        setTeams(`${match?.TeamA} VS ${match?.TeamB}`)
                        setTitle(match?.Title)
                        setResult(match?.Result)
                        getMatchDetails(match)
                        setIsLoading(false)
                    }
                })
            }).catch(err => console.log(err.message))


        setInterval(async () => {
            await fetch('https://crickworld-backend51234.onrender.com/match-score/')
                .then(res => res.json())
                .then(res => {
                    res.map((match) => {
                        if (match.MatchId == params.id) {
                            getMatchDetails(match)
                        }
                    })
                }).catch(err => console.log(err.message))
        }, 2000)

    }, [])

    useEffect(() => {
        if (teams) {
            googleAnalyticsForScoreBoard(teams)
        }
    })

    const getMatchDetails = async (match) => {
        var livedata = JSON.parse(match.jsondata.replaceAll('\n', '\\n')).jsondata

        const runrate = livedata.oversA != '0.0' ? String(Number(livedata.wicketA.split('/')[0]) / Number(livedata.oversA)).slice(0, 4) ?? '-' : ''
        const partnership = livedata?.partnership != "0(0)" ? livedata?.partnership : ''
        const Last6Balls = livedata.Last6Balls !== "-----" ? livedata.Last6Balls : ''

        getBatsMan(livedata)
        getBolwer(livedata)
        getRuns(livedata.teamA, livedata.teamB, livedata)
        setPartnership(partnership)
        setLast6Balls(Last6Balls)
        setRunRate(runrate)
        setLastWicket(livedata.lastwicket)
        setMatchStatus(livedata.score)
    }

    const getBolwer = async (livedata) => {
        var bolwersDetails = []
        for (let i = 1; i <= 8; i++) {
            if (livedata[`bowler${i}`] != "" && livedata[`bover${i}`] != '0' && livedata[`bowler${i}`] != undefined && livedata[`bowler${i}`].length != 0) {
                bolwersDetails.push({
                    desc: livedata[`bowler${i}`],
                    name: livedata[`bowler${i}`],
                    over: livedata[`bover${i}`],
                    run: livedata[`brun${i}`],
                    wicket: livedata[`bwicket${i}`],
                    eco: parseInt(livedata[`beco${i}`]) || (livedata[`bover${i}`] && String(livedata[`brun${i}`] / livedata[`bover${i}`]).substring(0, 4))
                })
            }
        }

        if (bolwersDetails.length != 0) {
            setBowlerData(bolwersDetails)
        }
        else {
            setBowlerData(bowlerData)
        }

    }

    const getBatsMan = async (livedata) => {
        const batsman = []
        for (let i = 0; i < 2; i++) {
            var name = livedata.batsman.split('|')[i]
            var runs = livedata.oversB.split('|');
            var playerRuns = parseInt(i == 0 ? runs[0].split(',')[1] : runs[0].split(',')[0])
            var playerBols = parseInt(i == 0 ? runs[1].split(',')[1] : runs[1].split(',')[0])

            if (name != '*') {
                batsman.push({
                    name: name,
                    runs: playerRuns,
                    bols: playerBols,
                    fours: i == 0 ? livedata.s4 : livedata.ns4,
                    sixs: i == 0 ? livedata.s6 : livedata.ns6,
                    sr: playerBols !== 0 ? String((playerRuns / playerBols) * 100).substring(0, 5) : '0'
                })
            }
        }

        if (batsman.length != 0) {
            setBatsManData(batsman)
        }
        else {
            setBatsManData(batsmanData)
        }

    }

    const getRuns = (TeamA, TeamB, livedata) => {
        if (livedata.wicketA != "0/0" && (livedata.wicketB == "0/0" || livedata.wicketB.length >= 9)) {

            setTeamA({
                teamAOver: livedata.oversA,
                teamAScore: livedata.wicketA,
                teamAName: TeamA
            })

            if (livedata.wicketB.length >= 9) {
                setFirstInningScore({
                    FirstInningScore: livedata.wicketB,
                    FirstInningName: TeamB
                })
            }
        }
        else if (livedata.oversB != "0,0|0,0") {
            setTeamB({
                teamBOver: livedata.oversB,
                teamBScore: livedata.wicketB,
                teamBName: TeamB
            })
        }
    }

    return (
        <div className='w-100 text-align-inherit'>
            <Match_Score_Sec_Header />
            <div className='mt-3'>
                <Container>
                    
                { isLoading && <Loader isLoading={isLoading}/> }

                    <Row>
                        <Col xm={12} md={8} className="p-0">
                            <div>
                                <Container>

                                    <div>
                                        <h4 className='mb-1'>{teams}</h4>
                                        <p className={'match__title mb-2'}>{title}</p>
                                        {(matchStatus && result) ? <h5 className='mb-5 mt-5 match__finished text-center'>Match Status :- {matchStatus}</h5> : (matchStatus && <h5 className='mb-3 mt-2 match__result text-center'>Match Status :- {matchStatus}</h5>) }
                                        {teamA.teamAScore && <h6 className='mt-1'>{teamA.teamAName} Score:- {teamA.teamAScore} ({teamA.teamAOver})</h6>}
                                        {firstInningScore.FirstInningScore && (<h6 className='mt-1'> {firstInningScore.FirstInningName} Score :- {firstInningScore.FirstInningScore} </h6>)}
                                        {teamB.teamBScore && <h6>{teamB.teamBName} Score :- {teamB.teamBScore} ({teamB.teamBOver})</h6>}

                                        {(!isLoading && batsmanData[0].name) &&
                                            <Table striped hover size="sm" cellSpacing="0" className='mt-4 Score_Table' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                                                <thead>
                                                    <tr style={{ backgroundColor: "#BC8CF2" }}>
                                                        <th>Batsmen</th>
                                                        <th>R</th>
                                                        <th>B</th>
                                                        <th>4s</th>
                                                        <th>6s</th>
                                                        <th>SR</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {batsmanData.map((player, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th>{player.name}</th>
                                                                <th>{player.runs}</th>
                                                                <th>{player.bols}</th>
                                                                <th>{player.fours}</th>
                                                                <th>{player.sixs}</th>
                                                                <th>{player.sr ?? '0'}
                                                                </th>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>}
                                    </div>

                                    {(!isLoading && (batsmanData[0]?.name || batsmanData[1]?.name) && bowlerData.length > 0) &&
                                        <div className='mt-3'>
                                            {partnership && <div className='d-flex '>
                                                <p className='Score_Extra_Title mb-1'>PARTNERSHIP :- </p>
                                                <p className='Match_Score_Total mb-1'>{partnership}</p>
                                            </div>}
                                            {last6Balls && <div className='d-flex '>
                                                <p className='Score_Extra_Title mb-1'>LAST 6 BALLS :- </p>
                                                <p className='Match_Score_Total mb-1'>{last6Balls}</p>
                                            </div>}
                                            {runRate && <div className='d-flex '>
                                                <p className='Score_Extra_Title mb-1'>RUN RATE :- </p>
                                                <p className='Match_Score_RunRate mb-1'>{runRate || '-'}</p>
                                            </div>}
                                            {lastwicket && <div className='d-flex '>
                                                <p className='Score_Extra_Title mb-1'>LAST WICKET :- </p>
                                                <p className='Match_Score_LastWicket mb-1'>{lastwicket}</p>
                                            </div>}
                                        </div>
                                    }

                                    <div className='mt-3 mb-3'>

                                        {(!isLoading && bowlerData.length > 0) &&
                                            <Table striped hover size="sm" cellSpacing="0" className='Score_Table' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                                                <thead>
                                                    <tr style={{ backgroundColor: "#BC8CF2" }}>
                                                        <th>Bollwers</th>
                                                        <th>O</th>
                                                        <th>R</th>
                                                        <th>W</th>
                                                        <th>ECO</th>
                                                    </tr>
                                                    {/* <tr>
                                                        {!bowlerData ? <th>Name</th> : <th></th>}
                                                        
                                                    </tr> */}
                                                </thead>
                                                <tbody>
                                                    {bowlerData && bowlerData.map((bowler, index) => (
                                                        <tr key={index}>
                                                            <th>{bowler.name}</th>
                                                            <th>{bowler.over}</th>
                                                            <th>{bowler.run}</th>
                                                            <th>{bowler.wicket}</th>
                                                            <th>{bowler.eco}</th>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>}
                                    </div>
                                </Container>
                            </div>
                        </Col>
                        <Col xm={12} md={4}>
                            <NewsApi />
                        </Col>
                    </Row>
                </Container>
            </div>



        </div>
    );
}

export default Match_Score;
