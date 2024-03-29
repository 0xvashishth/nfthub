import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../configuration/pinata";
// import { useLocation } from "react-router";
// import NFTHUB from "../../contracts/NFTHUB.json";
import NH from "../../contracts/NH.json";
// import { Utils } from "alchemy-sdk";
import { useGlobalState } from "../../configuration/settings";
import toast, { Toaster } from "react-hot-toast";
// import './SellNFT.css'
import { getDarkMode } from "../../configuration/misc";
// import { useParams , useLocation } from "react-router-dom";
// import axios from "axios";
// import {CenterLoader as Loader} from "../Loader/LoaderDNA"
import './SellNFT.css'

export default function SellNFT() {
  const darkMode = getDarkMode();

  const [currentAccountAddress] = useGlobalState("currentAccountAddress");
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
    to: "",
    isSoulBound: false,
    iscurrentListed: false,
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
    const toastId = toast.loading("Started Listing NFT.. 🤩");
    e.preventDefault();
    var { name, description, price, to, isSoulBound, iscurrentListed } = formParams;
    if (!price || !name || !description) {
      toast.error("Please Fill All The Fields.. ⚒",
        {
          id: toastId,
        }
      );
      return;
    }
    var toArray = [];
    if (to === "") {
      toArray[0] = currentAccountAddress;
    } else {
      to = to.replace(/\s/g, "");
      toArray = to.split(",");
      console.log(toArray)
      if (toArray.length < 1) {
        toast.error("Please Provide Address Correctly or refresh your browser.. ⚒",
          {
            id: toastId,
          }
        );
        return;
      }
    }
    if (iscurrentListed) {
      if (isSoulBound) {
        toast.error("You can's list a SoulBound NFT.. ⚒",
          {
            id: toastId,
          }
        );
        return;
      }
      else if (toArray.length > 1) {
        toast.error("You can't list NFT of multiple owners.. ⚒",
          {
            id: toastId,
          }
        );
        return;
      }
    }
    toast.loading("Uploading Your Data To IPFS..😏", { id: toastId, });
    // let weiAmount = Utils.parseEther(price);
    // console.log(weiAmount);

    // Upload data to IPFS
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
      let contract = new ethers.Contract(NH.address, NH.abi, signer);
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
      let transaction = await contract.createToken(metadataURL, price, toArray, isSoulBound, iscurrentListed, {
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
      return;
    }
    console.log(formParams)
  }

  return (
    <div className={`my-3 container`}>
      <div className="mt-3 middle">
        <h3 className="p-3 rounded">Mint NFT</h3>
      </div>
      <div className={`border mt-3 border-white rounded m-auto mb-4 form width-a`}>
        <form className={`p-3 ${darkMode ? "" : "lightThemeSellNft"} bg-blurrr`}>
          <fieldset>
            {/* <legend className="p-1">Mint Your NFT</legend>
              <hr /> */}
            <div className="form-group ">
              <label className={`form-label mt-4 ${darkMode ? "" : "lightThemeSellNftLabel"} tc`} htmlFor="name">
                NFT Name
              </label>
              <input
                className={`form-control ${darkMode ? "" : "lightThemeInput"}`}
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
              <label htmlFor="description" className={`form-label mt-4 ${darkMode ? "" : "lightThemeSellNftLabel"} tc`}>
                NFT Description
              </label>
              <textarea
                className={`form-control ${darkMode ? "" : "lightThemeInput"}`}
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
            {/* <div className="form-group">
                <label htmlFor="nftType" className="form-label mt-4">
                  NFT Type
                </label>
                <select className="form-select" id="nftType">
                  <option value="soul">SoulBound NFT</option>
                  <option value="simple">Simple NFT</option>
                </select>
              </div> */}
            <div className="form-group">
              <label className={`form-label mt-4 ${darkMode ? "" : "lightThemeSellNftLabel"} tc`} htmlFor="price">
                Price (in ETH)
              </label>
              <input
                className={`form-control ${darkMode ? "" : ""}`}
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
              <div className="form-check form-switch mb-3">
                <input
                  className={`form-check-input ${darkMode ? "" : "lightThemeInput"}`}
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  onChange={(e) =>
                    updateFormParams({ ...formParams, isSoulBound: e.target.checked })
                  }
                  value={formParams.isSoulBound}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  SoulBound NFT
                </label><br />
                <small id="flexSwitchCheckDefault1" className="form-text text-muted">
                  You can't list this NFT for sell in future.
                </small>
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className={`form-check-input ${darkMode ? "" : "lightThemeInput"}`}
                  type="checkbox"
                  id="flexSwitchCheckDefault1"
                  onChange={(e) =>
                    updateFormParams({ ...formParams, iscurrentListed: e.target.checked })
                  }
                  value={formParams.iscurrentListed}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault1"
                >
                  Want to list for sell this NFT?
                </label>
                <br />
                <small id="flexSwitchCheckDefault1" className="form-text text-muted">
                  If opting soulbound than you can't list this NFT for sell.
                </small>
              </div>


              <div className="form-group mt-4">
                <label className={`form-label ${darkMode ? "" : "lightThemeSellNftLabel"} tc`} htmlFor="toAddr">
                  To whom you want to transfer this NFT?
                </label>
                <input className={`form-control ${darkMode ? "" : "lightThemeInput"}`} type="text" id="toAddr" onChange={(e) =>
                  updateFormParams({ ...formParams, to: e.target.value })
                }
                  value={formParams.to} />
                <small id="toAddr" className="form-text text-muted">
                  If you want this NFT for you, then leave it blank..
                </small>
              </div>
              <div className="form-group mt-4">
                <label className={`form-label ${darkMode ? "" : "lightThemeSellNftLabel"} tc`} htmlFor="image">
                  Upload Image
                </label>
                <input
                  className={`form-control ${darkMode ? "" : "lightThemeInput"}`}
                  type={"file"}
                  onChange={OnChangeFile}
                ></input>
              </div>
            </fieldset>
            <button onClick={listNFT} className={`mt-3 form-control btn  ${darkMode ? "btn-warning" : "btn-info"}`}>
              List NFT
            </button>
          </fieldset>
        </form>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </div>
  );
}
