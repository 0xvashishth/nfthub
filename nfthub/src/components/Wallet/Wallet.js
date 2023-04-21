import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import PirateContractABI from "../../contracts/PirateToken-abi.json";
import MaticMainnetContractABI from "../../contracts/MaticMainnetToken-abi.json";
import GoerliContractABI from "../../contracts/GoerliTestnetToken-abi.json";
import EthMainnetContractABI from "../../contracts/EthMainnetToken-abi.json";
import { transact } from "./Interact";
import { useGlobalState } from "../../configuration/settings";
import toast, { Toaster } from "react-hot-toast";
import { chainCheck } from "./chainCheck";
import "./Wallet.css";

const Wallet = () => {
  let PirateContractAddress =
    process.env.REACT_APP_PIRATE_CONTRACT_ADDRESS_MUMBAI;
  let MaticMainnetContractAddress =
    process.env.REACT_APP_MATIC_CONTRACT_ADDRESS_MAINNET;
  let EthMainnetContractAddress =
    process.env.REACT_APP_ETH_CONTRACT_ADDRESS_MAINNET;
  let GoerliTestnetContractAddress =
    process.env.REACT_APP_GOERLI_CONTRACT_ADDRESS;

  const [tokenType, settokenType] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentAddress, setcurrentAddress] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
		      setcurrentAddress(result[0])
          console.log(currentAddress)
          accountChangedHandler(result[0]);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      toast.error("Please install MetaMask browser extension to interact");
    }
  };

  const accountChangedHandler = (newAccount) => {
    // updateEthers();
  };
  const chainChangedHandler = () => {
    window.location.reload();
  };
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  const updateEthers = async (e) => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("Updating Ethers", e);
    let tempSigner = tempProvider.getSigner();
    var contractAddress;
    var contractAbi;
    if (e === "prt") {
      contractAddress = PirateContractAddress;
      contractAbi = PirateContractABI.abi;
    } else if (e === "mmatic") {
      contractAddress = MaticMainnetContractAddress;
      contractAbi = MaticMainnetContractABI;
    } else if (e === "geth") {
      contractAddress = GoerliTestnetContractAddress;
      contractAbi = GoerliContractABI;
    } else if (e === "meth") {
      contractAddress = EthMainnetContractAddress;
      contractAbi = EthMainnetContractABI;
    } else {
      toast.success("Please Select Token Type");
    }
	console.log(contractAddress, contractAbi)
    let tempContract = new ethers.Contract(
		contractAddress,
		contractAbi,
      	tempSigner
    );
    setContract(tempContract);
  };

  useEffect(() => {
    connectWalletHandler();
  });

  const [currentChain] = useGlobalState("globalChain");

  const transferHandler = async (e) => {
	if(e == null){
		toast.error("Please Select asset type");
		return;
	}
    const toastId = toast.loading("Waiting For Sign Transaction");
    e.preventDefault();
    let transferAmount = e.target.sendAmount.value;
    let recieverAddress = e.target.recieverAddress.value;
    console.log(recieverAddress, transferAmount);
    console.log(contract);
    transact(contract, recieverAddress, transferAmount, toastId, tokenType);
  };

  async function updateToken(e) {
    var decision;
    decision = await chainCheck(e);
    if (decision === false) {
      toast.error(
        "Please change network in order to do transfer in Selected Token"
      );
    }else{
		settokenType(e);
    	updateEthers(e);
	}
  }

  return (
    <div className="middle d-flex justify-content-center">
      <div className="container mt-4 middle">
        <h3 className="justify-content-center text-center fs-2">Wallet</h3>
        <div
          className="border border-white rounded p-4 form"
          style={{ width: "40rem" }}
        >
          <span className="m-1 d-flex">On {currentChain} 🗼</span>
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
              <select
                className="form-select"
                id="assets"
                onChange={(e) => {
                  updateToken(e.target.value);
                }}
              >
                <option defaultValue>--Select Token---</option>
                <option value="prt">Pirate Token</option>
                <option value="mumatic" disabled>
                  Mumbai Matic
                </option>
                <option value="mmatic" disabled>Mainnet Matic</option>
                <option value="geth" disabled>Goerli Ethereum</option>
                <option value="meth">Mainnet Ethereum</option>
              </select>
            </div>
            <div className="d-flex justify-content-around">
              <button
                type="submit"
                id="transfer"
                className="btn btn-warning mt-4"
              >
                Transfer
              </button>
            </div>
          </form>
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default Wallet;
