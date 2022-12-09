import React from 'react';
import Crick_MatchSquad from './Screens/Crick_MatchSquad';
import Cric_ScoreBoard from './Screens/Cric_ScoreBoard';
import Info from './Screens/Info';
import PlayerInfo from './Screens/PlayerInfo';
import Recent_Matches from './Screens/Recent_Matches';
import Upcomming_Matches from './Screens/Upcomming_Matches';
import ScoreBoard from './Screens/ScoreBoard';
import Rankings from './Screens/Rankings';
import ContactUs from './Screens/ContactUs';
import News from './Screens/News';
import Privacy_Policy from './Screens/Privacy_Policy';
import Crick_CurrentMatches from './Screens/Crick_CurrentMatches';

import { Route, Routes } from 'react-router-dom';

function AllRoutes(props) {
    return (
        <Routes>
            {/* <Route path="/" exact element={<Current_Matches />} /> */}
            <Route path="/matches/upcomming-matches" element={<Upcomming_Matches />} />
            <Route path="/matches/recent-matches" element={<Recent_Matches />} />

            <Route path="/match-score/profile/:id" element={<PlayerInfo />} />

            <Route path="/match-score/:id" element={<Cric_ScoreBoard />} />
            <Route path="/squad/:id" element={<Crick_MatchSquad />} />

            <Route path="/match/:id" element={<ScoreBoard />} />
            <Route path="/info/:id" element={<Info />} />

            <Route path="/top-ranking-players" element={<Rankings />} />
            <Route path="/contactus" element={<ContactUs />} />

            <Route path="/cricket-news" element={<News />} />
            <Route path="/privacypolicy" element={<Privacy_Policy />} />
            <Route path="/" exact element={<Crick_CurrentMatches />} />
        </Routes>

    );
}

export default AllRoutes;