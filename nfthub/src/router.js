import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import QuickStart from "./components/QuickStart/QuickStart"
import MintNft from "./components/MintNft/MintNft"
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
    path:"/wallet",
    element:<Wallet/>,
  },
]);


export default router;
