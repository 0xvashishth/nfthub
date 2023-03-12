import "./erc-20Indexer.css";
import { Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import Loader from "../Loader/LoaderDNA";
// import { alchemyMumbai as alchemy } from "../../configuration/settings";
import { useGlobalState } from "../../configuration/settings";

export default function Erc20Indexer() {
  const [alchemy] = useGlobalState("globalAlchemyInstance");
  const [currentChain] = useGlobalState("globalChain");
  const [userAddress, setUserAddress] = useState("");
  const [erc20data, seterc20data] = useState("");
  const [erc20transfers, seterc20transfers] = useState("");
  const [erc20transferscount, seterc20transferscount] = useState("");
  const [loader, setloader] = useState("");

  function trunc(text) {
    return text.length > 10 ? `${text.substr(0, 10)}...` : text;
  }

  useEffect(()=>{
    setUserAddress("");
    seterc20data("");
    seterc20transfers("");
    seterc20transferscount("");
    setloader("");
  }, [alchemy])

  async function getTokenBalance() {
    seterc20transfers("");
    seterc20transferscount("");
    setloader(
      <div className="d-flex justify-content-center">
        <Loader></Loader>
      </div>
    );
    seterc20data("");

    // just transfer data of erc-20
    const totalerc20Transfers = await alchemy.core.getAssetTransfers({
      fromAddress: userAddress,
      category: ["erc20"],
    });
    seterc20transfers(totalerc20Transfers.transfers);
    seterc20transferscount(
      <span className="badge bg-dark">
        Total ERC20 Transfers: <b>{totalerc20Transfers.transfers.length}</b>
      </span>
    );
    console.log("Total Transfers", totalerc20Transfers);

    // erc-20 token balances
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
          <div className="m-1">On {currentChain} 🗼</div>
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
      <div className="d-flex justify-content-center pt-3">
        {erc20transferscount}
      </div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-sm-2">
        {erc20data}
      </div>
    </>
  );
}
