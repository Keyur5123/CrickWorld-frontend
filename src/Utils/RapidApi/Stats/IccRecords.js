import React, { useEffect, useState } from 'react';
import axios from "axios";
import { getRapidApiKey } from '../getRapidApiKey';
import { Alert, Container, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';
import Loader from '../../Loader';

function IccRecords(props) {

    const [battingCategory, setBattingCategory] = useState([]);
    const [bowlingCategory, setBowlingCategory] = useState([]);
    const [tableHeaders, setTableHeaders] = useState([]);
    const [playerData, setPlayerData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const [visible, setVisible] = useState(20);
    const [recordFilterForBatsman, setRecordFilterForBatsman] = useState('mostRuns');
    const [recordFilterYear, setRecordFilterYear] = useState(2022);
    const [isLoading, setIsLoading] = useState(true);
    const [iccRecordClicks, setICCRecordClicks] = useState(0);

    const fetchRecordsFromApi = async () => {

        const recordFiler = {
            method: 'GET',
            url: 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/topstats',
            params: { statsType: recordFilterForBatsman, year: recordFilterYear },
            headers: {
                'X-RapidAPI-Key': getRapidApiKey(),
                'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
            }
        };
        setIsLoading(true)

        axios.request(recordFiler).then(function (response) {
            getCategoryForBatsMan(response.data.statsTypesList[0].types);
            getCategoryForBowller(response.data.statsTypesList[1].types);
            setIsLoading(false)
        }).catch(function (error) {
            console.error(error);
        });
    }

    const fetchDataFromApi = () => {

        const options = {
            method: 'GET',
            url: 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/topstats/0',
            params: { statsType: recordFilterForBatsman, year: recordFilterYear.toString() },
            headers: {
                'X-RapidAPI-Key': getRapidApiKey(),
                'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
            }
        };
        setIsLoading(true)
        axios.request(options).then(function (response) {
            setTableHeaders(response.data.headers)
            setPlayerData(response.data.values)
            setIsLoading(false)
        }).catch(function (error) {
            console.error(error);
        });

    }

    const getCategoryForBatsMan = (AllTypes) => {
        AllTypes.map((obj) => {
            battingCategory.push({
                header: obj.header,
                value: obj.value
            })
        })
    }

    const getCategoryForBowller = (AllTypes) => {
        AllTypes.map((obj) => {
            bowlingCategory.push({
                header: obj.header,
                value: obj.value
            })
        })
    }

    useEffect(async () => {
        await fetchRecordsFromApi();  // get-recordFilters

        // setTimeout(() => {
        //     if (isLoading == true && bowlingCategory.length == 0 && battingCategory.length == 0) {
        //         setIsLoading(true)
        //         setRefresh(!refresh)
        //     }
        // }, 3000)
    }, [])

    useEffect(() => {

        fetchDataFromApi();    // get-records

        // setTimeout(() => {
        //     if (isLoading == true && playerData.length == 0) {
        //         setIsLoading(true)
        //         setRefresh(!refresh)
        //     }
        // }, 3000)

    }, [recordFilterForBatsman, recordFilterYear, refresh])

    return (
        <div>
            <Container>
                {isLoading && <Loader isLoading={isLoading} />}

                {!isLoading &&
                    <div>
                        <h4 className='text-center mt-5'>Top Records</h4>
                        <hr />

                        <div className='mt-1 d-flex text-end justify-content-end'>

                            {iccRecordClicks % 2 == 0 ?
                                <a href="https://blogvioforyou.netlify.app/blog-post.html" className='text-decoration-none mr-' target="_blank" title="Blog Site">
                                    <DropdownButton id="dropdown-basic-button" variant="success" title={recordFilterForBatsman.toUpperCase()}>
                                        <div style={{ height: "250px", overflowY: "auto" }}>
                                            {(battingCategory || bowlingCategory) && battingCategory.concat(bowlingCategory).map((ele, index) => {
                                                return <Dropdown.Item key={index} onClick={() => setRecordFilterForBatsman(ele.value)} >{ele.header}</Dropdown.Item>
                                            })}
                                        </div>
                                    </DropdownButton>
                                </a>
                                :
                                <DropdownButton id="dropdown-basic-button" variant="success" title={recordFilterForBatsman.toUpperCase()}>
                                    <div style={{ height: "250px", overflowY: "auto" }}>
                                        {(battingCategory || bowlingCategory) && battingCategory.concat(bowlingCategory).map((ele, index) => {
                                            return <Dropdown.Item key={index} onClick={() => setRecordFilterForBatsman(ele.value)} >{ele.header}</Dropdown.Item>
                                        })}
                                    </div>
                                </DropdownButton>
                            }
                            &nbsp;

                            <DropdownButton id="dropdown-basic-button" variant="success" title={recordFilterYear}>
                                {[2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014].map((year, index) => {
                                    return <Dropdown.Item key={index} onClick={() => setRecordFilterYear(year)} >{year}</Dropdown.Item>
                                })}
                            </DropdownButton> &nbsp;

                        </div>

                        <table cellSpacing="0" className='mt-4 mb-3 Record_Table' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#BC8CF2" }}>
                                    <th>No</th>
                                    {tableHeaders && tableHeaders?.map((value, index) => {
                                        return <th key={index}>{value}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {playerData && playerData?.slice(0, visible).map((obj, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{obj.values[1]}</td>
                                        <td>{obj.values[2]}</td>
                                        <td>{obj.values[3]}</td>
                                        <td>{obj.values[4]}</td>
                                        <td>{obj.values[5]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className='d-flex justify-content-center'>
                            {visible < playerData?.length && (
                                <button className='loadMore__btn1 mb-3 d-flex justify-content-center' onClick={() => setVisible(visible + 5)}>Load More Records</button>
                            )}
                        </div>


                        {!playerData && <Alert className='mt-5' variant='danger'>
                            No Data Available for :- {recordFilterForBatsman.toUpperCase()} & {recordFilterYear}
                            <span role="img" aria-label="sad">😃</span>
                            <br />
                            Please Change the Filters...
                        </Alert>}
                    </div>
                }

            </Container>
        </div>
    );
}

export default IccRecords;