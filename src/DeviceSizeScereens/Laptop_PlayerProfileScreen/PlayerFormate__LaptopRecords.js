import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function Player__FormateRecords({ playerInfo, Category }) {

    const [test, setTest] = useState([]);
    const [odi, setOdi] = useState([]);
    const [t20, setT20] = useState([]);
    const [ipl, setIpl] = useState([]);


    useEffect(() => {

        playerInfo?.stats?.map((obj) => {
            
            if (obj?.matchtype == "test") {
                setTest(test => [...test, obj])
            }
            else if (obj?.matchtype == "odi") {
                setOdi(test => [...test, obj])
            }
            else if (obj?.matchtype == "t20i") {
                setT20(test => [...test, obj])
            }
            else if (obj?.matchtype == "ipl") {
                setIpl(test => [...test, obj])
            }
        })
    }, [])

    return (
        <>
            <h5>{Category.toUpperCase()} CAREER SUMMARY</h5>
            <Table striped hover size="sm" className='mt-2 mb-5 Score_Table text-center' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                <thead>
                    <tr style={{ backgroundColor: "#BC8CF2" }}>
                        <th></th>
                        {playerInfo?.stats?.filter((obj) => {
                            if (obj.fn == Category && playerInfo?.stats[0]?.matchtype == obj.matchtype) {
                                return obj
                            }
                        })
                            .map((obj, index) => {
                                return (
                                    <th key={index}>{obj.stat.toUpperCase()}</th>
                                )
                            })
                        }
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        {test.length > 0 && <th>TEST</th>}

                        {test && test.filter((obj) => {
                            return obj.fn == Category && obj.matchtype == "test"
                        })
                            .map((obj, index) => {
                                return <td key={index}>{obj.value}</td>
                            })
                        }
                    </tr>

                    <tr>
                        {odi.length > 0 && <th>ODI</th>}

                        {odi && odi?.filter((obj) => {
                            return obj.fn == Category && obj.matchtype == "odi"
                        })
                            .map((obj, index) => {
                                return <td key={index}>{obj.value}</td>
                            })
                        }
                    </tr>

                    <tr>
                        {t20.length > 0 && <th>T20</th>}

                        {t20 && t20?.filter((obj) => {
                            return obj.fn == Category && obj.matchtype == "t20i"
                        })
                            .map((obj, index) => {
                                return <td key={index}>{obj.value}</td>
                            })
                        }
                    </tr>

                    <tr>
                        {ipl.length > 0 && <th>IPL</th>}

                        {ipl && ipl?.filter((obj) => {
                            return obj.fn == Category && obj.matchtype == "ipl"
                        })
                            .map((obj, index) => {
                                return <td key={index}>{obj.value}</td>
                            })
                        }
                    </tr>
                </tbody>

            </Table>
        </>
    );
}

export default Player__FormateRecords;