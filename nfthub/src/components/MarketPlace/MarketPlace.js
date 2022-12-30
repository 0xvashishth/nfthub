import React from 'react';
import './MarketPlace.css'
import $ from 'jquery';
// import character from './character.png';


const MarketPlace = (props) => {
  var cards = [];
  for(var i=0;i<15;i++){
    cards[i] = <div class="card m-auto mt-1 cardNft col-4">
  <img src="http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_2_2.png" class="card-img-top" alt="..." />
      <span class="d-flex badge badge-pill badge-primary">Soul Bound NFT</span>
  <div class="card-body">
    <h5 class="card-title">Pirate NFT</h5>
    <p class="card-text">Here is the pirate NFT Which is very pixelled and also it's very popular in the World.</p>
    <a href="#nftLink" class="btn btncheck btn-outline-primary">Check NFT</a>
  </div>
</div>
  }


  function changeBackground(){
    $(".nftTypeSelect").trigger("click");
    console.log("Hello")
  }

  
  return(
    <div className="m-2">
      <div className="pt-4">
        <h1>MARKETPLACE</h1>
      </div>
      <div class="mt-3">
          <div class="form-group">
                <select class="nftTypeSelect" id="nftType" onMouseOver={changeBackground} data-placeholder="Choose&hellip;">
                  <option value="default" defaultValue>Select NFT Type</option>
                  <option value="imagenft">Image</option>
                  <option value="videonft">Video</option>
                  <option value="gifnft">Gif</option>
                </select>
            <select class="ms-2 nftTypeSelect" id="nftVersionSelect">
                  <option value="default" defaultValue>Select NFT Version</option>
                  <option value="imagenft">Soul Bound NFT</option>
                  <option value="videonft">Simple NFT</option>
                </select>
            </div>
      </div>

      {/*Actual MarketPlace*/}

      <div className="mt-2 d-flex row">
        {cards}
      </div>
    </div>
  )
}


export default MarketPlace;