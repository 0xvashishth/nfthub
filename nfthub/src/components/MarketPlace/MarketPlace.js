import React from 'react';
import './MarketPlace.css'
import $ from 'jquery';
// import character from './character.png';


const MarketPlace = (props) => {
  var cards = [];
  for(var i=0;i<15;i++){
    cards[i] = <div className="card m-auto mt-2 cardNft col-4">
  <img src="http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_2_2.png" className="card-img-top" alt="..." />
      <span className="d-flex badge badge-pill badge-primary">Soul Bound NFT</span>
  <div className="card-body">
    <h5 className="card-title">Pirate NFT</h5>
    <p className="card-text">Here is the pirate NFT Which is very pixelled and also it's very popular in the World.</p>
    <a href="#nftLink" className="btn btncheck btn-outline-primary">Check NFT</a>
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
      <div className="mt-3">
          <div className="form-group mb-2">
                <select className="nftTypeSelect" id="nftType" onMouseOver={changeBackground} data-placeholder="Choose&hellip;">
                  <option value="default" defaultValue>Select NFT Type</option>
                  <option value="imagenft">Image</option>
                  <option value="videonft">Video</option>
                  <option value="gifnft">Gif</option>
                </select>
            <select className="ms-2 nftTypeSelect" id="nftVersionSelect">
                  <option value="default" defaultValue>Select NFT Version</option>
                  <option value="imagenft">Soul Bound NFT</option>
                  <option value="videonft">Simple NFT</option>
                </select>
            </div>
      </div>

      {/*Actual MarketPlace*/}

      <div className="d-flex row">
        {cards}
      </div>
    </div>
  )
}


export default MarketPlace;