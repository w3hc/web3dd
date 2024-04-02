import { ethers } from 'ethers';
import diskRegistryAbi from '../assets/abi/DiskRegistry.json';

/*
Usage:

import diskRegistry from "../class/diskRegistryClass";

with wagmi
----------
const { data: signer } = useSigner()
const diskRegistryClass = new diskRegistry(<registry_address>, signer);

with ethers
-----------
const _provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = _provider.getSigner();
diskRegistryClass = new diskRegistry(<registry_address>, signer);
*/

class DiskRegistryClass {
	_registryContractAddress = "";
	_signer = null;

	constructor(contractAddress, signer) {
		this._registryContractAddress = contractAddress;
		this._signer = signer;
	}

	/// @notice create disk and add it to registry.
	async diskCreate() {
		if (this._signer === null) {
			console.error('[diskCreate] Invalid signer');
			return null;
		}

		try {
			const contract = new ethers.Contract(this._registryContractAddress, diskRegistryAbi, this._signer);
			const transaction = await contract.diskCreate();
			return transaction;
		}
		catch(error) {
			if (error.code === 4001 || error.code === "ACTION_REJECTED") {
				console.log("Transaction denied by user");
				return null;
			}
			console.error('[diskCreate] error: ', error);
		}
		return null;
	}

	/// @notice get contract disk address for this owner
	async getDisk(connectedUserAddress) {
		if (this._registryContractAddress === "") {
			console.error('[getDisk] Invalid Contract Address');
			return null;
		}
		if (this._signer === null) {
			console.error('[getDisk] Invalid signer');
			return null;
		}
		try {
			const contract = new ethers.Contract(this._registryContractAddress, diskRegistryAbi, this._signer);
			const result = await contract.getDisk(connectedUserAddress);
			return result;
		}
		catch(error) {
			console.error('[getDisk] error: ', error);
		}
		return null;
	}

	/// @notice check if owner have disk
	async diskExist(connectedUserAddress) {
		if (this._registryContractAddress === "") {
			console.error('[diskExist] Invalid Contract Address');
			return null;
		}
		if (this._signer === null) {
			console.error('[diskExist] Invalid signer');
			return null;
		}
		try {
			const contract = new ethers.Contract(this._registryContractAddress, diskRegistryAbi, this._signer);
			const result = await contract.diskExist(connectedUserAddress);
			return result;
		}
		catch(error) {
			console.error('[diskExist] error: ', error);
		}
		return null;
	}
}

export default DiskRegistryClass;
