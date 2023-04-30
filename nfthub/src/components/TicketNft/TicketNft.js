import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../configuration/pinata";
import NH from "../../contracts/NH.json";
import { useGlobalState } from "../../configuration/settings";
import toast, { Toaster } from "react-hot-toast";
import './TicketNft.css';
// import NFTHUB from "../../contracts/NFTHUB.json";
// import { useLocation } from "react-router";
// import { Utils } from "alchemy-sdk";

export default function TicketNft() {

  const [currentAccountAddress] = useGlobalState("currentAccountAddress");
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "0.001",
    to: "",
    isSoulBound: true,
    iscurrentListed: false,
  });
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");

  async function OnChangeFile(e) {
    const toastId = toast.loading("Uploading Your Ticket To IPFS 🤩");
    var file = e.target.files[0];
    try {
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
      toast.success("Successfully Uploaded Your Ticket 😎",
        {
          id: toastId,
        }
      );
    } catch (e) {
      console.log("Error during file upload", e);
      toast.error("Error While Uploading Your Ticket 😥, Please Upload Again!",
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
        console.log("Uploaded JSON to IPFS: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function listNFT(e) {
    const toastId = toast.loading("Started Listing Ticket.. 🤩");
    e.preventDefault();
    var { name, description, price, to, isSoulBound, iscurrentListed } = formParams;
    if (!price || !name || !description) {
      toast.error("Please Fill All The Required Fields.. ⚒",
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
      toArray.unshift(currentAccountAddress)
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
      toast.error("You can't list a Ticket.. ⚒",
        {
          id: toastId,
        }
      );
      return;
    }
    if (!isSoulBound) {
      toast.error("You can't list a Ticket without soulbound behaviour.. ⚒",
        {
          id: toastId,
        }
      );
      return;
    }
    if (price != "0.001") {
      toast.error("You have explicitly did something wrong.. ⚒",
        {
          id: toastId,
        }
      );
      return;
    }
    toast.loading("Uploading Your Ticket's Metadata To IPFS..😏", { id: toastId, });
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
      toast.loading("Creating Your Ticket.. 🎉🎭",
        {
          id: toastId,
        }
      );
      await transaction.wait();

      toast.success("Your Ticket Is Created.. 🎉🎭",
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
  }

  return (
    <div>
      <div className="container items-center p-3 text-center mx-auto">
        <h3 className="rounded fs-2">Create Tickets</h3>
        <div id="eventRecipient" className="form-text tcw">
          Tickets will not be sold after the minting.. as these tickets will be soulbound
          NFTs
        </div>
      </div>
      <form className="container mb-4 border border-black p-3 bg-blurrr divwidth">
        <div className="mb-3">
          <label htmlFor="eventName" className="form-label">
            Event Name
          </label>
          <input
            type="eventName"
            className="form-control"
            id="eventName"
            aria-describedby="eventName"
            onChange={(e) =>
              updateFormParams({ ...formParams, name: e.target.value })
            }
            value={formParams.name}
          />
          <div id="eventName" className="form-text">
            Enter complete name of event, we will add prefix as 'event'
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="eventDescription" className="form-label">
            Event Description
          </label>
          <textarea
            type="eventDescription"
            className="form-control"
            id="eventDescription"
            aria-describedby="eventDescription"
            value={formParams.description}
            onChange={(e) =>
              updateFormParams({
                ...formParams,
                description: e.target.value,
              })
            }
          />
          <div id="eventDescription" className="form-text">
            Enter complete event description
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="eventRecipient" className="form-label">
            Who will get tickets?
          </label>
          <textarea
            type="eventRecipient"
            className="form-control"
            id="eventRecipient"
            aria-describedby="eventRecipient"
            onChange={(e) =>
              updateFormParams({ ...formParams, to: e.target.value })
            }
            value={formParams.to}
          />
          <div id="eventRecipient" className="form-text">
            Enter all recipients ethereum addresses that are gonna attend the event (Saperated by comma...)
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label " htmlFor="image">
            Upload Image
          </label>
          <input
            className="form-control"
            type={"file"}
            onChange={OnChangeFile}
          ></input>
        </div>
        <button type="submit" onClick={listNFT} className="mt-4 btn form-control btn-warning">
          Submit
        </button>
      </form>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}
