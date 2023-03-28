import { useState, useEffect } from "react";
import { useGlobalState } from "../../configuration/settings";
import { trunc } from "../../configuration/misc";
import { CenterLoader as Loader } from "../Loader/LoaderDNA";

export default function NftIndexer() {
  const [currentChain] = useGlobalState("globalChain");
  const [alchemy] = useGlobalState("globalAlchemyInstance");
  const [userAddress, setUserAddress] = useState("");
  const [assetType, setAssetType] = useState("erc20");
  const [ercTransferData, setercTransferData] = useState([]);
  const [ercTransferCount, setercTransferCount] = useState("");
  const [loader, setloader] = useState("");
  const [hasQueried, setHasQueried] = useState(false);

  useEffect(() => {
    setUserAddress("");
    setercTransferData([]);
    setercTransferCount("");
    setloader("");
    setHasQueried(false)
  }, [alchemy]);

  async function getTokenBalance() {
    setercTransferCount("");
    setloader(<Loader />);
    setercTransferData("");
    setHasQueried(false)

    // new approach
    // const data = await alchemy.nft.getNftsForOwner(userAddress);
    // erc-721 token transfers
    const ercTransfers = await alchemy.core.getAssetTransfers({
      fromAddress: userAddress,
      category: [assetType],
    });

    console.log(ercTransfers.transfers);
    setercTransferCount(ercTransfers.transfers.length)
    setercTransferData(ercTransfers.transfers)
    // // console.log("see here", data);

    // const ercArray = [];
    // for (let i = 0; i < data.ownedNfts.length; i++) {
    //   // const tokenData = await alchemy.nft.getNftMetadata(
    //   //   data.ownedNfts[i].contract.address,
    //   //   data.ownedNfts[i].tokenId
    //   // );
    //   // var tokenaddr = `https://blockscan.com/address/${tokenData.contract.address}`;
    //   // ercArray[i] = (
    //   // );
    // }

    // setercTransferData(ercArray);
    setloader();
    setHasQueried(true)
  }

  return (
    <>
      <div className=" mt-4 middle">
        <h3 className="justify-content-center text-center">Transfers</h3>
        <div
          className="border border-white form rounded p-4"
          style={{ width: "40rem" }}
        >
          <div className="row">
            <div className="col-6">
              <span className="m-1 d-flex">
                On {currentChain} 🗼
              </span>
            </div>
            <div className="col-6">
              <select
                className="m-1 form-select d-flex"
                id="assetSelect"
                onChange={(e) => setAssetType(e.target.value)}
                value={assetType}
              >
                <option value="erc20">erc20</option>
                <option value="erc721">erc721</option>
                <option value="erc1155">erc1155</option>
                <option value="specialnft">specialnft</option>
              </select>
            </div>
          </div>
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
      <div className="middle">
      {hasQueried ? (
          <div className="mt-3 container">
          <table className="table caption-top table-responsive table-bordered table-hover border-primary align-middle">
            <caption>Total Transactions Of {assetType} {" : "} {ercTransferCount}</caption>
            <thead>
              <tr>
                <th scope="col">Block No</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Hash</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
            {ercTransferData.map((e, i) => {
              console.log(e)
              return (
                <tr key={i}>
                <th scope="row">{e.blockNum}</th>
                <td>{e.from}</td>
                <td>{e.to}</td>
                <td>{trunc(e.hash)}</td>
              </tr>
              );
            })}
          </tbody>
          </table>
        </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
