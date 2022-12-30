import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import QuickStart from "./components/QuickStart/QuickStart"
import MintNft from "./components/MintNft/MintNft"

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuickStart/>,
  },
  {
    path: "/mint",
    element: <MintNft/>,
  },
]);


export default router;
