import "./NavBar.css";
import { setChain } from "../../configuration/settings";
import { useEffect, useState } from "react";
import $ from "jquery";
import { setAccount } from "../../configuration/settings";
import { truncAddr } from "../../configuration/misc";

const NavBar = (props) => {

  const [connectEmoji, setconnectEmoji] = useState("🔌 Connect");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        setAccount(res[0]);
        setconnectEmoji(truncAddr(res[0]));
        console.log(res);
      });
    } else {
      alert("install metamask extension!!");
    }

    $("#chainSelection").val(localStorage.getItem("globalChain"))

  }, []);

  function changeChain(e){
    console.log(e.target.value)
    setChain(e.target.value);
  }

  return (
    <div className="m-1" style={{ backgroundColor: "none" }}>
      <nav className="p-2 navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            📢 NFTHub
          </a>
          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav mx-auto">
              {/* <li className="nav-item">
                  <a className="nav-link active" href="#link">🦸🏼‍♂️ About Us
                    <span className="visually-hidden">(current)</span>
                  </a>
                </li> */}
              <li className="nav-item">
                <a className="nav-link" href="/">
                  🚀 Quick Start
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/nft/mint">
                  🎨 Mint NFT
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/nft/marketplace">
                  🖼️ NFT Marketplace
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#link"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  More 🤟🏼
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/swap">
                    🚀 Swap
                  </a>
                  <a className="dropdown-item" href="/transfers">
                    💸 Transfers
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/wallet">
                    👛 Wallet
                  </a>
                  <a className="dropdown-item" href="/explorer">
                    🪐 Block Explorer
                  </a>
                  <a className="dropdown-item" href="/erc20indexer">
                    📇 Erc20 Token Indexer
                  </a>
                  <a className="dropdown-item" href="/nftindexer">
                    🖼 NFT Indexer
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <select className="form-select me-sm-2" id="chainSelection" onChange={changeChain}>
                <option value="MATIC_MUMBAI">MATIC_MUMBAI</option>
                <option value="MATIC_MAINNET">MATIC_MAINNET</option>
                <option value="ETH_GOERLI">ETH_GOERLI</option>
                <option value="ETH_MAINNET">ETH_MAINNET</option>
              </select>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link connectEmoji" href="/user">
                {connectEmoji}
              </a>
            </li>
          </ul>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor03"
            aria-controls="navbarColor03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
