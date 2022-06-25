import React from 'react';
import { Container } from 'react-bootstrap';
import "../Css/Secondary_Header.css";

function Home(props) {
    return (
        <Container>
            <div className='d-flex home mt-2 mb-1'>
                <a href="/" className='mb-0 text-normal text-decoration-none text-muted'>
                    <p className='Secondary_header'>Current Matches</p>
                </a>
                <a href="/matches/upcomming-matches" className='text-normal text-decoration-none text-muted'>
                    <p className='Secondary_header'>Upcomming Matches</p>
                </a>
            </div>
            <hr className='mt-0' />
        </Container>
    );
}

export default Home;