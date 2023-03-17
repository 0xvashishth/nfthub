import { useState } from 'react';
import { providers, ethers } from 'ethers';
// import detectEthereumProvider from '@metamask/detect-provider';
import { darkTheme, SwapWidget } from '@uniswap/widgets';
import { useGlobalState } from "../../configuration/settings";
// const infuraRpc = process.env.REACT_APP_INFURA_ID;
const jsonRpcEndpoint = process.env.REACT_APP_INFURA_RPC;
const jsonRpcProvider = new providers.JsonRpcProvider(jsonRpcEndpoint);
const provider = new ethers.providers.Web3Provider(jsonRpcProvider);


function Uniswap() {
  const [currentAccountAddress] = useGlobalState("currentAccountAddress");
  const [account, setAccount] = useState({
    address: currentAccountAddress,
    provider: provider,
  })

  // async function connectWallet() {
  //   const ethereumProvider = await detectEthereumProvider();

  //   if (ethereumProvider) {
  //     const accounts = await window.ethereum.request({
  //       method: 'eth_requestAccounts',
  //     })

  //     const address = accounts[0];
  //     setAccount({
  //       address: address,
  //       provider: ethereumProvider
  //     })
  //   }
  // }

  return (
    <div className="container middle justify-content-center pt-5">
      <div className="Uniswap border border-light rounded">
        <SwapWidget
          theme={darkTheme}
          width="100%"
          provider={account.provider}
          JsonRpcEndpoint={jsonRpcEndpoint} />
      </div>
    </div>
  );
}

export default Uniswap;