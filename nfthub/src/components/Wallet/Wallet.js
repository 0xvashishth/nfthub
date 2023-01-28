import React from "react";
import "./Wallet.css";

function Wallet() {
  return (
    <div class="container mt-4 middle">
      
      <div className="border border-white rounded p-4" style={{width:"40rem"}}>
        <h1>Wallet</h1>
          <hr/>
          <form>
            <div class="form-group">
              <label for="walletAddress" class="form-label">
                Address
              </label>
              <input
                type="text"
                pattern="^0x[a-fA-F0-9]{40}$"
                class="form-control"
                id="walletAddress"
                aria-describedby="emailHelp"
                placeholder="Enter wallet address"
              />
              <small id="emailHelp" class="form-text text-muted">
                Enter the reciever's address
              </small>
            </div>
            <div class="form-group">
              <label for="amount" class="form-label">
                Amount
              </label>
              <input
                type="number"
                class="form-control"
                id="amount"
                aria-describedby="emailHelp"
                placeholder="Enter the amount"
              />
            </div>

            <div class="form-group">
                <label for="assets" class="form-label mt-4">Assets</label>
                <select class="form-select" id="assets">
                  <option selected disabled>Choose...</option>
                  <option value="soul">Polygon Matic</option>
                  <option value="simple">Ethereum</option>
                </select>
            </div>
            <div class="d-flex justify-content-around">
              <button type="submit" id="transfer" class="btn btn-outline-light mt-4">Transfer</button>
            </div>
          </form>
      </div>
    </div>
  );
}

export default Wallet;
