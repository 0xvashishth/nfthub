import './NftIndexer.css'
import { useState, useEffect } from "react";
import { CenterLoader as Loader } from "../Loader/LoaderDNA";
import { useGlobalState } from "../../configuration/settings";

export default function NftIndexer() {
  const [alchemy] = useGlobalState("globalAlchemyInstance");
  const [currentChain] = useGlobalState("globalChain");
  const [userAddress, setUserAddress] = useState("");
  const [nftdata, setnftdata] = useState("");
  const [nftnftcount, setnftnftcount] = useState("");
  const [loader, setloader] = useState("");

  useEffect(() => {
    setUserAddress("");
    setnftdata("");
    setnftnftcount("");
    setloader("");
  }, [alchemy])

  async function getTokenBalance() {
    setnftnftcount("");
    setloader(<Loader />);
    setnftdata("");

    // new approach
    const data = await alchemy.nft.getNftsForOwner(userAddress);
    // console.log("see here", data);

    const nftArray = [];
    for (let i = 0; i < data.ownedNfts.length; i++) {
      const tokenData = await alchemy.nft.getNftMetadata(
        data.ownedNfts[i].contract.address,
        data.ownedNfts[i].tokenId
      );
      // console.log(tokenData);
      var tokenaddr = `https://blockscan.com/address/${tokenData.contract.address}`;
      nftArray[i] = (
        <div className="h-100 text-center" key={tokenData.tokenId}>
          <div className="crd bg-blurr">
            <a href={tokenData.media[0].gateway} target="_blank" rel="noreferrer">
              <img
                src={tokenData.media[0].thumbnail}
                className="h-2 mt-3 b-rounded"
                alt={tokenData.media[0].gateway}
              />
            </a>
            <div className="card-body my-2">
              <h5 className="card-title">{tokenData.title}</h5>
              <p className="card-text p-1">{tokenData.description}</p>
            </div>
            <ul className="mx-auto p-0">
              <li className="list-group-item">
                {tokenData.rawMetadata.external_link ? (
                  <a className='tca' href={tokenData.rawMetadata.external_link} target="_blank" rel="noreferrer">
                    External Link
                  </a>
                ) : (
                  ""
                )}
              </li>
              <hr />

              <li className="list-group-item">
                Token Type{" "}
                <span className="badge bg-light">{tokenData.tokenType}</span>
              </li>
              {tokenData.rawMetadata.traits?.map((e, i) => {
                return (
                  <li className="list-group-item" key={i}>
                    {" "}
                    {e.trait_type} &nbsp;{" "}
                    <span className="badge bg-light">{e.value}</span>{" "}
                  </li>
                );
              })}
              <li className="list-group-item">
                <a href={tokenaddr} target="_blank" rel="noreferrer" className='tca'>{tokenData.contract.name}</a>
              </li>
              <li className="list-group-item">
                Block No {" "} <span className="badge bg-light">{tokenData.contract.deployedBlockNumber}</span>
              </li>
            </ul>
            <div className="card-footer text-muted mb-2">
              <small>
                Updated Time:{" "}
                {new Date(Date.parse(tokenData.timeLastUpdated)).toDateString()}
              </small>
            </div>
          </div>
        </div>
      );
    }

    setnftdata(nftArray);
    setloader();
  }

  return (
    <>
      <div className="container mt-4 middle">
        <h3 className="justify-content-center text-center fs-2">NFT Indexer</h3>
        <div
          className="border border-white rounded p-4 form indexer-form"

        >
          <span className="m-1 d-flex">On {currentChain} 🗼</span>
          <hr />
          <div className="form-group">
            <label htmlFor="walletAddress" className="form-label">
              Ethereum Wallet Address
            </label>
            <input
              type="text"
              pattern="^0x[a-fA-F0-9]{40}$"
              className="form-control"
              id="walletAddress"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              aria-describedby="emailHelp"
              placeholder="Enter wallet address"
            />
            <small id="emailHelp" className="form-text text-muted">
              Enter address for which you want to check NFTs
            </small>
          </div>
          <div className="d-flex justify-content-around">
            <button
              type="submit"
              id="transfer"
              onClick={getTokenBalance}
              className="btn btn-warning mt-4"
            >
              Check Your NFTs
            </button>
          </div>
        </div>
      </div>
      {loader}
      <div className="d-flex justify-content-center pt-3">{nftnftcount}</div>
      <div className="row mx-auto container row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-sm-2 mb-5">
        {nftdata}
      </div>
    </>
  );
}
