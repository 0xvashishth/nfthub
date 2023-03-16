import NFTHub from "../../contracts/NFTHub.json";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {CenterLoader as Loader} from "../Loader/LoaderDNA"

export default function NFTPage(props) {
  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");
  const [displayData, setDisplayData] = useState(<Loader/>)

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(NFTHub.address, NFTHub.abi, signer);
    //create an NFT Token
    const tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    console.log(listedToken);

    let item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };
    // console.log(item);
    updateData(item);
    updateDataFetched(true);
    // console.log("address", addr);
    updateCurrAddress(addr);
    setDisplayData(<>
        <img src={item.image} alt="" className="nftPageImg col-md-5 com-sm-8" />
      <div className="p-5 col-md-7 com-sm-8">
        <div>Name: {item.name}</div>
        <div>Description: {item.description}</div>
        <div>
          Price: <span className="">{item.price + " ETH"}</span>
        </div>
        <div>
          Owner: <span className="text-sm">{item.owner}</span>
        </div>
        <div>
          Seller: <span className="text-sm">{item.seller}</span>
        </div>
        <div>
          {currAddress === item.owner || currAddress === item.seller ? (
            <button
              className="enableEthereumButton btn btn-outline-warning mt-3"
              onClick={() => buyNFT(tokenId)}
            >
              Buy this NFT
            </button>
          ) : (
            <div className="text-emerald-700">
              You are the owner of this NFT
            </div>
          )}

          <div className="text-green text-center mt-3">{message}</div>
        </div>
      </div>
    </>)
  }

  async function buyNFT(tokenId) {
    try {
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(NFTHub.address, NFTHub.abi, signer);
      const salePrice = ethers.utils.parseUnits(data.price, "ether");
      updateMessage("Buying the NFT... Please Wait (Upto 5 mins)..");
      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      alert("You successfully bought the NFT!");
      updateMessage("");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  return (
    <div className="row container m-4 middle d-flex mx-auto border border-info p-2">
      {displayData}
    </div>
  );
}
