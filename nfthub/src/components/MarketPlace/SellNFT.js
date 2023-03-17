import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../configuration/pinata";
// import { useLocation } from "react-router";
import NFTHub from "../../contracts/NFTHub.json";
import toast, { Toaster } from "react-hot-toast";
// import { useParams , useLocation } from "react-router-dom";
// import axios from "axios";
// import {CenterLoader as Loader} from "../Loader/LoaderDNA"

export default function SellNFT() {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  //   const [message, updateMessage] = useState("");

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    const toastId = toast.loading("Uploading Your File To IPFS 🤩");
    var file = e.target.files[0];
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
      toast.success("Successfully Uploaded Your File 😎",
        {
          id: toastId,
        }
      );
    } catch (e) {
      console.log("Error during file upload", e);
      toast.error("Error While Uploading Your File 😥, Please Upload Again!",
        {
          id: toastId,
        }
      );
    }
  }

  //This function uploads the metadata to IPDS
  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !fileURL) return;

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function listNFT(e) {
    e.preventDefault();
    const toastId = toast.loading("Uploading Your Data To IPFS..😏");
    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      toast.loading("Please Wait.. 🙂",
        {
          id: toastId,
        }
      );

      //Pull the deployed contract instance
      let contract = new ethers.Contract(NFTHub.address, NFTHub.abi, signer);
      //massage the params to be sent to the create NFT request
      const price = ethers.utils.parseUnits(formParams.price, "ether");
      console.log(price)
      toast.loading("Preparing Data From BlockChain.. 🎉",
        {
          id: toastId,
        }
      );
      let listingPrice = await contract.getListPrice();

      listingPrice = listingPrice.toString();
      //actually create the NFT
      let transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      });
      toast.loading("Creating Your NFT.. 🎉🎭",
        {
          id: toastId,
        }
      );
      await transaction.wait();

      toast.success("Your NFT Is Created.. 🎉🎭",
        {
          id: toastId,
        }
      );
      updateFormParams({ name: "", description: "", price: "" });
      window.location.replace("/nft/marketplace");
    } catch (e) {
      toast.error("Something Went Wrong 🥺.. Please Try Again..!",
        {
          id: toastId,
        }
      );
    }
  }

  return (
    <div className="container">
      <div className="mt-3 middle">
        <h3 className="border border-secondary p-3 rounded">Mint NFT For Sell</h3>
      </div>
      <div className="border p-3 mt-3 border-white rounded m-auto mb-2 MintDiv col-7 mb-4">
        <div className="">
          <form>
            <fieldset>
              {/* <legend className="p-1">Mint Your NFT</legend>
              <hr /> */}
              <div className="form-group">
                <label className="form-label mt-4" htmlFor="name">
                  NFT Name
                </label>
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  placeholder="Axie#4563"
                  onChange={(e) =>
                    updateFormParams({ ...formParams, name: e.target.value })
                  }
                  value={formParams.name}
                ></input>
                <small id="nftHelp" className="form-text text-muted">
                  Please make sure that you will not be able to edit the
                  properties of the NFT.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label mt-4">
                  NFT Description
                </label>
                <textarea
                  className="form-control"
                  cols="40"
                  rows="5"
                  id="description"
                  type="text"
                  placeholder="Axie Infinity Collection"
                  value={formParams.description}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="nftType" className="form-label mt-4">
                  NFT Type
                </label>
                <select className="form-select" id="nftType">
                  <option value="soul">SoulBound NFT</option>
                  <option value="simple">Simple NFT</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label mt-4" htmlFor="price">
                  Price (in ETH)
                </label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Min 0.01 ETH"
                  step="0.01"
                  value={formParams.price}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, price: e.target.value })
                  }
                ></input>
              </div>
              <fieldset className="form-group mt-4 mb-3">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Allow to send other user if opt for Soul Bound NFT
                  </label>
                </div>
                <div className="form-group">
                  <label className="form-label mt-4" htmlFor="image">
                    Upload Image
                  </label>
                  <input
                    className="form-control"
                    type={"file"}
                    onChange={OnChangeFile}
                  ></input>
                </div>
              </fieldset>
              <button onClick={listNFT} className="mt-3 btn btn-outline-warning">
                List NFT
              </button>
            </fieldset>
          </form>
          <Toaster position="bottom-center" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
}
