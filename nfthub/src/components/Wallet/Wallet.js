import React from "react";
import "./Wallet.css";

function Wallet() {
  return (
    <div className="container mt-4 middle">
      
      <div className="border border-white rounded p-4" style={{width:"40rem"}}>
        <h1>Wallet</h1>
          <hr/>
          <form>
            <div className="form-group">
              <label htmlFor="walletAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                pattern="^0x[a-fA-F0-9]{40}$"
                className="form-control"
                id="walletAddress"
                aria-describedby="emailHelp"
                placeholder="Enter wallet address"
              />
              <small id="emailHelp" className="form-text text-muted">
                Enter the reciever's address
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                aria-describedby="emailHelp"
                placeholder="Enter the amount"
              />
            </div>

            <div className="form-group">
                <label htmlFor="assets" className="form-label mt-4">Assets</label>
                <select className="form-select" id="assets">
                  <option selected disabled>Choose...</option>
                  <option value="soul">Polygon Matic</option>
                  <option value="simple">Ethereum</option>
                </select>
            </div>
            <div className="d-flex justify-content-around">
              <button type="submit" id="transfer" className="btn btn-outline-light mt-4">Transfer</button>
            </div>
          </form>
      </div>
    </div>
  );
}

export default Wallet;
