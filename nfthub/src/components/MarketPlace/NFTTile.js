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
        <Link to={newTo} className="m-auto mt-2 cardNft col-4">
        <div className="card">
            <img src={data.data.image} className="card-img-top" alt="..." />
            <div className= "card-body">
                <strong className="card-title">{data.data.name}</strong>
                <p className="card-text">
                    {data.data.description}
                </p>
            </div>
        </div>
        </Link>
    )
}

export default NFTTile;
