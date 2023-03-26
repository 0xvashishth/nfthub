import React from "react";
import "./QuickStart.css";
import character from "./character.png";
import boredApeYatchBgLess from "./boredApeYatchBgLess.png";


const QuickStart = (props) => {

  return (
    <div className="m-4">
      <div className="m-2">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-3 quickContentLeft border border-white rounded m-3 pb-0">
              <p className="nfthubtitle mt-3">📢 NFTHUB</p>
              <hr />
              <img alt="img" className="imgleft centerimg" src={boredApeYatchBgLess}></img>
            </div>
            <div className="col-md-6 quickContentRight  border border-white rounded m-3">
              <p className="nfthubtitle mt-3">👀 What is NFTHUB? </p>
              <hr/>
              <div className="m-3 contentRight">
                <b>A multichain Defi Dashboard</b> which allows you to track
                your assets on multiple chains. It also allows users to create
                their own NFTs on Polygon with a very friendly user interface.
                Any media you hold, a video, an image, an audio file can be
                converted to an NFT. The gas fees for minting are minimal thanks
                to the Polygon Network. Currently the minter is on Polygon
                testnet.
                <hr />
                We are working on our new cryptocurrency called{" "}
                <b>Pirate Coin</b>. We want to transfer this whole NFT
                transaction on Pirate Coin to have very less gas fees and easy
                to purchase the coins and NFTs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStart;
