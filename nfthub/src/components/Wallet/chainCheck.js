export const tokenConfig = {
  prt: {
    config: {
      chainId: "0x13881",
      chainName: "Matic Mumbai Testnet",
      nativeCurrency: {
        name: "Matic Mumbai",
        symbol: "MATIC", // 2-6 characters long
        decimals: 18,
      },
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
    },
  },
  mmatic: {
    config: {
        chainId: "0x89",
        chainName: "Polygon Mainnet",
        nativeCurrency: {
          name: "Polygon Mainnet",
          symbol: "MATIC", // 2-6 characters long
          decimals: 18,
        },
        blockExplorerUrls: ["https://polygonscan.com/"],
        rpcUrls: ["https://polygon-mainnet.infura.io"],
      },
  },
  geth: {
    config: {
        chainId: "0x5",
        chainName: "Goerli test network",
        nativeCurrency: {
          name: "Goerli test network",
          symbol: "GoerliETH", // 2-6 characters long
          decimals: 18,
        },
        blockExplorerUrls: ["https://goerli.etherscan.io/"],
        rpcUrls: ["https://goerli.infura.io/v3/"],
      },
  },
  meth: {
    config: {
      chainId: "0x1",
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "Ethereum Mainnet",
        symbol: "ETH", // 2-6 characters long
        decimals: 18,
      },
      blockExplorerUrls: ["https://etherscan.io/"],
      rpcUrls: ["https://mainnet.infura.io/v3/"],
    },
  }
};

export async function chainCheck(e) {
  if (window.ethereum) {
    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: tokenConfig[e].config.chainId }], // chainId must be in hexadecimal numbers
      });
      return true;
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              tokenConfig[e].config
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
        return true;
      }
      return false;
    }
  } else {
    return false;
  }
}
