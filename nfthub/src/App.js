import './App.css';
import NavBar from './components/NavBar/NavBar'
import router from './router.js'
import {
  RouterProvider,
} from "react-router-dom";
import { setChain } from "./configuration/settings";

function App() {
  console.log(localStorage.getItem("globalChain"))

  if(localStorage.getItem("globalChain") === undefined){
    localStorage.setItem("globalChain", "MATIC_MUMBAI");
    setChain("MATIC_MUMBAI");
  }else{
    console.log(localStorage.getItem("globalChain"))
    setChain(localStorage.getItem("globalChain"));
  }

  return (
    <div className="App">
      <NavBar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
