import "./explorer.css";
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {alchemyMumbai} from "../../configuration/settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import $ from 'jquery';


function FindBlock() {
  const [searchParams, setSearchParams] = useSearchParams();

  const loader = (
    <img
      alt="loaderimg"
      src="https://user-images.githubusercontent.com/89864614/213781640-e7232dcc-6ff3-45f8-8c5e-e6f8181fb770.gif"
      width="20px"
    />
  );

  var bk;
  if(searchParams.get("bk").length < 12){
    bk = parseInt(searchParams.get("bk"));
  }else{
    bk = searchParams.get("bk");
  }

  const [blockNumber, setBlockNumber] = useState(
    bk
  );

  var dumpObj = {
    parentHash: loader,
    hash: loader,
    number: loader,
    miner: loader,
    timestamp: loader,
    nonce: loader,
    difficulty: loader,
    gasUsed: loader,
    transactions: loader,
  };
  const [blockInfo, setBlockInfo] = useState({
    parentHash: loader,
    hash: loader,
    number: loader,
    miner: loader,
    timestamp: loader,
    nonce: loader,
    difficulty: loader,
    gasUsed: loader,
    transactions: loader,
  });

  const hexToDecimal = (hex) => parseInt(hex, 16);

  useEffect(() => {
    async function getBlock() {
      var blockObj = dumpObj;
      console.log(blockNumber);
      await alchemyMumbai.core
        .getBlock(blockNumber, true)
        .then(function (result) {
          blockObj.parentHash = result.parentHash;
          blockObj.hash = result.hash;
          blockObj.number = result.number;
          blockObj.miner = result.miner;
          blockObj.nonce = result.nonce;
          blockObj.difficulty = result.difficulty;
          var strgas = result.gasUsed._hex;
          strgas = strgas.slice(2);
          strgas = hexToDecimal(strgas);
          blockObj.gasUsed = strgas;
          var timestamp = result.timestamp * 1000;
          var time = new Date(timestamp).toLocaleTimeString();
          blockObj.timestamp = timestamp;
          blockObj.transactions = result.transactions;
          console.log(blockObj);
          setSearchParams({ bk: blockObj.number });
          setBlockInfo(blockObj);
        })
        .catch((err) => {
          window.alert("Cannot Fetch The Block!!");
          setBlockNumber(blockNumber - 1);
        });
    }
    getBlock();
  }, [blockNumber]);

  const prevBlockCall = () => {
    setBlockInfo(dumpObj);
    setBlockNumber(parseInt(searchParams.get("bk")) - 1);
  };

  const nextBlockCall = () => {
    setBlockInfo(dumpObj);
    setBlockNumber(parseInt(searchParams.get("bk")) + 1);
  };

  const parentBlock = (event) => {
    setBlockInfo(dumpObj);
    // setBlockNumber(parseInt(searchParams.get("bk")) + 1);
    console.log(event.target.text);
    setBlockNumber(event.target.text);
  }

  const ViewBlock = (event) => {
    const addr = "/explorer/block?bk=" + $("#hashInput").val();
    window.location.replace(addr);
  }

  return (
    <div className="">
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
        <div className="row m-2">
          <div className="col-sm-3">Block Number: {blockNumber}</div>
        </div>
        <div className="row m-3">
          <div className="border border-light rounded">
            <table className="table table-hover">
              <tbody>
                <tr className="align-left">
                  <td scope="col">Block Number</td>
                  <td scope="col">
                    <a href="#PrevBlock" onClick={prevBlockCall}>
                      <FontAwesomeIcon icon={solid("angle-left")} />
                    </a>{" "}
                    &nbsp; {blockInfo.number} &nbsp;{" "}
                    <a href="#PrevBlock" onClick={nextBlockCall}>
                      <FontAwesomeIcon icon={solid("angle-right")} />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td scope="col">Block Hash</td>
                  <td scope="col">{blockInfo.hash}</td>
                </tr>
                <tr>
                  <td scope="col">Parent Hash</td>
                  <td scope="col"><a href="#parentBlock" onClick={parentBlock}>{blockInfo.parentHash}</a></td>
                </tr>
                <tr>
                  <td scope="col">Block Miner</td>
                  <td scope="col">{blockInfo.miner}</td>
                </tr>
                <tr>
                  <td scope="col">Timestamp</td>
                  <td scope="col">{blockInfo.timestamp}</td>
                </tr>
                <tr>
                  <td scope="col">Gas Used</td>
                  <td scope="col">{blockInfo.gasUsed}</td>
                </tr>
                <tr>
                  <td scope="col">Difficulty</td>
                  <td scope="col">{blockInfo.difficulty}</td>
                </tr>
                <tr>
                  <td scope="col">Block Nonce</td>
                  <td scope="col">{blockInfo.nonce}</td>
                </tr>
                <tr>
                  <td scope="col">Total Transactions</td>
                  <td scope="col">{blockInfo.transactions.length} &nbsp;&nbsp; <button className="btn btn-outline-light btn-sm">View All Transaction</button> </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindBlock;
