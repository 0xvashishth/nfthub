import "./NavBar.css";
import $ from "jquery";
import { setChain } from "../../configuration/settings";
import { useEffect, useState } from "react";
import { setAccount } from "../../configuration/settings";
import { truncAddr } from "../../configuration/misc";

const NavBar = (props) => {
  const [connectEmoji, setconnectEmoji] = useState(
    <button type="button" className="btn btn-danger btn-sm px-4">
      🔌 Connect
    </button>
  );
  const [isLoggedin, setisLoggedin] = useState(false);

  const connect = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        setAccount(res[0]);
        setconnectEmoji(truncAddr(res[0]));
        setisLoggedin(true);
        // console.log(res);
      });
    } else {
      alert("install metamask extension!!");
    }
  };

  useEffect(() => {
    connect();
    $("#chainSelection").val(localStorage.getItem("globalChain"));
  }, []);

  function changeChain(e) {
    console.log(e.target.value);
    setChain(e.target.value);
  }

  return (
    // <div className="m-1" style={{ backgroundColor: "none" }}>
    <nav className="p-2 m-1 rounded navbar navbar-expand-lg navbar-light bg-gradient ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          📢 NFTHUB
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
              <div className="dropdown-menu bg-gradient-drawer bg-light">
                <a className="dropdown-item" href="/swap">
                  🚀 Swap
                </a>
                <a className="dropdown-item" href="/ticket/create">
                  🎫 NFT Ticket
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
          <ul className="navbar-nav">
            <li className="nav-item border-1">
              <select
                className="form-select me-sm-2"
                id="chainSelection"
                onChange={changeChain}
              >
                <option value="MATIC_MUMBAI">MATIC_MUMBAI</option>
                <option value="MATIC_MAINNET">MATIC_MAINNET</option>
                <option value="ETH_GOERLI">ETH_GOERLI</option>
                <option value="ETH_MAINNET">ETH_MAINNET</option>
              </select>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              {isLoggedin ? (
                <a className="nav-link connectEmoji" href="/user">
                  {connectEmoji}
                </a>
              ) : (
                <a className="nav-link connectEmoji" onClick={connect}>
                  {connectEmoji}
                </a>
              )}
            </li>
          </ul>
        </div>

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
    // </div>
  );
};

export default NavBar;
