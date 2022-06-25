import React from 'react';
// import { Route, Routes } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Secondary_Header from "./Screens/Secondary_Header";

import Header from "./Screens/Header"
import Current_Matches from './Screens/Current_Matches';
import Upcomming_Matches from './Screens/Upcomming_Matches';
import ScoreBoard from './Screens/ScoreBoard';
import Point_Table from './Screens/Point_Table';
import ContactUs from './Screens/ContactUs';
import Ipl_News from './Screens/Ipl_News';
import Info from './Screens/Info';

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
            {/* <Route path="matches"  element={<Secondary_Header />} > */}
              <Route path="/" exact element={<Current_Matches />} />
              <Route path="/matches/upcomming-matches" element={<Upcomming_Matches />} />
            {/* </Route> */}
            <Route path="/match-score/:id" element={<ScoreBoard />} />   
            <Route path="/info/:id" element={<Info />} />
            <Route path="/ipl-team-point" element={<Point_Table />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/ipl-news" element={<Ipl_News />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;