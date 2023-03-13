import { React, useState } from "react";
import { useGlobalState } from "../../configuration/settings";
import toast, { Toaster } from "react-hot-toast";

const Interactions = (props) => {
//   const [alchemy] = useGlobalState("globalAlchemyInstance");
  const [currentChain] = useGlobalState("globalChain");

  const transferHandler = async (e) => {
    
    const toastId = toast.loading('Waiting For Sign Transaction');
    e.preventDefault();
    let transferAmount = e.target.sendAmount.value;
    let recieverAddress = e.target.recieverAddress.value;
    console.log(recieverAddress, transferAmount);
    console.log(props.contract);
    try {
        let txt = await props.contract.transfer(recieverAddress, transferAmount);
        console.log(txt);
        var linkHash = "https://mumbai.polygonscan.com/tx/" + txt.hash;
        toast.success(<a href={linkHash} target="_blank">Successfully Transact</a>, {
            id: toastId,
          });
    } catch (error) {
        toast.error("Error In Transaction | Insufficient Funds", {
            id: toastId,
        })
    }
  };

  return (
    <div className="container mt-4 middle">
      <div
        className="border border-white rounded p-4"
        style={{ width: "40rem" }}
      >
        <h3 className="justify-content-center text-center">Wallet</h3>
        <span className="m-1 text-muted d-flex">On {currentChain} 🗼</span>
        <hr />
        <form onSubmit={transferHandler}>
          <div className="form-group">
            <label htmlFor="walletAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              pattern="^0x[a-fA-F0-9]{40}$"
              className="form-control"
              id="recieverAddress"
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
              id="sendAmount"
              aria-describedby="emailHelp"
              placeholder="Enter the amount"
            />
          </div>

          <div className="form-group">
            <label htmlFor="assets" className="form-label mt-4">
              Assets
            </label>
            <select className="form-select" id="assets" onChange={(e) => props.setToken(e.target.value)}>
              <option defaultValue value="prt">
                Pirate Token 
              </option>
              <option value="mumatic" disabled>Mumbai Matic</option>
              <option value="mmatic">Mainnet Matic</option>
              <option value="geth">Goerli Ethereum</option>
              <option value="meth">Mainnet Ethereum</option>
            </select>
          </div>
          <div className="d-flex justify-content-around">
            <button
              type="submit"
              id="transfer"
              className="btn btn-outline-light mt-4"
            >
              Transfer
            </button>
          </div>
        </form>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Interactions;
