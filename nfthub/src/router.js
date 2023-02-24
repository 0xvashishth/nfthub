import {
  createBrowserRouter,
} from "react-router-dom";

import QuickStart from "./components/QuickStart/QuickStart"
import MintNft from "./components/MintNft/MintNft"
import MarketPlace from "./components/MarketPlace/MarketPlace"
import Wallet from "./components/Wallet/Wallet";
// import Explorer from "./components/Explorer/Explorer";
import Test from "./components/Test/Test";
import Tests from "./components/Test/Tests";


const router = createBrowserRouter([
  {
    path: "/",
    element: <QuickStart/>,
  },
  {
    path: "/mint",
    element: <MintNft/>,
  },
  {
    path: "/marketplace",
    element: <MarketPlace/>,
  },
  {
    path:"/wallet",
    element:<Wallet/>,
  },
  // {
  //   path:"/explorer",
  //   element:<Explorer/>,
  //   children:[
  //     {
  //       path:"",
  //       element:<Test/>
  //     },
  //     {
  //       path:"test",
  //       element:<Tests/>
  //     },
  //   ]
  // },
]);


export default router;
