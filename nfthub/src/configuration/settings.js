import { Network, Alchemy } from 'alchemy-sdk';
// require('dotenv').config()

const settingsMumbai = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY_MUMBAI,
    network: Network.MATIC_MUMBAI,
};
const alchemyMumbai = new Alchemy(settingsMumbai);


const settingsMatic = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY_MATIC,
    network: Network.MATIC_MAINNET,
};
const alchemyMatic = new Alchemy(settingsMatic);

const settingsGoerli = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY_GOERLI,
    network: Network.ETH_GOERLI,
};
const alchemyGoerli = new Alchemy(settingsGoerli);

const settingsEthMainnet = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY_ETH,
    network: Network.ETH_MAINNET,
};
const alchemyEthMainnet = new Alchemy(settingsEthMainnet);


export {
    alchemyMumbai,
    alchemyMatic,
    alchemyGoerli,
    alchemyEthMainnet
  }