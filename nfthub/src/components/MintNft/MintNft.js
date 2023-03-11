import React from 'react';
import './MintNft.css'
// import character from './character.png';


const MintNft = (props) => {
  return(
    <div className="m-auto mt-5 mb-2 MintDiv">
      <div className="border p-2 border-white rounded">
        <div className="">
          <form>
            <fieldset>
              <legend className="p-1">Mint Your NFT</legend>
              <hr/>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">Create NFT</label>
                <input type="text" className="form-control" id="nftName" aria-describedby="nftHelp" placeholder="NFT Name" />
                <small id="nftHelp" className="form-text text-muted">Please make sure that you will not be able to edit the properties of the NFT.</small>
              </div>
              <div className="form-group">
                <label htmlFor="nftDescription" className="form-label mt-4">NFT Description</label>
                <input type="text" className="form-control" id="nftDescription" placeholder="NFT Description" />
              </div>
              <div className="form-group">
                <label htmlFor="nftType" className="form-label mt-4">NFT Type</label>
                <select className="form-select" id="nftType">
                  <option value="soul">SoulBound NFT</option>
                  <option value="simple">Simple NFT</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="nftReceiver" className="form-label mt-4">NFT Receiver</label>
                <input type="text" className="form-control" id="nftReceiver" placeholder="NFT Receiver Address" />
              </div>
              <fieldset className="form-group mt-4 mb-3">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Allow to send other user if opt for Soul Bound NFT</label>
                </div>
                <div className="form-group">
      <label htmlFor="nftFile" className="form-label mt-4">Upload NFT</label>
      <input className="form-control" type="file" id="nftFile" />
    </div>
              </fieldset>
              <button type="submit" className="btn btn-outline-primary">Submit</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}


export default MintNft;