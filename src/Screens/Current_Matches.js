import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Secondary_Header from "./Secondary_Header";
import "../Css/Current_Matches.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import {
    Advertisement,
    // Container,
    Divider,
    Header,
    Icon,
    Message
} from "semantic-ui-react";
import AdSense from "react-adsense";



const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function Current_Matches(props) {
    const [data1, setData1] = useState([]);
    const [visible, setVisible] = useState(5);
    const [upcomming_match, setUpcomming_Match] = useState([])
    const [id, setId] = useState("");
    var i = 0

    useEffect(async () => {

        // await axios.get('api/values/LiveLine').then(res => {
        //     console.log("res :- ", res.data);
        //     setData1(res.data)
        // })

        await fetch('https://apicricketlivescore.herokuapp.com/matches/current-matches')
            .then((res) => res.json())
            .then(res => {
                const temp = [].concat(res).sort((a, b) => a.Matchtime > b.Matchtime ? 1 : -1);
                console.log("TEMPP IS :::---- ", temp)
                setData1(temp)
            })
            .catch(err => console.log(err))

    }, []);

    let Todays__Date = new Date();
    var dd = String(Todays__Date.getDate()).padStart(2, '0');
    var mm = String(Todays__Date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = Todays__Date.getFullYear();

    Todays__Date = dd + '-' + mm + '-' + yyyy;
    console.log("Todays__Date :- ", (new Date()).toString().split(' ')[1]);

    // let local_date = new Date();
    // console.log("date ::---- ", Number(moment(local_date).format('M')));
    // curr_date = Number(moment(local_date).format('DD'));
    // console.log("Todays__Date's date is :- ", (curr_date)) // Output: 21
    // let curr_month = moment(mm).format('MMM'); // mmm - > 05  conert karavine filter ma || condi nakhvani 6
    // console.log("Curr Month is :- ", curr_month);


    const getFormattedDate = (str) => {
        i += 1;                  //puspose to set that if i.val > 0 then Todays__Date is atlist one match otherwise not.   & by val of i we can find out the total no of matches held on Todays__Date 
        if (str.split(' ')[0] == (new Date()).toString().split(' ')[1]) {
            return str
        }

        return str ? str.split(' ')[0] + " : " + str.split(' ')[2].split('-')[0] : ''
    }

    return (
        <div className='CurrentMatch'>
            <Secondary_Header />
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <div className='justify-items-center'>
                            {data1 &&
                                data1
                                    .filter((obj) => {
                                        console.log("filter obj is :-- ", obj);
                                        // return Number(obj.Matchtime.split('-')[0]) === curr_date && obj.Matchtime.split('-')[1] === curr_month
                                        return (obj.MatchDate) === Todays__Date

                                    })
                                    .map((obj, index) => {
                                        console.log("index is :- ", obj);
                                        return (
                                            <div key={index} className="CurrentMatch__Card">
                                                <Link to={`/match-score/${obj.MatchId}`} className='text-decoration-none text-muted'>
                                                    <div key={index}>
                                                        <Card className='mt-2 CurrentMatch__Card' >
                                                            <Container className='CurrentMatch__Card__Container'>
                                                                <Card.Text className='match__Info mb-1 mt-1'> {getFormattedDate(obj.Matchtime)} </Card.Text>
                                                                <hr className='m-0' />
                                                                <Card.Body className='p-0 pt-2 pb-2'>
                                                                    <Row>
                                                                        <Col xs={5}>
                                                                            <div className='d-flex-end CurrMatch__team1 align-items-center text-center'>
                                                                                <img className='mb-1 CurrMatch__team1__img' variant="top" height="60px" src={`https://cricnet.co.in/ManagePlaying/TeamImages/${obj.TeamAImage}`} />
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
                                                                                <img variant="top" className='mb-1 CurrMatch__team2__img' height="60px" src={`https://cricnet.co.in/ManagePlaying/TeamImages/${obj.TeamBImage}`} />
                                                                                <Card.Title className='TeamName'>{obj.TeamB}</Card.Title>
                                                                            </div>
                                                                        </Col>
                                                                    </ Row>
                                                                    <hr className='m-0 mb-2' />
                                                                    <Card.Text className='match__Info'>{obj.venue}</Card.Text>
                                                                </Card.Body>
                                                            </Container>
                                                        </Card>
                                                    </div>
                                                </Link>
                                            </div>
                                        )

                                    })}
                            {i === 0 && <h4>Today isn't any match</h4>}
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        advertisement
                        {/* <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                        <ins className="adsbygoogle"
                            style={{ display: "inline-block",width: "336px", height:"280px" }}
                            data-ad-client="ca-pub-3199660652950290"
                            data-adtest="on"
                            data-ad-slot="6259591966"></ins>
                        <script>
                            (adsbygoogle = window.adsbygoogle || []).push({ });
                        </script> */}
                        {/* <Advertisement unit='square' test='Square' /> */}

                        <Divider hidden />
                        <Message info>
                            <Message.Header>Semantic UI React with GoogleAds</Message.Header>
                            <p>
                                An example of usage GoogleAds with Advertisement component from Semantic
                                UI React.
                            </p>
                            <Message.List>
                                <Message.Item>
                                    Please make sure that you have included GoogleAds code:
                                    <br />
                                    <code
                                        style={{ fontSize: 10 }}
                                    >{`<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>`}</code>
                                </Message.Item>
                                <Message.Item>Also you need to disable your ad blocker 😁</Message.Item>
                            </Message.List>
                        </Message>


                        <Advertisement unit="leaderboard">
                            <AdSense.Google
                                client="ca-pub-4591861188995436"
                                format=""
                                slot="6710577704"
                                style={{ display: "inline-block", height: 90, width: 728 }}
                            />
                        </Advertisement>

                        <Advertisement unit='small rectangle' test='Small Rectangle' />
                    </Col>
                </Row>
            </Container>
        </div>

    );

}

// export const     
export default Current_Matches;
