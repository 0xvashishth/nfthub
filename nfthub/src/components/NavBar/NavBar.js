import './NavBar.css';

const NavBar = (props) => {
  return (
      <div className="m-1" style={{backgroundColor: "none"}}>
        <nav className="p-2 navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#link">NFTHub</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor03">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="#link">🦸🏼‍♂️ About Us
                    <span className="visually-hidden">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">🚀 Quick Start</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/mint">🎨 Mint NFT</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/marketplace">🖼️ NFT Marketplace</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#link" role="button" aria-haspopup="true" aria-expanded="false">More 🤟🏼</a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#link">🏦 Dex</a>
                    <a className="dropdown-item" href="#link">💸 Transfers</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#link">👛 Wallet</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
  );
}

export default NavBar;
