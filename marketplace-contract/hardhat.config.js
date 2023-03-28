require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
    },
  }
};