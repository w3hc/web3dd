// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

/// @title contract for registry to create Disk on Blockchain
/// @author Olivier Fernandez
/// @notice registry for Disk

import "./Ownable.sol";

contract DiskRegistry is Ownable {

	string public version = "1.0";
	uint public diskCounter = 0;
	address public diskContractAddress = address(0);

	// Mapping owner address to disk address
	mapping(address => address) public listDisk;

	// List disk address
	address[] diskList;

	event CreateDisk(address owner, address disk);

	constructor() {
	}

	/// @notice create disk and add it to registry.
	function diskCreate() public {
		require(!diskExist(msg.sender), "You already have a disk");
		require(diskContractAddress != address(0), "No disk contract address");
		address diskAddress = _clone(); //_deploy(); //deployBytecode();
		(bool success, /*bytes memory data*/) = diskAddress.call(abi.encodeWithSignature("init(address)", msg.sender));
		require(success, "Disk initialisation failed");
		listDisk[msg.sender] = diskAddress;
		diskCounter++;
		diskList.push(diskAddress);
		emit CreateDisk(msg.sender, diskAddress);
	}

	/// @notice check if owner have disk.
	/// @param _owner user address
	/// @return true if owner have disk
	function diskExist(address _owner) public view returns (bool) {
		return listDisk[_owner] != address(0);
	}

	/// @notice Returns the address of disk for this owner.
	/// @param _owner user address
	/// @return address of disk contract or address(0) if owner do not have disk
	function getDisk(address _owner) public view returns (address) {
		return listDisk[_owner];
	}

	/// @notice Returns the address of disk for this owner.
	/// @return list address of disk contract
	function exportDiskList() public view returns (address[] memory) {
		return diskList;
	}

	/// @notice Import disk address for this owner.
	/// @param _owner user address
	/// @param _diskContractAddress the address of the contract disk
	function importDisk(address _owner, address _diskContractAddress) public onlyOwner {
		require(!diskExist(_owner), "You already have a disk");
		require(_diskContractAddress != address(0), "No disk contract address");
		listDisk[_owner] = _diskContractAddress;
		diskCounter++;
		diskList.push(_diskContractAddress);
	}

	/// @notice Transfert disk ownership.
	/// @param _owner owner address
	/// @param _newOwner new owner address
	function changeDiskOwnership(address _owner, address _newOwner) public {
		require(diskExist(_owner), "Owner dont have a disk");
		require(!diskExist(_newOwner), "New owner already have a disk");
		listDisk[_newOwner] = listDisk[_owner];
		listDisk[_owner] = address(0);
	}

	/// @notice save the contract address disk for deploy.
	/// @param _diskContractAddress the address of the contract disk
	function setDiskContractAddress(address _diskContractAddress) public onlyOwner {
		diskContractAddress = _diskContractAddress;
	}

	/// @notice deploy the bytecode of disk.
	function _clone() internal returns (address pointer) {
		address _diskContractAddress = diskContractAddress;
		assembly{
			mstore(0x0, or (0x5880730000000000000000000000000000000000000000803b80938091923cF3 ,mul(_diskContractAddress,0x1000000000000000000)))
			pointer := create(0,0, 32)
		}
		require(pointer != address(0), "Failed on deploy");
	}
}
