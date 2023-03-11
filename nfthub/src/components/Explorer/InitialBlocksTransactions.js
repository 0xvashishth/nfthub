import './explorer.css'
import React from 'react';
import { useEffect, useState } from 'react';
import {alchemyMumbai as alchemy} from "../../configuration/settings";
import $ from 'jquery';

function InitialBlocksTransactions() {

  const loader = <img alt="loaderimg" src="https://user-images.githubusercontent.com/89864614/213781640-e7232dcc-6ff3-45f8-8c5e-e6f8181fb770.gif" width="20px" />

  // const [chain, setChain] = useState("main");
  const [blockNumber, setBlockNumber] = useState(loader);
  // const selectChain = (event) => {
  //   console.log(event.target.value);
  //   setChain(event.target.value);
  // }

  const [latestBlocks, setLatestBlocks] = useState(loader);
  const [latestTransactions, setLatestTransactions] = useState(loader);
  const [btnLoader, setbtnLoader] = useState();
//   const [blockInfo, setBlockInfo] = useState({
//     hash: loader,
//     timestamp: loader,
//     nonce: loader,
//     transactions: [],
//   });

  var block_details = [];
  var transaction_details = [];

  async function getBlockNumber() {
    setbtnLoader(loader);
    setBlockNumber(await alchemy.core.getBlockNumber().then(async function(result) {
      setLatestBlocks(await getBlockInformation(result));
      setLatestTransactions(await getBlockTrancations(result));
      setbtnLoader();
      return result;
    }));
  }
  const hexToDecimal = hex => parseInt(hex, 16);

  async function getBlockTrancations(blockNumber){
    await alchemy.core.getBlockWithTransactions(blockNumber).then(function(result) {
        var transactions = result.transactions;
        console.log("Transaction Info:", transactions);
        var timestamp = result.timestamp * 1000;
        var time = new Date(timestamp).toLocaleTimeString();
        for(var i=0;i<5;i++){
            // gas 
            var strgas = transactions[i].gasPrice._hex;
            strgas = strgas.slice(2);
            strgas = hexToDecimal(strgas);
            // tx
            var txValue = transactions[i].value._hex;
            txValue = txValue.slice(2);
            txValue = hexToDecimal(txValue);

            transaction_details[i] = <tr className="table-active">
            <td>
              <p>
                Hash <a href="#link">{(result.hash).slice(0,8)}</a>
                <br />
                <small className="form-text text-muted">{time}</small>
              </p>
            </td>
            <td>
                <small><a href="#link">From: {transactions[i].from}</a></small>
                <br />
                <small><a href="#link">To: {transactions[i].to}</a></small>
                <br/>
                <small className="form-text text-muted">Transaction value: {txValue/1000000000} Gwei</small>
            </td>
          </tr>
        }
    })
    return transaction_details;
  }

  async function getBlockInformation(blocknumber) {
    for (var i = 0; i < 5; i++) {
      await alchemy.core.getBlock(blocknumber - i).then(function(result) {
        var timestamp = result.timestamp * 1000;
        var time = new Date(timestamp).toLocaleTimeString();
        var strgas = result.gasUsed._hex;
        strgas = strgas.slice(2);
        strgas = hexToDecimal(strgas);
        // console.log(str);
        // console.log("From web3", web3.getBlockInformation(result.number));
        // console.log(new Date(timestamp).toLocaleTimeString());
        var blockLink = "/explorer/block?bk=" + result.number
        block_details[i] = <tr className="table-active">
          <td>
            <p>
              Block <a href={blockLink}>{result.number}</a>
              <br />
              <small className="form-text text-muted">{time}</small>
            </p>
          </td>
          <td>
              <small><a href="#link">{result.miner}</a></small>
              <br />
              <small className="form-text text-muted">Gas Used 🔥: {strgas/1000000000} Gwei</small>
              <br />
              <small className="form-text text-muted">Total Transactions: {result.transactions.length}</small>
          </td>
        </tr>
        // setBlockInfo(result);
        // console.log(result);
      });
    }
    return block_details;
  }

  useEffect(() => {

    // async function getReceipt() {
    //   console.log(await alchemy.core.getTransactionReceipt("0x59c8670cc56269929c660bfebc39ceaba069a4e932fe89efa7c9b89c0f353518"));
    // }
    getBlockNumber();
    // getBlockInformation();
    // getLatestBlocks();
    // getReceipt();

  }, []);

  const ViewBlock = (event) => {
    const addr = "/explorer/block?bk=" + $("#hashInput").val();
    window.location.replace(addr);
  }


  return (
    <div className=''>
      <div className='row container mt-4'>
        <div className='m-1'>
          On Mumbai Matic 🗼
        </div>
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
      <div className="mt-4">
        <div className='row m-2'>
          <div className='col-sm-3'>
            Latest Block Number: {blockNumber}
          </div>
          <div className="col-sm-2">
            <button className="btn btn-outline-info" onClick={getBlockNumber}>Refresh</button> &nbsp; &nbsp; {btnLoader}
          </div>
        </div>
        <div className="row m-3">
          <div className="col-md-6 border border-light rounded">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Latest Blocks</th>
                  <th scope="col">Fee Recipient</th>
                </tr>
              </thead>
              <tbody>
                {latestBlocks}
              </tbody>
            </table>
          </div>
          <div className="col-md-6 border border-light rounded">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Latest-Transactions</th>
                  <th scope="col">To - From</th>
                </tr>
              </thead>
              <tbody>
                {latestTransactions}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialBlocksTransactions;