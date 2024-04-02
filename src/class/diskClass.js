import { ethers } from 'ethers';
import { sleep } from '../components/Tools';
import diskAbi from '../assets/abi/Disk.json';

/*
Usage:

import disk from "../class/diskClass";

with wagmi
----------
const { data: signer } = useSigner()
const diskClass = new disk(<user_disk_address>, signer, signer.provider);

with ethers
-----------
const _provider = new ethers.providers.JsonRpcProvider(URL);
or const _provider = new ethers.providers.Web3Provider(window.ethereum);
const diskClass = new disk(<user_disk_address>, _provider.getSigner(), _provider);

For read only, you can create a random account:
const pKey = new ethers.Wallet.createRandom();
const signer = new ethers.Wallet(pKey, _provider);
const diskClass = new disk(<user_disk_address>, signer, _provider);
*/

class diskClass {
	_diskContractAddress = "";
	_transactionConfirmation = false;
	_provider = null;
	_signer = null;

	constructor(contractAddress, signer, provider) {
		this._diskContractAddress = contractAddress;
		this._provider = provider;
		this._signer = signer;
	}

	checkVar() {
		if (this._diskContractAddress === "") {
			console.error('[checkVar] Invalid Contract Address');
			return false;
		}
		if (this._signer === null) {
			console.error('[checkVar] Invalid signer');
			return false;
		}
		return true;
	}

	/// @notice get disk contract owner.
	async getOwner() {
		if (!this.checkVar()) return null;
		try {
			const contract = new ethers.Contract(this._diskContractAddress, diskAbi, this._signer);
			const result = await contract.owner();
			return result;
		}
		catch(error) {
			console.error('[getOwner] error: ', error);
		}
		return null;
	}

	/// @notice get disk contract version.
	async getVersion() {
		if (!this.checkVar()) return null;
		try {
			const contract = new ethers.Contract(this._diskContractAddress, diskAbi, this._signer);
			const result = await contract.version();
			return result;
		}
		catch(error) {
			console.error('[getVersion] error: ', error);
		}
		return null;
	}

	/// @notice get mutable status of disk.
	async getImmutable() {
		if (!this.checkVar()) return null;
		try {
			const contract = new ethers.Contract(this._diskContractAddress, diskAbi, this._signer);
			const result = await contract.isImmutable();
			return result;
		}
		catch(error) {
			console.error('[getImmutable] error: ', error);
		}
		return null;
	}

	/// @notice get max data size for storage on blockchain.
	async getBlocSize() {
		if (!this.checkVar()) return null;
		try {
			const contract = new ethers.Contract(this._diskContractAddress, diskAbi, this._signer);
			const result = await contract.blocSize();
			return parseInt(result);
		}
		catch(error) {
			console.error('[getBlocSize] error: ', error);
		}
		return null;
	}

	/// @notice test the existence of a directory.
	async existDir(dirName) {
		if (!this.checkVar()) return null;
		try {
			const contract = new ethers.Contract(this._diskContractAddress, diskAbi, this._signer);
			const result = await contract.existDir(dirName);
			return result;
		}
		catch(error) {
			console.error('[existDir] error: ', error);
		}
		return null;
	}

	/// @notice get the directory/file list of a directory.
	listDir(/*string memory _name*/) {}

	/// @notice get the directory/file list of a directory with data.
	async longListDir(dirName) {
		if (!this.checkVar()) return null;
		try {
			const contract = new ethers.Contract(this._diskContractAddress, diskAbi, this._signer);
			const result = await contract.longListDir(dirName);
			return result;
		}
		catch(error) {
			console.error('[longListDir] error: ', error);
		}
		return null;
	}

	/// @notice create sub-directory in directory.
	async createDir(path, name) {
		if (!this.checkVar()) return false;
		try {
			const contract = new ethers.Contract(this._diskContractAddress, diskAbi, this._signer);
			const transaction = await contract.createDir(path, name);
			console.log('waiting transaction ...');
			await this._provider.waitForTransaction(transaction.hash);
			const lastest = await this._provider.getBlock('latest');
			if(this._transactionConfirmation) await this.confirmTransaction(this._provider, lastest.number + 1, 1);
			return true;

		} catch (error) {
			if (error.code === 4001 || error.code === "ACTION_REJECTED") {
				console.log("Transaction denied by user");
				return false;
			}
			console.error('Error createDir [' + error.code + ']: ', error);
			return false;
		}
	}

	/// @notice test if file exist.
	async existFile(fileName) {
		if (!this.checkVar()) return null;
		try {
			const contract = new ethers.Contract(this._diskContractAddress, diskAbi, this._signer);
			const result = await contract.existFile(fileName);
			return result;
		}
		catch(error) {
			console.error('[existFile] error: ', error);
		}
		return null;
	}

	infoFile(/*string memory _name*/) {}

	/// @notice return the content of a file.
	async readFile(fileName) {
		if (!this.checkVar()) return null;
		try {
			const contract = new ethers.Contract(this._diskContractAddress, diskAbi, this._signer);
			const result = await contract.readFile(fileName);
			return result;
		}
		catch(error) {
			console.error('[readFile] error: ', error);
		}
		return null;
	}

	/// @notice shortcut for create a url file.
	async createFileUrl(path, name, attributs, link) {
		return await this.createFile(path, name, attributs, 1, ethers.utils.toUtf8Bytes(link));
	}

	/// @notice shortcut for create a binary file.
	async createFileBinary(path, name, attributs, data) {
		return await this.createFile(path, name, attributs, 0, new Uint8Array(data));
	}

	/// @notice create a file.
	async createFile(path, name, attributs, content_type, data) {
		if (!this.checkVar()) return false;
		try {
			const contract = new ethers.Contract(this._diskContractAddress, diskAbi, this._signer);
			const transaction = await contract.createFile(path, name, attributs, content_type, data);
			console.log('waiting transaction ...');
			await this._provider.waitForTransaction(transaction.hash);
			const lastest = await this._provider.getBlock('latest');
			if(this._transactionConfirmation) await this.confirmTransaction(this._provider, lastest.number + 1, 1);
			return true;

		} catch (error) {
			if (error.code === 4001 || error.code === "ACTION_REJECTED") {
				console.log("Transaction denied by user");
				return false;
			}
			console.error('Error createFile [' + error.code + ']: ', error);
			return false;
		}
	}

	//**** wait confirm transaction ****
	async confirmTransaction(provider, blockNumber, blocksToWait) {
		let oldNumber = blockNumber;
		try {
			for (let i = 0; i < 10; i++) {
				await sleep(2000);
				try {
					var current = await provider.getBlock('latest');
					if (current.number - blockNumber >= blocksToWait) {
						return true;
					}
					if (oldNumber !== current.number) {
						i = 0;
						oldNumber = current.number;
					}
					continue;
				}
				catch (e) {
					console.error('Error for in confirmTransaction: ', e);
					return false;
				}
			}
			console.error('Error confirmTransaction: i > max wait for block');
			return false;
		} catch (e) {
			console.error('Error confirmTransaction: ', e);
			return false;
		}
	}
}

export default diskClass;
