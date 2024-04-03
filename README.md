# Web3 Decentralized Disk

A decentralized storage solution based on Blockchain and ipfs, for security, data preservation and online identification.

## Live demo
web3dd.net


## Disk access 

you can access your disc in several ways:
- with the UX on web (see live demo)
- from another contract


## Install

```shell
npm i
```

## Run

```shell
npm start
```

## Test contracts

```shell
npx hardhat test
```


### Install for web disk

You can install the explorer local and use a disk on blockchain. Just run, change nothing.
The explorer use default configuration on network filecoin Calibration testnet.
**config/config.js**
```
export const ETH_CHAINS = [filecoinCalibration];
export const NETWORK_ID_SYMBOL = "tFIL";
export const REGISTRY_ADDR = '0x57399e219E57866e8B106e6cBd8af3b36CB86420';
```

### Install for local disk

Deploy the contracts on Ganache (see deploy for more info)

Change network to Ganache in **config/config.js**
```
export const ETH_CHAINS = [localhost];
export const NETWORK_ID_SYMBOL = "GETH";
export const REGISTRY_ADDR = '<registry_address_on_ganache>';
```


## Deploy

### Filecoin Calibration Testnet

Disk: 0x0717EFFC74974f5a63C58923CE7C9f29cA914C2a
DiskRegistry: 0x57399e219E57866e8B106e6cBd8af3b36CB86420

### Manual deploy

- deploy disk contract
- deploy registry contract
- set the address of disk contract to the registry adddress with setDiskContractAddress(<disk_address>)

| :warning: Don't forget to copy your registry address in the config/config.js ! |
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
