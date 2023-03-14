// import { React, useState } from "react";
// import { useGlobalState } from "../../configuration/settings";
import toast from "react-hot-toast";
import { tokenConfig } from "./chainCheck";


export async function transact(contract, recieverAddress, transferAmount, toastId, e) {
  try {
    let txt = await contract.transfer(recieverAddress, transferAmount, {gasLimit: 50000000});
    console.log(txt);
    var explorerUrl = tokenConfig[e].config.blockExplorerUrls[0]
    var linkHash = explorerUrl + "tx/" + txt.hash;
    console.log(linkHash)
    return toast.success(
      <a href={linkHash} target="_blank" rel="noreferrer">
        Successfully Transact
      </a>,
      {
        id: toastId,
      }
    );
  } catch (error) {
    return toast.error("Error In Transaction | Insufficient Funds", {
      id: toastId,
    });
  }
}
