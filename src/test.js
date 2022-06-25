import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import "../Css/ScoreBoard.css";
import { StateContext } from '../StateProvider';
import Match_Score_Sec_Header from './Match_Score_Sec_Header';
import socketIOClient from "socket.io-client"    
import _ from 'lodash';

// const io = new Server(httpServer, {});

function Match_Score() {
    const params = useParams();

    const { addPlayerData, bowlers } = useContext(StateContext);

    const [isbowlers, setIsBowlers] = useState(true);
    const [allMatchData, setAllMatchData] = useState([]);

    
    useEffect(async () => {
        // const socket = socketIOClient("https://apicricketlivescore.herokuapp.com", {transports: ['websocket']});
        // console.warn("socket :_ ",socket)

        // async function getApiData() {
            // fetch('http://cricpro.cricnet.co.in/api/values/LiveLine')
            await fetch('https://apicricketlivescore.herokuapp.com/match-score/')
            .then(res => res.json())
            .then(res => {
                res.map((match)=>{
                    if(match.MatchId == params.id){
                        console.warn("match :- ",match);
                        setAllMatchData([match])
                    }
                })
            }).catch(err => console.log(err.message))
            
            
            setInterval(async()=>{
                await fetch('https://apicricketlivescore.herokuapp.com/match-score/')
                .then(res => res.json())
                .then(res => {
                    res.map((match)=>{
                        if(match.MatchId == params.id){
                            setAllMatchData([match])
                        }
                    })
                }).catch(err => console.log(err.message))
                
                },5000)
            
                // socket.on('connect',()=>{
                //     console.log("coone tedcz");
                // });
            //    socket.on('greeting-from-server', (data) => { console.warn("data :- ", data); })

    },[])

    const getPlayers = (players) => {
        let CurrPlayers = players.split('|');
        return CurrPlayers;
    }

    const getPlayerRuns = (runs) => {
        let CurrPlayers_runs = runs.split('|').join(', ').split(',');
        return CurrPlayers_runs
    }

    return (
        <div className='w-100 text-align-inherit'>
            <Match_Score_Sec_Header />

            {
            allMatchData.map((singleMatch, index) => {
                // console.warn("obj is ---- ",livedata.wicketA, " livedata.wicketB :- ",livedata.wicketB , ' livedata.oversA ;- ',livedata.oversA , " livedata.oversB :- ",livedata.oversB);
                var livedata = JSON.parse(singleMatch.jsondata.replaceAll('\n', '\\n')).jsondata

                console.warn("livedata is : - ",livedata);
                // console.warn("livedata :=   ",livedata);

                let player_name = getPlayers(livedata.batsman);

                let runs = getPlayerRuns(livedata.oversB);    // NEED TO DO DYNAMIC LOGIC PRO:-- WHEN SECOND TEAM CAME TO BAT THEN ALSO SECOND TEAM'S DATA WILL BE DISPLAYED.

                let title = livedata.title.split('*****').join('').split('\n');
                let score = livedata.Result    //pujab kings won by 5 wicket   orrr   singleMatch.Result

                if (isbowlers) {
                    console.warn("Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                    addPlayerData({ livedata: livedata })
                    setIsBowlers(false)
                }
                // after complition of the first inning the result is singleMatch.wicketA && singleMatch.wicketB
                return (

                    <div key={index}>
                        <Container>
                            <Row>
                                <Col xm={12} md={8} className="p-0">
                                    <div>
                                        <Container>
                                            <h4>{singleMatch.TeamA} VS {singleMatch.TeamB}</h4>
                                            <p>{singleMatch.Title}</p>
                                            {singleMatch.Result && <h5>{singleMatch.Result}</h5>}
                                            <h6>{singleMatch.TeamA} Score :- {livedata.wicketA} ({livedata.oversA})</h6>
                                            {livedata.wicketB === "0/0" ? '' : <h6>{singleMatch.TeamB} Score :- {livedata.wicketB}</h6> }
                                            
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

                                                        {player_name.map((player, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th>{player}</th>
                                                                    <th>{index == 0 ? runs[(index + 1)] : runs[(index - 1)]}</th>
                                                                    <th>{index == 0 ? runs[(index + 3)] : runs[(index + 1)]}</th>
                                                                    <th>{index == 0 ? livedata.s4 : livedata.ns4}</th>
                                                                    <th>{index == 0 ? livedata.s6 : livedata.ns6}</th>
                                                                    <th>
                                                                        {
                                                                            index == 0 ? 
                                                                            (runs[(index + 1)] && runs[(index + 3)]) == 0 ? "-" : Number(String((runs[(index + 1)] / runs[(index + 3)]) * 100).substring(0, 5)) 
                                                                                : 
                                                                            (runs[(index - 1)] && runs[(index + 1)]) == 0 ? "-" : Number(String((runs[(index - 1)] / runs[(index + 1)]) * 100).substring(0, 5))
                                                                        }
                                                                        </th>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div>
                                                {livedata.Result && <div className='d-flex '>
                                                    <p className='Score_Extra_Title mb-1'>Run Rate :- </p>
                                                    <p className='Match_Score_RunRate mb-1'>{livedata.Result}</p>  //  0 - 1|Yorkshire won the match
                                                </div>}
                                                <div className='d-flex mt-3'>
                                                    <p className='Score_Extra_Title mb-1'>EXTRAS :- </p>
                                                    <p className='Score_Extra_runs mb-1'>0(b 0,lb 0,w 0,nb 0,p)</p>
                                                </div>
                                                <div className='d-flex '>
                                                    <p className='Score_Extra_Title mb-1'>PARTNERSHIP :- </p>
                                                    <p className='Match_Score_Total mb-1'>{livedata.partnership}</p>
                                                </div>
                                                <div className='d-flex '>
                                                    <p className='Score_Extra_Title mb-1'>LAST 6 BALLS :- </p>
                                                    <p className='Match_Score_Total mb-1'>{livedata.Last6Balls}</p>
                                                </div>
                                                <div className='d-flex '>
                                                    <p className='Score_Extra_Title mb-1'>Run Rate :- </p>
                                                    <p className='Match_Score_RunRate mb-1'>({livedata.wicketA}/{livedata.oversA})</p>
                                                </div>

                                                <div className='d-flex '>
                                                    <p className='Score_Extra_Title mb-1'>Last wicket :- </p>
                                                    <p className='Match_Score_LastWicket mb-1'>{livedata.lastwicket}</p>
                                                </div>
                                            </div>

                                            <div className='mt-3'>
                                                
                                                <table cellSpacing="0" className='Score_Table' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                                                    <tr style={{ backgroundColor: "#BC8CF2" }}>
                                                        <th colSpan="6">Bollwers</th>
                                                    </tr>
                                                    <tr>
                                                        <th></th>
                                                        <th>O</th>
                                                        {/* <th>M</th> */}
                                                        <th>R</th>
                                                        <th>W</th>
                                                        <th>Eco</th>
                                                    </tr>
                                                    {console.log("Bowler array :- ",bowlers.length)}
                                                        {bowlers.filter((obj)=>{   
                                                            bowlers.pop();
                                                            return params.id == obj[0].id
                                                        }).map((bowler, index)=>(
                                                            console.log("Bowler array :- ",bowler),
                                                            bowler.slice(0).map((bowler,index)=>(
                                                                        <tr key={index}>
                                                                            {/* <th>{index}</th > */}
                                                                            <th>{bowler.name ? bowler.name : ''}</th>
                                                                            <th>{bowler.name ? bowler.over : ''}</th> 
                                                                            <th>{bowler.name ? bowler.run : ''}</th>
                                                                            <th>{bowler.name ? bowler.wicket : ''}</th>
                                                                            <th>{bowler.name ? String((bowler.run)/(bowler.over)).substring(0,4) : ''}</th>
                                                                        </tr>
                                                            ))
                                                        ))
                                                        }

                                                </table>
                                            </div>

                                            {/* <h4>Commentry about score</h4> */}
                                            <h6 className='mt-3'>{title[0]}</h6>

                                        </Container>

                                    </div>
                                </Col>
                                <Col xm={12} md={4}>
                                    Advertisement
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )
            })}

        </div>
    );
}

export default Match_Score;
