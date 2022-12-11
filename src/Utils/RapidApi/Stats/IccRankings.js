import React, { useEffect, useState } from 'react';
import { Alert, Container, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { getRapidApiKey } from '../getRapidApiKey';
import "../../../Css/IccRankings.css"
import Loader from '../../Loader';

function IccRankings(props) {

    const [countryList, setCountryList] = useState([]);
    const [type, setType] = useState('test');
    const [category, setCategory] = useState('batsmen');
    const [isWomen, setIsWomen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [iccClicks, setICCClicks] = useState(0);

    const headers = {
        'X-RapidAPI-Key': getRapidApiKey(),
        'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }

    useEffect(async () => {

        if (isWomen) {
            var options = {
                method: 'GET',
                url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/${category}`,
                params: { formatType: type, isWomen: '1' },
                headers
            };
        }
        else {
            var options = {
                method: 'GET',
                url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/${category}`,
                params: { formatType: type },
                headers
            };
        }

        setIsLoading(true)
        await axios.request(options).then(function (response) {
            setCountryList(response.data.rank);
            setIsLoading(false)
        }).catch(function (error) {
            console.error(error);
        });

        // setTimeout(() => {
        //     if (isLoading == true && countryList.length == 0) {
        //         setIsLoading(true)
        //         setRefresh(!refresh)
        //     }
        // }, 3000)

    }, [type, category, isWomen, refresh])

    return (
        <div className='iccrankings'>
            <Container>
                {isLoading && <Loader isLoading={isLoading} />}

                {!isLoading &&
                    <div>
                        <h4 className='text-center'>Top Players</h4>
                        <hr />

                        <div className='mt-1 ranking__table d-flex text-end justify-content-end'>
                            {iccClicks % 2 == 0 ?
                                <a href="https://blogvioforyou.netlify.app/blog-post.html" className='text-decoration-none mr-' target="_blank" rel="norefferer noopener" title="BlogSite">
                                    <DropdownButton id="dropdown-Formates" variant="success" title={type.toUpperCase()} onClick={() => setICCClicks(iccClicks + 1)}>
                                        <Dropdown.Item onClick={() => setType('test')} >TEST</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setType('odi')} >ODI</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setType('t20')} >T20</Dropdown.Item>
                                    </DropdownButton> &nbsp;
                                </a>
                                :
                                <DropdownButton id="dropdown-Formates" variant="success" title={type.toUpperCase()}>
                                    <Dropdown.Item onClick={() => setType('test')} >TEST</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setType('odi')} >ODI</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setType('t20')} >T20</Dropdown.Item>
                                </DropdownButton> 
                            }
                            &nbsp;
                            {/* category */}
                            <DropdownButton id="dropdown-Players" variant="success" title={category.toUpperCase()}>
                                <Dropdown.Item onClick={() => setCategory('batsmen')} >BATSMEN</Dropdown.Item>
                                <Dropdown.Item onClick={() => setCategory('bowlers')} >BOWLERS</Dropdown.Item>
                                <Dropdown.Item onClick={() => setCategory('allrounders')} >ALL ROUNDERS</Dropdown.Item>
                                <Dropdown.Item onClick={() => setCategory('teams')} >TEAMS</Dropdown.Item>
                            </DropdownButton> &nbsp;

                            {/* gender */}
                            <DropdownButton id="dropdown-Gender" variant="success" title={isWomen == '1' ? 'WOMEN' : 'MEN'}>
                                <Dropdown.Item onClick={() => setIsWomen(false)} >MEN</Dropdown.Item>
                                <Dropdown.Item onClick={() => setIsWomen(true)} >WOMEN</Dropdown.Item>
                            </DropdownButton>
                        </div>

                        <table cellSpacing="0" className='mt-4 Score_Table' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#BC8CF2" }}>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>Pts</th>
                                    <th className='IccRankings__LastUpdateColumn'>L Update</th>
                                    <th>Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countryList?.map((country, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{country.rank}</td>
                                            <td>{country.name}</td>
                                            <td>{country.country}</td>
                                            <td>{country.points}</td>
                                            <td className='IccRankings__LastUpdateColumn'>{country.lastUpdatedOn}</td>
                                            <td>{country.trend}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        {!countryList && <Alert className='mt-5' variant='danger'>
                            No Data Available for :- {type.toUpperCase()} & {category.toUpperCase()} & {isWomen ? 'WOMEN' : 'MEN'}
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

export default IccRankings;