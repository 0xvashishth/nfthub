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

        <Link to={newTo} className="m-auto col-sm-5 col-lg-4 col-md-5 col-xl-3" style={{textDecoration:"none"}}>
        <div className="nft">
        <div className='main'>
          <img className='tokenImage card-img-top' src={data.data.image} alt="NFT" />
          <h4 className="mt-1 text-light">{data.data.name}</h4>
          <div className="col-10 text-secondary text-truncate">
            {data.data.description}
          </div>
          <div className='tokenInfo'>
            <div className="price">
              <p>{data.data.price} ETH</p>
            </div>
          </div>
          <hr />
          {/* <div className='creator'>
            <div className='wrapper'>
              <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" alt="Creator" />
            </div>
            <p><ins>Creation of</ins> Kiberbash</p>
          </div> */}
        </div>
      </div>
        </Link>
        </>
    )
}

export default NFTTile;
