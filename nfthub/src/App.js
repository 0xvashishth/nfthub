import './App.css';
import NavBar from './components/NavBar/NavBar'
import router from "./router"
import {
  RouterProvider,
} from "react-router-dom";
import { setChain } from "./configuration/settings";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { getDarkMode, setDarkMode } from './configuration/misc';

function App() {
  console.log(localStorage.getItem("globalChain"))
  const [darkMode,setMode] = useState(getDarkMode());
  if (localStorage.getItem("globalChain") === undefined) {
    localStorage.setItem("globalChain", "MATIC_MUMBAI");
    setChain("MATIC_MUMBAI");
  } else {
    console.log(localStorage.getItem("globalChain"))
    setChain(localStorage.getItem("globalChain"));
  }
  useEffect(() => {
    // window.location.reload();
  },[darkMode])
  return (
    <div className="App">
      <NavBar />
      <RouterProvider router={router} />
      <button style={{
          position: 'fixed',
          bottom: '10%',
          right: '20px',
          border: 'none'
        }}
        onClick={() => setDarkMode(!darkMode,setMode)}>
              {darkMode ? <FontAwesomeIcon icon={faSun}  style={{color: "#ffffff"}} spin="spin"/> : <FontAwesomeIcon icon={faMoon} spin="spin" />}
            </button>
    </div>
  );
}

export default App;
