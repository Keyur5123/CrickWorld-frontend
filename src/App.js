import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./Screens/Header";
import Upcomming_Matches from './Screens/Upcomming_Matches';
import Recent_Matches from './Screens/Recent_Matches';
import Cric_ScoreBoard from './Screens/Cric_ScoreBoard';
import Rankings from './Screens/Rankings';
import ContactUs from './Screens/ContactUs';
import News from './Screens/News';
import ScoreBoard from './Screens/ScoreBoard';
import Info from "./Screens/Info";
import Privacy_Policy from "./Screens/Privacy_Policy";
import Crick_CurrentMatches from "./Screens/Crick_CurrentMatches";
import Crick_MatchSquad from "./Screens/Crick_MatchSquad";
import PlayerInfo from './Screens/PlayerInfo';
import { Helmet } from "react-helmet";
import { createTheme, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

function App(props) {

  const [mode, setMode] = useState("light")    // dark for dark mode and light for light mode...

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <div>

      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>


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
          </BrowserRouter>

        </Box>

      </ThemeProvider>
    </div>

  );
}

export default App;