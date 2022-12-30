import {
  createBrowserRouter,
  // RouterProvider,
} from "react-router-dom";

import QuickStart from "./components/QuickStart/QuickStart"
import MintNft from "./components/MintNft/MintNft"
import MarketPlace from "./components/MarketPlace/MarketPlace"
import Wallet from "./components/Wallet/Wallet";

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
]);


export default router;
