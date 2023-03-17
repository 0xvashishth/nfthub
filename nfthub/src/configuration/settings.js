import { Network, Alchemy } from "alchemy-sdk";
import { createGlobalState } from "react-hooks-global-state";


const settingsMumbai = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY_MATIC_MUMBAI,
  network: Network.MATIC_MUMBAI,
};
const alchemyMumbai = new Alchemy(settingsMumbai);

const settingsMatic = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY_MATIC_MAINNET,
  network: Network.MATIC_MAINNET,
};
const alchemyMatic = new Alchemy(settingsMatic);

const settingsGoerli = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY_ETH_GOERLI,
  network: Network.ETH_GOERLI,
};
const alchemyGoerli = new Alchemy(settingsGoerli);

const settingsEthMainnet = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY_ETH_MAINNET,
  network: Network.ETH_MAINNET,
};
const alchemyEthMainnet = new Alchemy(settingsEthMainnet);

const { setGlobalState, useGlobalState } = createGlobalState({
  globalChain: "",
  currentAccountAddress: "",
  globalAlchemyInstance: setAlchemyConfiguration(),
});


function setAlchemyConfiguration() {
  var chain = localStorage.getItem("globalChain");
  console.log("Inside Chain", chain)
  var settings = {};
  switch (chain) {
    case "ETH_MAINNET":
      settings.apiKey = process.env.REACT_APP_ALCHEMY_API_KEY_ETH_MAINNET;
      settings.network = Network.ETH_MAINNET;
      break;
    case "ETH_GOERLI":
      settings.apiKey = process.env.REACT_APP_ALCHEMY_API_KEY_ETH_GOERLI;
      settings.network = Network.ETH_GOERLI;
      break;
    case "MATIC_MAINNET":
      settings.apiKey = process.env.REACT_APP_ALCHEMY_API_KEY_MATIC_MAINNET;
      settings.network = Network.MATIC_MAINNET;
      break;
    case "MATIC_MUMBAI":
      settings.apiKey = process.env.REACT_APP_ALCHEMY_API_KEY_MATIC_MUMBAI;
      settings.network = Network.MATIC_MUMBAI;
      break;
    default:
      settings.apiKey = process.env.REACT_APP_ALCHEMY_API_KEY_MATIC_MUMBAI;
      settings.network = Network.MATIC_MUMBAI;
  }
  const alchemyMain = new Alchemy(settings);
  return alchemyMain;
}

export const setChain = (s) => {
  setGlobalState("globalChain", s);
  localStorage.setItem("globalChain", s);
  var alchemyObj = setAlchemyConfiguration();
  setGlobalState("globalAlchemyInstance", alchemyObj)
};

export const setAccount = (s) => {
  setGlobalState("currentAccountAddress", s);
  localStorage.setItem("currentAccountAddress", s);
};

export { useGlobalState };

export {
  alchemyMumbai,
  alchemyMatic,
  alchemyGoerli,
  alchemyEthMainnet,
};
