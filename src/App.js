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
import Privacy_Policy from "./Screens/Privacy_Policy";
import { Helmet } from "react-helmet";

function App(props) {

  return (
    <div>
      <BrowserRouter>
        <Header />

        <Helmet>
          <meta
            name="Live Cricket Score"
            content='odi top player score analysis,live match,cricket,ipl 2021,ipl live score,cricket score,live cricket score,ipl score,ipl 2020,today ipl match,live cricket,t20 world cup,ipl live score,cricket icc,virat kohli,cricbuzz live sc,ipl matchipl 2021 live,t20 world cup,cricbuzz live,icc world cup,yesterday ipl,england cricket,india cricket,india live score,live cricket tv,big bash leagend'
          />
          <title>Live Cricket Score</title>
        </Helmet>

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