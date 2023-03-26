import {
    // BrowserRouter as Router,
    Link,
  } from "react-router-dom";
import "./MarketPlace.css"

function NFTTile (data) {
    // console.log("dsta is coming", data)
    const newTo = {
        pathname:"/nft/"+data.data.tokenId
    }
    return (
        <>
        {/* <Link to={newTo} className="m-auto mt-4 cardNft col-4" style={{textDecoration:"none"}}>
        <div className="card back-drop" style={{width:"20rem"}}>
            <img src={data.data.image} className="card-img-top" style={{height:"15rem"}}  alt="..." />
            <div className= "card-body">
                <strong className="card-title" style={{color:"#F2AA4CFF"}}>{data.data.name}</strong>
                <p className="card-text" style={{color:"#2BAE66FF"}}>
                    {data.data.description}
                </p>
            </div>
        </div>
        </Link> */}

        <Link to={newTo} className="m-auto col-4" style={{textDecoration:"none"}}>
        <div class="nft">
        <div class='main'>
          <img class='tokenImage card-img-top' src={data.data.image} alt="NFT" />
          <h2>{data.data.name}</h2>
          <p class='description'>{data.data.description}</p>
          <div class='tokenInfo'>
            <div class="price">
              <p>{data.data.price} ETH</p>
            </div>
          </div>
          <hr />
          <div class='creator'>
            <div class='wrapper'>
              <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" alt="Creator" />
            </div>
            <p><ins>Creation of</ins> Kiberbash</p>
          </div>
        </div>
      </div>
        </Link>
        </>
    )
}

export default NFTTile;
