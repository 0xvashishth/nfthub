const hre = require("hardhat");
require('dotenv').config();
const ABI = require("./ABI.json");
const { Utils } = require("alchemy-sdk");


const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const GOERLI_URL = process.env.GOERLI_URL;
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(GOERLI_URL);
const signer = new ethers.Wallet(OWNER_PRIVATE_KEY, provider);

let artifactPirate = hre.artifacts.readArtifact("PirateToken");


// const counter = await Counter.deploy();

// contract instance
// const contractToken = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
  const contract = await new hre.ethers.Contract(CONTRACT_ADDRESS, (await artifactPirate).abi, signer);
  // const winnercontract = await ethers.getContractAt("Bucket", "0x873289a1aD6Cf024B927bd13bd183B264d274c68");
  const winnercontract = new ethers.Contract("0x873289a1aD6Cf024B927bd13bd183B264d274c68", ABI, signer);
  // console.log(contractToken.balanceOf(0x3920B74CD490a6E838F32629e8D0E528CD69dc52))
  console.log(await contract.balanceOf("0x3920B74CD490a6E838F32629e8D0E528CD69dc52"));
  const amount = Utils.parseEther("1");
  // console.log(await winnercontract.drop(CONTRACT_ADDRESS,2, {gasLimit: 5000000}))

  let approveFunc = await contract.connect(signer).approve(
    "0x873289a1aD6Cf024B927bd13bd183B264d274c68",
    amount
  );
  await approveFunc.wait();

  let dropFunc = await winnercontract.connect(signer).drop(CONTRACT_ADDRESS, amount);
  await dropFunc.wait();

  console.log(dropFunc)

  console.log("succeful");

  

  // const myContract = await hre.ethers.getContractAt('Bucket', 0x873289a1aD6Cf024B927bd13bd183B264d274c68, wallet)
  // const out = await myContract.drop(0x54545D095c874111fE30C1298Ca2aEF18c1c9Afb, 2)
  // console.log(out)
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
