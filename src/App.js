import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./Screens/Header"
import Current_Matches from './Screens/Current_Matches';
import Upcomming_Matches from './Screens/Upcomming_Matches';
import ScoreBoard from './Screens/ScoreBoard';
import Rankings from './Screens/Rankings';
import ContactUs from './Screens/ContactUs';
import News from './Screens/News';
import Info from './Screens/Info';
import Privacy_Policy from "./Screens/Privacy_Policy"

import ReactGA from 'react-ga';
ReactGA.initialize('UA-233488918-1');

function App(props) {

  useEffect(() => {
    console.log("hello ");
    ReactGA.pageview(window.location.pathname + window.location.search);
  },[])

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<Current_Matches />} />
          <Route path="/matches/upcomming-matches" element={<Upcomming_Matches />} />
          <Route path="/match-score/:id" element={<ScoreBoard />} />
          <Route path="/info/:id" element={<Info />} />
          <Route path="/top-ranking-players" element={<Rankings />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/cricket-news" element={<News />} />
          <Route path="/privacypolicy" element={<Privacy_Policy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;