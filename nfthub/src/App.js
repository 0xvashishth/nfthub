import './App.css';
import NavBar from './components/NavBar/NavBar'
import router from './router.js'
import {
  RouterProvider,
} from "react-router-dom";


function App() {
  


  return (
    <div className="App">
      <NavBar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
