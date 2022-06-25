import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router-dom';
import "../Css/ScoreBoard.css";
import Match_Score_Sec_Header from './Match_Score_Sec_Header';
import _ from 'lodash';

function Match_Score() {
    const params = useParams();

    const [teams, setTeams] = useState('')
    const [title, setTitle] = useState('')
    const [result, setResult] = useState('')
    const [partnership, setPartnership] = useState('')
    const [last6Balls, setLast6Balls] = useState('')
    const [lastwicket, setLastWicket] = useState('')
    const [runRate, setRunRate] = useState('')

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

    const [bowlerData, setBowlerData] = useState([]);
    const [batsmanData, setBatsManData] = useState([]);

    useEffect(async () => {
        await fetch('https://apicricketlivescore.herokuapp.com/match-score/')
            .then(res => res.json())
            .then(res => {
                res.map((match) => {
                    if (match.MatchId == params.id) {
                        setTeams(`${match.TeamA} VS ${match.TeamB}`)
                        setTitle(match.Title)
                        getMatchDetails(match)
                    }
                })
            }).catch(err => console.log(err.message))


        setInterval(async () => {
            await fetch('https://apicricketlivescore.herokuapp.com/match-score/')
                .then(res => res.json())
                .then(res => {
                    res.map((match) => {
                        if (match.MatchId == params.id) {
                            getMatchDetails(match)
                        }
                    })
                }).catch(err => console.log(err.message))
        }, 5000)
    }, [])

    const getMatchDetails = async (match) => {
        var livedata = JSON.parse(match.jsondata.replaceAll('\n', '\\n')).jsondata
        const runrate = String(Number(livedata.wicketA.split('/')[0]) / Number(livedata.oversA)).slice(0, 4)

        getBatsMan(livedata)
        getBolwer(livedata)
        getRuns(match.TeamA, match.TeamB, livedata)
        setResult(match.Result)
        setPartnership(livedata.partnership)
        setLast6Balls(livedata.Last6Balls)
        setRunRate(runrate)
        setLastWicket(livedata.lastwicket)
    }

    const getBolwer = async (livedata) => {
        var bolwersDetails = []
        for (let i = 1; i <= 8; i++) {
            if (livedata[`bowler${i}`] != '') {
                bolwersDetails.push({
                    desc: livedata[`bowler${i}`],
                    name: livedata[`bowler${i}`],
                    over: livedata[`bover${i}`],
                    run: livedata[`brun${i}`],
                    wicket: livedata[`bwicket${i}`],
                    eco: livedata[`beco${i}`]
                })
            }
        }
        setBowlerData(bolwersDetails)
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
                    sr: String((playerRuns / playerBols) * 100).substring(0, 5)
                })
            }
        }
        setBatsManData(batsman)
    }

    const getRuns = (TeamA, TeamB, livedata) => {
        console.log(livedata);

        setTeamA({
            teamAOver: livedata.oversA,
            teamAScore: livedata.wicketA,
            teamAName: TeamA
        })

        if (livedata.wicketB) {
            setTeamA({
                teamAOver: livedata.oversB,
                teamAScore: livedata.wicketB,
                teamAName: TeamB
            })
        }
    }

    return (
        <div className='w-100 text-align-inherit'>
            <Match_Score_Sec_Header />
            <div>
                <Container>
                    <Row>
                        <Col xm={12} md={8} className="p-0">
                            <div>
                                <Container>
                                    <h4>{teams}</h4>
                                    <p>{title}</p>
                                    {result && <h5>{result}</h5>}
                                    {teamA.teamAScore === "0/0" || teamA.teamAScore == " " ? '' : <h6>{teamA.teamAName} Score :- {teamA.teamAScore} ({teamA.teamAOver})</h6>}
                                    {teamB.teamBScore === "0/0" ? '' : <h6>{teamB.teamBName} Score :- {teamB.teamBScore} ({teamB.teamBOver})</h6>}

                                    <div>
                                        <table cellSpacing="0" className='mt-2 Score_Table' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                                            <thead>
                                                <tr style={{ backgroundColor: "#BC8CF2" }}>
                                                    <th colSpan="6">Batsmen</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th></th>
                                                    <th>R</th>
                                                    <th>B</th>
                                                    <th>4s</th>
                                                    <th>6s</th>
                                                    <th>SR</th>
                                                </tr>

                                                {batsmanData.map((player, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th>{player.name}</th>
                                                            <th>{player.runs}</th>
                                                            <th>{player.bols}</th>
                                                            <th>{player.fours}</th>
                                                            <th>{player.sixs}</th>
                                                            <th>{player.sr}
                                                            </th>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className='mt-3'>
                                        {result && <div className='d-flex '>
                                            <p className='Score_Extra_Title mb-1'>Run Rate :- </p>
                                            <p className='Match_Score_RunRate mb-1'>{result}</p>
                                        </div>}
                                        <div className='d-flex '>
                                            <p className='Score_Extra_Title mb-1'>PARTNERSHIP :- </p>
                                            <p className='Match_Score_Total mb-1'>{partnership}</p>
                                        </div>
                                        <div className='d-flex '>
                                            <p className='Score_Extra_Title mb-1'>LAST 6 BALLS :- </p>
                                            <p className='Match_Score_Total mb-1'>{last6Balls}</p>
                                        </div>
                                        <div className='d-flex '>
                                            <p className='Score_Extra_Title mb-1'>Run Rate :- </p>
                                            <p className='Match_Score_RunRate mb-1'>{runRate}</p>
                                        </div>
                                        <div className='d-flex '>
                                            <p className='Score_Extra_Title mb-1'>Last wicket :- </p>
                                            <p className='Match_Score_LastWicket mb-1'>{lastwicket}</p>
                                        </div>
                                    </div>

                                    <div className='mt-3'>

                                        <table cellSpacing="0" className='Score_Table' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                                            <thead>
                                                <tr style={{ backgroundColor: "#BC8CF2" }}>
                                                    <th colSpan="6">Bollwers</th>
                                                </tr>
                                                <tr>
                                                    <th></th>
                                                    <th>O</th>
                                                    <th>R</th>
                                                    <th>W</th>
                                                    <th>Eco</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bowlerData.map((bowler, index) => (
                                                    <tr key={index}>
                                                        <th>{bowler.name}</th>
                                                        <th>{bowler.over}</th>
                                                        <th>{bowler.run}</th>
                                                        <th>{bowler.wicket}</th>
                                                        <th>{bowler.eco}</th>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Container>

                            </div>
                        </Col>
                        <Col xm={12} md={4}>
                            Advertisement
                        </Col>
                    </Row>
                </Container>
            </div>



        </div>
    );
}

export default Match_Score;
