import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./Screens/Header"
import Current_Matches from './Screens/Current_Matches';
import Upcomming_Matches from './Screens/Upcomming_Matches';
import ScoreBoard from './Screens/ScoreBoard';
import Point_Table from './Screens/Point_Table';
import ContactUs from './Screens/ContactUs';
import Ipl_News from './Screens/Ipl_News';
import Info from './Screens/Info';
import Privacy_Policy from "./Screens/Privacy_Policy"

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
              <Route path="/" exact element={<Current_Matches />} />
              <Route path="/matches/upcomming-matches" element={<Upcomming_Matches />} />
            <Route path="/match-score/:id" element={<ScoreBoard />} />   
            <Route path="/info/:id" element={<Info />} />
            <Route path="/ipl-team-point" element={<Point_Table />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/ipl-news" element={<Ipl_News />} />
            <Route path="/privacypolicy" element={<Privacy_Policy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;