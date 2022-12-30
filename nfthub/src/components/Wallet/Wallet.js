import React from "react";
import "./Wallet.css";

function Wallet() {
  return (
    <div class="container mt-4 middle">
      
      <div className="border border-white rounded p-4" style={{width:"40rem"}}>
        <h1>Hello</h1>
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
          </form>
      </div>
    </div>
  );
}

export default Wallet;
