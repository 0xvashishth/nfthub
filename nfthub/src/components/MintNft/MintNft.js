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
              <div class="form-group">
                <label for="exampleInputEmail1" class="form-label mt-4">Create NFT</label>
                <input type="text" class="form-control" id="nftName" aria-describedby="nftHelp" placeholder="NFT Name" />
                <small id="nftHelp" class="form-text text-muted">Please make sure that you will not be able to edit the properties of the NFT.</small>
              </div>
              <div class="form-group">
                <label for="nftDescription" class="form-label mt-4">NFT Description</label>
                <input type="text" class="form-control" id="nftDescription" placeholder="NFT Description" />
              </div>
              <div class="form-group">
                <label for="nftType" class="form-label mt-4">NFT Type</label>
                <select class="form-select" id="nftType">
                  <option value="soul">SoulBound NFT</option>
                  <option value="simple">Simple NFT</option>
                </select>
              </div>
              <div class="form-group">
                <label for="nftReceiver" class="form-label mt-4">NFT Receiver</label>
                <input type="text" class="form-control" id="nftReceiver" placeholder="NFT Receiver Address" />
              </div>
              <fieldset class="form-group mt-4 mb-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                  <label class="form-check-label" for="flexSwitchCheckDefault">Allow to send other user if opt for Soul Bound NFT</label>
                </div>
                <div class="form-group">
      <label for="nftFile" class="form-label mt-4">Upload NFT</label>
      <input class="form-control" type="file" id="nftFile" />
    </div>
              </fieldset>
              <button type="submit" class="btn btn-outline-primary">Submit</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}


export default MintNft;