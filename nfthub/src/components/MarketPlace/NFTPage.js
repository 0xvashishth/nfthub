import NFTHub from "../../contracts/NFTHub.json";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { CenterLoader as Loader } from "../Loader/LoaderDNA";

export default function NFTPage() {
  const [itemData, setItemData] = useState({});

  const ethers = require("ethers");
  const params = useParams();
  const tokenId = params.tokenId;
  // const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");
  const [currAccount, updateCurrAddress] = useState(new ethers.providers.Web3Provider(window.ethereum).getSigner());
  const [displayData, setDisplayData] = useState(<Loader />);


  async function buyNFT(itemData) {
    try {
      // const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = currAccount;

      //Pull the deployed contract instance
      console.log("Inside function by: ", itemData)
      let contract = new ethers.Contract(NFTHub.address, NFTHub.abi, signer);
      console.log("before firs prize: ", itemData.price)
      const salePrice = ethers.utils.parseUnits(itemData.price, "ether");
      console.log("firs prize: ", itemData.price)
      console.log("After Parsing: ", salePrice)
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
      console.log(e)
    }
  }

  async function getNFTData() {
    
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    // const provider = new ethers.providers.Web3Provider(window.ethereum);


    const signer = currAccount;
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(NFTHub.address, NFTHub.abi, signer);
    //create an NFT Token
    const tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    let meta = await axios.get(tokenURI);
    meta = await meta.data;
    console.log("This is meta", meta)
    console.log(listedToken);

    var item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };
    // console.log(item);
    setItemData(item);
    console.log("Items", item)
    // updateDataFetched(true);
    // console.log("address", addr);
    // updateCurrAddress(addr);
    console.log(await currAccount.getAddress())
    setDisplayData(
      <>
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
            {await currAccount.getAddress() === item.seller ? (
              <div className="text-emerald-700">
                You are the owner of this NFT
              </div>
            ) : (
              <button
                className="enableEthereumButton btn btn-outline-warning mt-3"
                onClick={() => buyNFT(item)}
              >
                Buy this NFT
              </button>
            )}

            <div className="text-green text-center mt-3">{message}</div>
          </div>
        </div>
      </>
    );
    
    console.log(itemData)
  }

 


  // if (!dataFetched) getNFTData(tokenId);

  useEffect(()=>{
     getNFTData();
  }, [])

  return (
    <div className="row container m-4 middle d-flex mx-auto border border-info p-2">
      {displayData}
    </div>
  );
}
