import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function PlayerFormate__MobileRecords({ playerInfo, Category }) {

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
        <div>

            <h6>{Category.toUpperCase()} CAREER SUMMARY</h6>
            <Table striped hover size="sm" cellSpacing="80" className='mt-2 mb-4 Score_Table text-center' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc" }}>
                <thead>
                    <tr style={{ backgroundColor: "#BC8CF2" }}>
                        <th></th>
                        {test.length > 0 && <th>Test</th>}
                        {odi.length > 0 && <th>odi</th>}
                        {t20.length > 0 && <th>t20</th>}
                        {ipl.length > 0 && <th>ipl</th>}
                    </tr>
                </thead>

                <tbody>
                    {playerInfo?.stats?.map((obj, index) => {
                        if (obj.fn == Category && playerInfo?.stats[0]?.matchtype == obj.matchtype) {
                            return (
                                <tr key={index}>
                                    <th>{obj.stat.toUpperCase()}</th>

                                    {test && test.map((obj1, index) => {
                                        if (obj.stat == obj1.stat && obj.fn == obj1.fn) {
                                            return <td key={index}>{obj1.value}</td>
                                        }
                                    })}

                                    {odi && odi.map((obj1, index) => {
                                        if (obj.stat == obj1.stat && obj.fn == obj1.fn) {
                                            return <td key={index}>{obj1.value}</td>
                                        }
                                    })}

                                    {t20 && t20.map((obj1, index) => {
                                        if (obj.stat == obj1.stat && obj.fn == obj1.fn) {
                                            return <td key={index}>{obj1.value}</td>
                                        }
                                    })}

                                    {ipl && ipl.map((obj1, index) => {
                                        if (obj.stat == obj1.stat && obj.fn == obj1.fn) {
                                            return <td key={index}>{obj1.value}</td>
                                        }
                                    })}

                                </tr>
                            )
                        }
                    })}

                </tbody>
            </Table>

        </div>
    );
}

export default PlayerFormate__MobileRecords;