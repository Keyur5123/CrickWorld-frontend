import React, { useEffect, useState } from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import Loader from '../Utils/Loader';
import Match_Score_Sec_Header from './Match_Score_Sec_Header';

function Crick_MatchSquad(props) {

    const params = useParams()

    const [squads, setSquads] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        await fetch('http://localhost:5000/crick__matchSquad', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: params.id })
        })
            .then(res => res.json())
            .then(res => {
                setSquads(res)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div className='mt-5'>
            <Match_Score_Sec_Header />

            <Container>
            { isLoading && <Loader isLoading={isLoading}/> }

                {(!isLoading && squads?.data) ? squads?.data?.map((obj, index) => (
                    <div className='mt-3' key={index}>
                        <table style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#BC8CF2" }}>
                                    <th colSpan="5">{obj.teamName}</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>No.</td>
                                    <td>Image</td>
                                    <td>Name</td>
                                    <td>Role</td>
                                    <td>Country</td>
                                </tr>

                                {obj && obj?.players.map((player, index) => (
                                    <tr key={index}  style={{ backgroundColor: "whitesmoke" }}>
                                        <th>{index + 1}</th>
                                        <td><img src={player.playerImg} alt={player.name} height="40px" className="rounded" /></td>
                                        <td>{player.name}</td>
                                        <th>{player.role}</th>
                                        <td>{player.country}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <div className='mb-4' />
                    </div>
                ))
                    :
                    <div>
                        {squads?.warn &&
                            <Alert className='mt-5' variant='danger'>
                                No Data Available
                                <span role="img" aria-label="sad">😃</span>
                                <br />
                                {squads?.warn}
                            </Alert>}
                    </div>
                }

            </Container>
        </div>
    );
}

export default Crick_MatchSquad;