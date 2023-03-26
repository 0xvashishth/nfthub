import NFTTile from "./NFTTile";
import NFTHub from "../../contracts/NFTHub.json";
import axios from "axios";
import { useState, useEffect } from "react";
import { CenterLoader as Loader } from "../Loader/LoaderDNA"
// import $ from "jquery";

export default function MarketPlace() {

  // sample data for initial render
  const sampleData = [
    {
      name: "NFT#1",
      description: "Alchemy's First NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
  ];

  const [data, updateData] = useState(sampleData);

  async function getAllNFTs() {
    // console.log("Inside Get All NFTs");
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(NFTHub.address, NFTHub.abi, signer);
    let transaction = await contract.getAllNFTs();

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        // console.log("Token uri", tokenURI);
        let meta = await axios({
          method: "get",
          url: tokenURI,
          headers: {
            Accept: "text/plain",
          },
        });
        meta = meta.data;
        // console.log("Meta Data", meta)

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        return item;
      })
    );
    console.log(items);
    updateData(items);
  }

  useEffect(() => {
    getAllNFTs();
  }, []);

  return (
    <div className="">
      <div className="mt-3 middle">
        <h3 className="border border-secondary p-3 rounded">NFT MarketPlace</h3>
      </div>
      {/* <div className="mt-3 d-flex">
        <select
          className="form-select"
          id="nftType"
          // onMouseOver={changeBackground}
          data-placeholder="Choose&hellip;"
        >
          <option value="default" defaultValue>
            Select NFT Type
          </option>
          <option value="imagenft">Image</option>
          <option value="videonft">Video</option>
          <option value="gifnft">Gif</option>
        </select>
        <select
          className="ms-2 form-select"
          id="nftVersionSelect"
        >
          <option value="default" defaultValue>
            Select NFT Version
          </option>
          <option value="imagenft">Soul Bound NFT</option>
          <option value="videonft">Simple NFT</option>
        </select>
      </div> */}

      <div className="container">
        <div className="d-flex row">
          {data.length === 1 ? <Loader /> : data.map((value, index) => {
            return <NFTTile data={value} key={index}></NFTTile>;
          })}
        </div>
      </div>
    </div>
  );
}
