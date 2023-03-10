import { Network, Alchemy } from 'alchemy-sdk';
// require('dotenv').config()

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);
export default alchemy;