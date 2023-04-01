// import NFTHub from "../../contracts/NFTHub.json";
import NH from "../../contracts/NH.json";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { CenterLoader as Loader } from "../Loader/LoaderDNA";
// import { useGlobalState } from "../../configuration/settings";
import toast, { Toaster } from "react-hot-toast";

export default function NFTPage() {
  const [itemData, setItemData] = useState({});
  const [addressForAuthority, setAddressForAuthority] = useState("");
  // const [currentAccountAddress] = useGlobalState("currentAccountAddress");

  const ethers = require("ethers");
  const params = useParams();
  const tokenId = params.tokenId;
  // const [dataFetched, updateDataFetched] = useState(false);
  // const [message, updateMessage] = useState("");
  const [currAccount] = useState(new ethers.providers.Web3Provider(window.ethereum).getSigner());
  const [displayData, setDisplayData] = useState(<Loader />);
  


  async function buyNFT(itemData) {
    var toastId
    try {
      toastId = toast.loading("Started Creating An Instance.. 😁");
      // const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = currAccount;

      //Pull the deployed contract instance
      console.log("Inside function by: ", itemData)
      let contract = new ethers.Contract(NH.address, NH.abi, signer);
      console.log("before first prize: ", itemData.price)
      const salePrice = ethers.utils.parseUnits(itemData.price, "ether");
      console.log("firs prize: ", itemData.price)
      console.log("After Parsing: ", salePrice)

      toast.loading("Please wait we are crunching your new NFT 😋",
        {
          id: toastId,
        }
      );

      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      toast.success("Now This is yours 🤩🤗",
        {
          id: toastId,
        }
      );
    } catch (e) {
      toast.success("There is n error 😣",
        {
          id: toastId,
        }
      );
      console.log(e)
    }
  }

  async function verifyOwner(){
    console.log(addressForAuthority)
  }



  async function getNFTData() {

    //After adding your Hardhat network to your metamask, this code will get providers and signers
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const toastId = toast.loading("Getting The NFT Data.. 🤓");

    const signer = currAccount;
    // const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(NH.address, NH.abi, signer);
    //create an NFT Token
    const tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    const tokenOwners = await contract.getOwnerFromId(tokenId);
    let meta = await axios.get(tokenURI);
    meta = await meta.data;
    // console.log("This is meta", meta)
    console.log("This is listed tokens ", listedToken);
    // console.log(tokenOwners.includes(await currAccount.getAddress()))
    // console.log("this is getten", await currAccount.getAddress())
    // console.log("this is owners", tokenOwners)

    var item = {
      price: meta.price,
      tokenId: tokenId,
      image: meta.image,
      name: meta.name,
      description: meta.description,
      _isSoulBound: listedToken._isSoulBound,
      currentlyListed: listedToken.currentlyListed
    };
    // console.log(item);
    setItemData(item);
    console.log("Items", item)
    var buyButton;
    if (tokenOwners.includes(await currAccount.getAddress())) {
      buyButton = <div className="text-emerald-700">
        You are the owner of this NFT
      </div>
    }
    else if (!item.currentlyListed) {
      buyButton = <div className="text-emerald-700">
        This is SoulBound NFT
      </div>
    } else {
      buyButton = <button
        className="enableEthereumButton btn btn-outline-warning mt-3"
        onClick={() => buyNFT(item)}
      >
        Buy this NFT
      </button>
    }
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
          {/* <div>
            Owner: <span className="text-sm">{item.owner}</span>
          </div>
          <div>
            Seller: <span className="text-sm">{item.seller}</span>
          </div> */}
          <div>
            {buyButton}
          </div>
          {/* <div className="form-group mt-4">
            <input type="text" value={addressForAuthority} onChange={(e) => changeAddress(e)} />
            <div>
              <button className="btn btn-outline-warning mt-3" onClick={verifyOwner}>Verify Owner</button>
            </div>
          </div> */}
        </div>
      </>
    );

    console.log(itemData)
    toast.success("Desired Data is here man!! 😎",
      {
        id: toastId,
      }
    );
  }


  function changeAddress(e){
    setAddressForAuthority(e.target.value);
    console.log(e.target.value)
  }

  // if (!dataFetched) getNFTData(tokenId);

  useEffect(() => {
    getNFTData();
  }, [])

  return (
    <div className="row container m-4 d-flex mx-auto border form border-info p-2" style={{display:"flex",justifyContent:"center",borderRadius:"10px"}}>
      {displayData}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}
