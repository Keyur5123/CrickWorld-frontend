import ReactGA from "react-ga";

export const googleAnalytics = () => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
    ReactGA.pageview(window.location.pathname + window.location.search);
}

export const googleAnalyticsForScoreBoard = (teams) => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
    ReactGA.pageview(window.location.pathname + window.location.search + ' -> ' + teams);
}