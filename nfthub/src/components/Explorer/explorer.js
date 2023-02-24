import './bootstrap.css'
import './explorer.css'
import React from 'react';
import InitialBlocksTransactions from './InitialBlocksTransactions'
// import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import router from './router.js'
import {
  RouterProvider,
} from "react-router-dom";
import $ from 'jquery';

// import loaderimg from '../loader.gif';
// import ReactDOM from 'react-dom';

// const settings = {
//   apiKey: "phZ7U_FKOQH8ml_HZWFiSFi2_P1BSFIT",
//   network: Network.ETH_MAINNET,
// };

// const alchemy = new Alchemy(settings);

function Explorer() {
  // const loader = <img alt="loaderimg" src={loaderimg} width="20px" />
  const [chain, setChain] = useState("main");
  const selectChain = (event) => {
    console.log(event.target.value);
    setChain(event.target.value);
  }
  // const [blockInfo, setBlockInfo] = useState({
  //   hash: loader,
  //   timestamp: loader,
  //   nonce: loader,
  //   transactions: [],
  // });

  // let transactionList = [];

  // useEffect(() => {
  //   async function getBlockNumber() {
  //     setBlockNumber(await alchemy.core.getBlockNumber());
  //   }
  //   async function getBlockInformation() {
  //     setBlockInfo(await alchemy.core.getBlock(16447244));
  //   }
  //   async function getReceipt() {
  //     console.log(await alchemy.core.getTransactionReceipt("0x59c8670cc56269929c660bfebc39ceaba069a4e932fe89efa7c9b89c0f353518"));
  //   }
  //   getBlockNumber();
  //   getBlockInformation();
  //   getReceipt();

  // }, []);
  // blockInfo.transactions.forEach((season, index) => {
  //   transactionList.push(<li key={index}>{season}</li>);
  // });


  const ViewBlock = (event) => {
    const addr = "block?bk=" + $("#hashInput").val();
    window.location.replace(addr);
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">blockscan</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse text-right navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link active" href="/">Home
                  <span class="visually-hidden">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#link">Blockchain</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#link">Tokens</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#link">Resources</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#link" role="button" aria-haspopup="true" aria-expanded="false">More</a>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#link">NFTHub</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#link">Alchemy</a>
                </div>
              </li>
            </ul>
            <form class="d-flex">
              <select className='form-control' onChange={selectChain}>
                <option value="main" selected>ethereum mainnet</option>
                <option value="solana">solana mainnet</option>
                <option value="polygon">polygon mainnet</option>
              </select>
            </form>
          </div>
        </div>
      </nav>
      <div className='row container mt-4'>
        <div className="col-sm-2 col-4">
          <select className='form-control'>
            <option value="blockNumber">Block Number</option>
            <option value="transaction">Block Hash</option>
          </select>
        </div>
        <div className='col-sm-8 d-flex'>
          <input className="form-control" id="hashInput" placeholder='Enter Hash/Block Number' />&nbsp;&nbsp;
          <button className='btn btn-outline-light' onClick={ViewBlock}>View</button>
        </div>
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default Explorer;