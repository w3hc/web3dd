# Web3 Decentralized Disk

A classic file explorer to manage your files and directories in a safe and decentralized fashion.

## Live demo

We're hosted by Fleek: 

https://disk.web3dd.net/ or https://web3dd.on-fleek.app/

## Disk access

You can access your disk in several ways:

- Web app ([view UI](https://disk.web3dd.net/))
- From an on-chain contract

## Install

```shell
npm i
```

### Install for web disk

You can install the explorer locally and use the on-chain disk. Just run it (`npm start`) , you don't need to change anything.

The file explorer default network is Sepolia Testnet.

### config/config.js

```
export const ETH_CHAINS = [sepolia];
export const NETWORK_ID_SYMBOL = "SEP";
export const REGISTRY_ADDR = '0x4Bc81D37d5EE89c4186aF81d438B0a9AF34BD5c6';
```

### Local network setup

Deploy the contracts on Ganache (read the [deploy](https://github.com/w3hc/web3dd?tab=readme-ov-file#deploy) section to learn more).

Switch to Ganache in **config/config.js**
```
export const ETH_CHAINS = [localhost];
export const NETWORK_ID_SYMBOL = "GETH";
export const REGISTRY_ADDR = '<registry_address_on_ganache>';
```

## Run

```shell
npm start
```

## Test contracts

```shell
npx hardhat test
```

## Deploy

- deploy the disk contract
- deploy the registry contract
- set the address of the disk contract in the registry (`setDiskContractAddress(<disk_address>)`)

| :warning: Don't forget to copy your registry address in the `config/config.js` file! |
| --- |


## Update contract disk code

If you want to update the disk contract, deploy the new contract disk and set this new address in the registry.

| :warning: the new code will only be active for the new disk created, the existing disks will keep the old code. |
| --- |


## Technologies use

	- solidity (0.8.25)
    - wagmi
    - connectkit
    - react-accessible-treeview


## Changelog

### v0.1.0

    Initial version


## License

MIT license


## Support

You can contact us via [discord](https://discord.com/channels/753223385948880961/1224720192488210584)
