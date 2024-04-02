require('@nomiclabs/hardhat-ethers');
require("hardhat-gas-reporter");


module.exports = {
  solidity: "0.8.25",
  settings: {
    optimizer: {
        enabled: true,
        runs: 200,
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      gas: 2100000,
      gasPrice: 2000000000,
      blockGasLimit: 30000000,
	  allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 1337,
      url: `http://192.168.0.100:8545`,
      gas: 2100000,
      gasPrice: 2000000000,
      blockGasLimit: 6000000,
	  allowUnlimitedContractSize: true,
    }
  }
};
