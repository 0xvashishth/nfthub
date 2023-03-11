import "./erc-20Indexer.css";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useState } from "react";
import Loader from "../Loader/LoaderDNA";
import { alchemyMumbai as alchemy } from "../../configuration/settings";

export default function Erc20Indexer() {
  const [userAddress, setUserAddress] = useState("");
  const [erc20data, seterc20data] = useState("");
  const [loader, setloader] = useState("");

  function trunc(text) {
    return text.length > 10 ? `${text.substr(0, 10)}...` : text;
  }

  async function getTokenBalance() {
    setloader(
      <div className="d-flex justify-content-center pb-3">
        <Loader></Loader>
      </div>
    );
    seterc20data("");
    const data = await alchemy.core.getTokenBalances(userAddress);

    var erc20Array = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = await alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      erc20Array[i] = (
        <div className="mt-5 justify-content-around container" key={i}>
          <div className="alert alert-dismissible alert-info">
            <div className="row">
              <div className="col-3">
                <img height="50px" alt="#img" src={tokenData.logo} />
              </div>
              <div className="col-9">
                <div>
                  <b>Symbol:</b> ${tokenData.symbol}&nbsp;
                </div>
                <div className="">
                  <b>Balance:</b>&nbsp;
                  {trunc(
                    Utils.formatUnits(
                      data.tokenBalances[i].tokenBalance,
                      tokenData.decimals
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    seterc20data(erc20Array);
    setloader();
  }

  return (
    <>
      <div className="container mt-4 middle">
        <div
          className="border border-white rounded p-4"
          style={{ width: "40rem" }}
        >
          <h1>ERC-20 Indexer</h1>
          <div className="m-1">On Mumbai Matic 🗼</div>
          <hr />
          <div className="form-group">
            <label htmlFor="walletAddress" className="form-label">
              Ethereum Wallet Address
            </label>
            <input
              type="text"
              pattern="^0x[a-fA-F0-9]{40}$"
              className="form-control"
              id="walletAddress"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              aria-describedby="emailHelp"
              placeholder="Enter wallet address"
            />
            <small id="emailHelp" className="form-text text-muted">
              Enter address for which you want to check erc-20 token balances
            </small>
          </div>
          <div className="d-flex justify-content-around">
            <button
              type="submit"
              id="transfer"
              onClick={getTokenBalance}
              className="btn btn-outline-light mt-4"
            >
              Check ERC-20 Tokens
            </button>
          </div>
        </div>
      </div>
      {loader}
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-sm-2">
        {erc20data}
      </div>
    </>
  );
}
