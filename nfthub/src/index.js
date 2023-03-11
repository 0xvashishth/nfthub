import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import LOADER from './components/Loading/Loading';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const footer = document.getElementById("footer");

root.render(
    <App />
);

// ReactDOM.render(
//   <React.Fragment>
//     <LOADER />
//   </React.Fragment>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
