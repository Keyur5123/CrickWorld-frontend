import React from 'react';
import "../Css/Header.css";
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <div className='Footer mt-5 mb-0 align-items-center'>
            <div className='d-flex w-100 justify-content-center text-center'>
                <Link className='Footer_text' style={{ color: 'black' }} to="/">Home</Link>
                <Link className='Footer_text' style={{ color: 'black' }} to="/top-ranking-players">Icc Rankings</Link>
                <Link className='Footer_text' style={{ color: 'black' }} to="/contactus">Contact Us</Link>
                <Link className='Footer_text' style={{ color: 'black' }} to="/cricket-news">News</Link>
            </div>
            <div className='text-center mt-2'>
                Copyright © 2022. Designed by crickWorld
            </div>
        </div>
    );
}

export default Footer;

// folllow steps to set header bottom even page content is less.
// step(1) -> PARENT CLASS OF FOOTER ELEMNT which is <b> App class ne min-height:100vh coded in index.js line-16</b>      here App is parent bcz of App.js div class is App
// step(2) -> Footer class ne position:sticky & top:100%