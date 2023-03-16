import { useParams } from 'react-router-dom';
import NFTTile from "../MarketPlace/NFTTile";
import NFTHub from "../../contracts/NFTHub.json";
import axios from "axios";
import { useState
    // , useEffect 
} from "react";
import {CenterLoader as Loader} from "../Loader/LoaderDNA"

export default function UserProfile () {
    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");
    const [loader, setLoader] = useState(<Loader/>)

    async function getNFTData(tokenId) {
        const ethers = require("ethers");
        let sumPrice = 0;
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(NFTHub.address, NFTHub.abi, signer)

        //create an NFT Token
        let transaction = await contract.getMyNFTs()

        /*
        * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
        * and creates an object of information that is to be displayed
        */
        
        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            let meta = await axios.get(tokenURI);
            meta = meta.data;

            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
            }
            sumPrice += Number(price);
            return item;
        }))

        updateData(items);
        updateFetched(true);
        updateAddress(addr);
        updateTotalPrice(sumPrice.toPrecision(3));
        setLoader()
    }

    const params = useParams();
    const tokenId = params.tokenId;
    if(!dataFetched)
        getNFTData(tokenId);

    return (
        <div className="container">
            <div className="mt-3 middle">
                <h3 className="border border-secondary p-3 rounded">User Profile</h3>
            </div>
            <div className="container row border border-info rounded p-3">
                {loader}
            <div className="">
                    <div>
                        <h5 className="font-bold">No. of NFTs: {data.length}</h5>
                        
                    </div>
                    <div className="ml-20">
                        <h5 className="font-bold">Total Value: {totalPrice} ETH</h5>
                        
                    </div>
            </div>
            <div className="flex flex-col text-center items-center mt-11 text-white border border-success p-3 rounded">
                <h2 className="font-bold">Your NFTs</h2>
                <div className="d-flex row">
                    {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                    })}
                </div>
                <div className="mt-10 text-xl">
                    {data.length == 0 ? "Oops, No NFT data to display (Are you logged in?)":""}
                </div>
            </div>
            </div>
        </div>
    )
};