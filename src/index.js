import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StateProvider } from './StateProvider';

ReactDOM.render(
  // <React.StrictMode>
    // <StateProvider >   // for React Context...
      <App />
    // </StateProvider>
  // {/* </React.StrictMode> */}
  ,
  document.getElementById('root')
);

reportWebVitals();
