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
        <Link to={newTo} className="m-auto mt-4 cardNft col-4" style={{textDecoration:"none"}}>
        <div className="card" style={{background:"rgba(53, 53, 53, 0.47)",backdropFilter:'blur(175px)'}}>
            <img src={data.data.image} className="card-img-top" style={{height:"15rem"}}  alt="..." />
            <div className= "card-body">
                <strong className="card-title" style={{color:"#F2AA4CFF"}}>{data.data.name}</strong>
                <p className="card-text" style={{color:"#2BAE66FF"}}>
                    {data.data.description}
                </p>
            </div>
        </div>
        </Link>
    )
}

export default NFTTile;
