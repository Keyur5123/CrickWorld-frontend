import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from "./Screens/Header";
import Footer from "./Screens/Footer.js"
import { Helmet } from "react-helmet";
import { createTheme, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import AllRoutes from './AllRoutes';

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

            <div className='App'>
              <Header />

              <Helmet>
                <meta
                  name="Live Cricket Score"
                  content='odi top player score analysis,live match,cricket,ipl 2021,ipl live score,cricket score,live cricket score,ipl score,ipl 2020,today ipl match,live cricket,t20 world cup,ipl live score,cricket icc,virat kohli,cricbuzz live sc,ipl matchipl 2021 live,t20 world cup,cricbuzz live,icc world cup,yesterday ipl,england cricket,india cricket,india live score,live cricket tv,big bash leagend'
                />
                <title>Live Cricket Score</title>
              </Helmet>

              <AllRoutes />

              <Footer />

            </div>


          </BrowserRouter>

        </Box>

      </ThemeProvider>
    </div>

  );
}

export default App;