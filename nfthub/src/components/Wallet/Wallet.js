import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
// import {web3} from "web3"
// import styles from './Wallet.module.css'
import PirateContractABI from "../../contracts/PirateToken-abi.json"
import MaticMainnetContractABI from "../../contracts/MaticMainnetToken-abi.json"
import GoerliContractABI from "../../contracts/GoerliTestnetToken-abi.json"
import EthMainnetContractABI from "../../contracts/EthMainnetToken-abi.json"
import Interactions from './Interact';
// import { truncAddr } from '../../configuration/misc';
import "./Wallet.css"


const Wallet = () => {

	// deploy simple token contract and paste deployed contract address here. This value is local ganache chain
	let PirateContractAddress = process.env.REACT_APP_PIRATE_CONTRACT_ADDRESS_MUMBAI;
  let MaticMainnetContractAddress = process.env.REACT_APP_MATIC_CONTRACT_ADDRESS_MAINNET;
  let EthMainnetContractAddress = process.env.REACT_APP_ETH_CONTRACT_ADDRESS_MAINNET;
  let GoerliTestnetContractAddress= process.env.REACT_APP_GOERLI_CONTRACT_ADDRESS;

	const [errorMessage, setErrorMessage] = useState(null);
	const [tokenType, settokenType] = useState("mmatic");
	// const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	// const [
  //   // provider, 
  //   setProvider
  // ] = useState(null);
	// const [
  //   // signer, 
  //   setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	// const [tokenName, setTokenName] = useState("Token");
	// const [balance, setBalance] = useState(null);
	// const [transferHash, setTransferHash] = useState(null);



	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				// setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	const accountChangedHandler = (newAccount) => {
		// setDefaultAccount(newAccount);
    console.log("This is called")
		updateEthers();
    console.log("Affter this")
	}

	// const updateBalance = async () => {
	// 	let balanceBigN = await contract.balanceOf(defaultAccount);
	// 	let balanceNumber = balanceBigN.toNumber();

	// 	let tokenDecimals = await contract.decimals();

	// 	// let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);

	// 	// setBalance(ethers.BigNumber.from(tokenBalance));	


	// }

	const chainChangedHandler = () => {
		window.location.reload();
	}

	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = async () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		// setProvider(tempProvider);
    console.log("Updating Ethers")
		let tempSigner = tempProvider.getSigner();
		// setSigner(tempSigner);

    var contractAddress;
    var contractAbi;
    if(tokenType == "prt"){
      contractAddress = PirateContractAddress
      contractAbi = PirateContractABI
    }else if(tokenType == "mmatic"){
      contractAddress = MaticMainnetContractAddress
      contractAbi = MaticMainnetContractABI
    }else if(tokenType == "geth"){
      contractAddress = GoerliTestnetContractAddress
      contractAbi = GoerliContractABI
    }else if(tokenType == "meth"){
      contractAddress = EthMainnetContractAddress
      contractAbi = EthMainnetContractABI
    }

		let tempContract = await new ethers.Contract(PirateContractAddress, PirateContractABI.abi, tempSigner);
		setContract(tempContract);	
	}
  // connectWalletHandler()
	useEffect(() => {
		connectWalletHandler()
	}, []);

	const setTokenFunction = (e) => {
    console.log("Inside Changing the Token Type");
		settokenType(e);
    updateEthers();
	}
	
	return (
	<div className="middle d-flex justify-content-center">
		<Interactions contract={contract} setToken={setTokenFunction} />
    <small className="text-muted">{errorMessage}</small>
	</div>
	)
}

export default Wallet;