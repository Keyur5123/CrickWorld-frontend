import React, { useEffect, useState } from 'react';
import { getMatchDateAndTime } from "../Utils/DateAndTimeFormatter/getMatchDateAndTime";
import Loader from '../Utils/Loader';

function Crick_info({ data, isLoading }) {

    return (
        <div className='mt-5'>
            { isLoading && <Loader isLoading={isLoading}/> }
            
                <table className='Score_Table' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#BC8CF2" }}>
                            <th colSpan="2">Match Info</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.name &&
                            <tr className='pt-1 pb-1 align-items-center'>
                                <th className='pt-1 pb-1 align-items-center'>Match</th>
                                <td>{data?.name}</td>
                            </tr>
                        }

                        {(data?.tossWinner && data?.tossChoice) &&
                            <tr style={{ backgroundColor: "whitesmoke" }}>
                                <th className='pt-1 pb-1 align-items-center'>Toss</th>
                                <td>{`${data?.tossWinner} won the toss and opt to ${data?.tossChoice}`}</td>
                            </tr>
                        }

                        {data?.status &&
                            <tr>
                                <th className='pt-1 pb-1 align-items-center'>Status</th>
                                <td>{data?.status}</td>
                            </tr>
                        }

                        {data?.dateTimeGMT &&
                            <tr style={{ backgroundColor: "whitesmoke" }}>
                                <th className='pt-1 pb-1 align-items-center'>Date</th>
                                <td>{getMatchDateAndTime(data?.dateTimeGMT)}</td>
                            </tr>
                        }

                        {data?.matchType &&
                            <tr>
                                <th className='pt-1 pb-1 align-items-center'>Formate</th>
                                <td>{data?.matchType}</td>
                            </tr>
                        }

                        {data?.venue &&
                            <tr>
                                <th className='pt-1 pb-1 align-items-center'>Venue</th>
                                <td>{data?.venue}</td>
                            </tr>
                        }

                    </tbody>

                </table>
        </div>
    );
}

export default Crick_info;