// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require('dotenv').config();

async function main() {
  // const [deployer] = await hre.ethers.getSigners();
  // console.log("Deploying contracts with the account: ", deployer.address);
  // const weiAmount = (await deployer.getBalance()).toString();

  // console.log("Account Balance: ", (await ethers.utils.formatEther(weiAmount)));

  // const Token = await ethers.getContractFactory("Pirate");
  // const token = await Token.deploy();

  // console.log("Token address:", token.address);

  const url = process.env.MATIC_URL;
  let artifacts = await hre.artifacts.readArtifact("PirateToken");
  const provider = new ethers.providers.JsonRpcProvider(url);
  let privateKey = process.env.OWNER_PRIVATE_KEY;
  let wallet = new ethers.Wallet(privateKey, provider);
  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
  let faucet = await factory.deploy();
  console.log("Contract Address: ", faucet.address);
  await faucet.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//  New Token Address
