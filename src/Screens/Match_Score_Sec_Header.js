import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

function Match_Score_Sec_Header(props) {

    const params = useParams()
    return (
        <Container>
            <div className='d-flex home mb-1'>
                <Link to={`/match-score/${params.id}`} className='mb-0 text-normal text-decoration-none text-muted'>
                    <p className='Secondary_header'>ScoreBord</p>
                </Link>
                <Link to={`/info/${params.id}`} className='text-normal text-decoration-none text-muted'>
                    <p className='Secondary_header'>Info</p>
                </Link>
            </div>
            <hr className='mt-0' />
        </Container>
    );
}

export default Match_Score_Sec_Header;