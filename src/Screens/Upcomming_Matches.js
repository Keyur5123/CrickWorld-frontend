import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Secondary_Header from "./Secondary_Header";
import "../Css/Upcomming_Matches.css"
import { Link } from 'react-router-dom';
import axios from "axios";

function Upcomming_Matches(props) {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(5);

    let curr_date;
    let curr_month;
    let i = 0;

    // _.sortBy(data.Matchtime, { prop: "date" });

    useEffect(async () => {

        await fetch('https://apicricketlivescore.herokuapp.com/matches/upcomming-matches')
            .then((res) => res.json())
            .then(res => {
                const temp = [].concat(res.AllMatch).sort((a, b) => a.Matchtime > b.Matchtime ? 1 : -1);
                console.log("TEMPP IS :::---- ", res)
                setData(temp)
            })
            .catch(err => console.log(err))

        // await fetch('/api/values/upcomingMatches')
        //     .then((res) => res.json())
        //     .then(res => {
        //         const temp = [].concat(res.AllMatch).sort((a,b)=> a.Matchtime > b.Matchtime ? 1 : -1);
        //         console.log("TEMPP IS :::---- ",temp)
        //         setData(temp)
        //         // console.log("inn-----  ",res.AllMatch)
        //     })
        //     .catch(err => console.log(err))

    }, []);


    // const sortByDate = arr => {
    //     console.log("arr :- ",arr);
    //     const sorter = (a, b) => {
    //         // console.log("a is ",a.Matchtime.split(' ')[0], 'b is :- ',b.Matchtime.split(' ')[0]);
    //         console.log("sgg ",Date(a.Matchtime).split(' ')[2]);
    //         console.log("sorter :::----",new Date(a.Matchtime).getDate());
    //        return new Date(a.Matchtime).getDate() - new Date(b.Matchtime).getDate();
    //     }
    //     console.log(arr.sort(sorter));
    //  };
    // sortByDate(data);


    // const sortedAsc = data.sort(
    //     (objA, objB) => Number(objA.Matchtime.split(' ')[0]) - Number(objB.Matchtime.split(' ')[0]),
    //   );
    // console.warn(sortedAsc);



    // console.log("inn-----  ",data[0].Matchtime)

    const date = new Date();

    curr_date = date.getDate();
    console.log("Today's date is :- ", (curr_date));  //21

    curr_month = date.toLocaleString('en-us', { month: 'short' });  //'Mar'
    console.log("Curr Month is :- ", curr_month);

    const getFormattedDate = (str) => {
        i += 1;   //puspose to set that if i.val > 0 then today is atlist one match otherwise not.   & by val of i we can find out the total no of matches held on today 
        return str
        // return str.split(' ')[0]   // to get specific date like in card header match date will be displayed 02-Jun-2022
    }

    return (
        <div className='UpcommingMatch'>
            <Secondary_Header />
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <div className='justify-items-center'>
                            {data.filter((obj) => {
                                return Number(obj.Matchtime.split('-')[0]) > curr_date && obj.Matchtime.split('-')[1] === curr_month;
                            }).slice(0, visible).map((obj, index) => {
                                return (
                                    <div key={index}>
                                        <div key={index}>
                                            <Card className='mt-2 UpcommingMatch__Card' style={{ boxShadow: "3px 6px 3px #b0a0c4" }}>
                                                <Container className='UpcommingMatch__Card__Container'>
                                                    <Card.Text className='mb-1 mt-1'> {getFormattedDate(obj.Matchtime)} </Card.Text>
                                                    <hr className='m-0' />
                                                    <Card.Body className='p-0 pt-2 pb-2'>
                                                        <Row>
                                                            <Col xs={5}>
                                                                <div className='d-flex-end CurrMatch__team1 align-items-center text-center'>
                                                                    <img className='mb-1 UpcommingMatch__team1__img' variant="top" height="60px" src={`http://cricnet.co.in/ManagePlaying/TeamImages/${obj.TeamAImage}`} />
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
                                                                    <img variant="top" className='mb-1 UpcommingMatch__team2__img' height="60px" src={`http://cricnet.co.in/ManagePlaying/TeamImages/${obj.TeamBImage}`} />
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


                            {i === 0 && <h4>Today isn't any match</h4>}
                        </div>
                        <div className='d-flex justify-content-center'>
                            {visible < data.length && (
                                <button className='loadMore__btn1 d-flex justify-content-center' onClick={() => setVisible(visible + 5)}>Load More Matches</button>
                            )}
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        advertisement
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default Upcomming_Matches;