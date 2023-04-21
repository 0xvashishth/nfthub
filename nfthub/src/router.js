import {
  createBrowserRouter,
} from "react-router-dom";

import QuickStart from "./components/QuickStart/QuickStart"
// import MintNft from "./components/MintNft/MintNft"
import MarketPlace from "./components/MarketPlace/MarketPlace"
import Wallet from "./components/Wallet/Wallet";
// import Explorer from "./components/Explorer/Explorer";
// import Test from "./components/Test/Test";
// import Tests from "./components/Test/Tests";
import FindBlock from "./components/Explorer/findBlock";
import InitialBlocksTransactions from "./components/Explorer/InitialBlocksTransactions";
import Erc20Indexer from "./components/ERC-20Indexer/erc-20Indexer";
import NftIndexer from "./components/NftIndexer/NftIndexer";
import Transfers from "./components/Transfers/Transfers"
import Uniswap from "./components/Uniswap/Uniswap";
import NFTPage from "./components/MarketPlace/NFTPage";
import SellNFT from "./components/MarketPlace/SellNFT";
import UserProfile from "./components/UserProfile/UserProfile";
import TicketNft from "./components/TicketNft/TicketNft";
import QRScan from "./components/ScanQR/QRScan";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuickStart/>,
  },
  {
    path: "/nft/mint",
    element: <SellNFT/>,
  },
  {
    path: "/nft/marketplace",
    element: <MarketPlace/>,
  },
  {
    path:"/wallet",
    element:<Wallet/>,
  },
  {
    path: "/explorer",
    element: <InitialBlocksTransactions/>,
  },
  {
    path: "/explorer/block",
    element: <FindBlock/>,
  },
  {
    path: "/erc20indexer",
    element: <Erc20Indexer/>,
  },
  {
    path: "/nftindexer",
    element: <NftIndexer/>
  },
  {
    path: "/transfers",
    element: <Transfers/>
  },
  {
    path: "/swap",
    element: <Uniswap/>
  },
  {
    path: "/nft/:tokenId",
    element: <NFTPage/>
  },
  {
    path: "/user",
    element: <UserProfile/>
  },
  {
    path: "/ticket/create",
    element: <TicketNft/>
  }
]);


export default router;
