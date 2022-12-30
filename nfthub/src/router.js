import {
  createBrowserRouter,
  // RouterProvider,
} from "react-router-dom";

import QuickStart from "./components/QuickStart/QuickStart"
import MintNft from "./components/MintNft/MintNft"
import MarketPlace from "./components/MarketPlace/MarketPlace"

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
]);


export default router;
