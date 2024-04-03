// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

/// @title contract for Disk on Blockchain
/// @author Olivier Fernandez
/// @notice contract is deployed by Registry

import "./Ownable.sol";

contract Disk is Ownable {

	string public version;
	string public diskName;

	uint32 public blocSize; /// max data size for storage on blockchain

	bool public isImmutable; // reserved for futur use
	bool public readOnly; // reserved for futur use
	bool public encrypted; // reserved for futur use

	// struct fileInfo
	struct fileInfo {
		bool isexist;
		string name;
		uint32 content_type; // 0 = unknown, 1 = dir, 2 = binary file, 3 = url [url file, 4 = ipfs file, 5 = url website]
		uint256 creation_date;
		string attributs; // user define attributs in json format
		string[] content_list; // directory content list
		bytes data; // file content
	}

	// struct for longListDir
	struct longListInfo {
		string name;
		uint32 content_type; // 0 = unknown, 1 = dir, 2 = binary, 3 = url
		uint256 creation_date;
		string attributs;
	}

	//mapping of kekkac256("<path/file_name>") to struct fileInfo
	mapping(bytes32 => fileInfo) public listDisk;

	bytes32 public root; // = keccak256(abi.encodePacked("/"));

	event CreateDir(string path, string name);
	event CreateFile(string pathName);

	// check path existance
	modifier isPathExist(string memory _path) {
		require(_existDir(_path), "Directory not exist !");
		_;
	}

	// check file existance
	modifier isFileExist(string memory _name) {
		require(_existFile(_name), "File not exist !");
		_;
	}

	// check name
	modifier isValidName(string memory _name) {
		require(bytes(_name).length != 0, "Name can not be empty");
		require(!_containsRoot(_name), "Name can not contain '/'");
		_;
	}

	constructor() {
		init(_msgSender());
	}

	/**** Globales functions ****/
	/// @notice initialise disk
	/// @param origin disk owner address
	function init(address origin) public {
		if (bytes(version).length != 0) return; // init only once
		version = "1.0";
		diskName = "";
		isImmutable = true;
		blocSize = 64 * 1024;
		readOnly = false;
		encrypted = false;
		_transferOwnership(origin);
		root = keccak256(abi.encodePacked("/"));
		fileInfo memory _diskInfo;
		_diskInfo.isexist = true;
		_diskInfo.name = "/";
		_diskInfo.content_type = 1;
		_diskInfo.creation_date = block.timestamp;
		listDisk[root] = _diskInfo;
	}

	/// @notice create a sub-directory
	/// @param _name new disk name
	function setdiskName(string memory _name) public onlyOwner {
		diskName = _name;
	}

	/**** internal functions ****/
	/// @notice test the presence of the character '/' in the string
	/// @param _name the string to check
	/// @return bool return true if found, false otherwise
	function _containsRoot(string memory _name) internal pure returns (bool) {
		bool result = false;
		bytes memory name = bytes(_name);
		for (uint i = 0; i < name.length; i++) {
			if (name[i] == bytes32('/')) { result = true; break; }
		}
		return result;
	}

	/// @notice test if the hash is on the base
	/// @param _hash the hash to check
	/// @return bool return true if hash exist, false otherwise
	function _existHash(bytes32 _hash) internal view returns (bool) {
		return listDisk[_hash].isexist;
	}

	/// @notice test if the directory exist
	/// @param _name the hash to check
	/// @return bool return true if directory exist, false otherwise
	function _existDir(string memory _name) internal view returns (bool) {
		if (bytes(_name).length == 0) return false;
		bytes32 dirHash = keccak256(abi.encodePacked(_name));
		return _existHash(dirHash) && listDisk[dirHash].content_type == 1;
	}

	/// @notice test if the file exist
	/// @param _name the file name
	/// @return bool return true if file exist, false otherwise
	function _existFile(string memory _name) internal view returns (bool) {
		if (bytes(_name).length == 0) return false;
		bytes32 fileHash = keccak256(abi.encodePacked(_name));
		return _existHash(fileHash) && listDisk[fileHash].content_type > 1;
	}

	/// @notice get the longListInfo of file or directory
	/// @param fileHash the hash of entry
	/// @return longListInfo return the longListInfo of file or directory
	function _getInfo(bytes32 fileHash) internal view returns (longListInfo memory) {
		longListInfo memory longListInfoEntry;
		longListInfoEntry.name = listDisk[fileHash].name;
		longListInfoEntry.content_type = listDisk[fileHash].content_type;
		longListInfoEntry.creation_date = listDisk[fileHash].creation_date;
		longListInfoEntry.attributs = listDisk[fileHash].attributs;
		return longListInfoEntry;
	}

	/**** File and directory functions ****/
	/// @notice test if the directory exist
	/// @param _name the directory name
	/// @return bool return true if exit, false otherwise
	function exist(string memory _name) public view returns (bool) {
		return _existDir(_name) || _existFile(_name);
	}

	/**** Directory functions ****/
	/// @notice test if the directory exist
	/// @param _name the directory name
	/// @return bool return true if exit, false otherwise
	function existDir(string memory _name) public view returns (bool) {
		return _existDir(_name);
	}

	/// @notice create a sub-directory
	/// @param _path path where create the sub-directory
	/// @param _name the sub-directory name
	function createDir(string memory _path, string memory _name) isPathExist(_path) isValidName(_name) public onlyOwner {
		_createDir(_path, _name);
	}

	/// @notice get the directory list entries (folders and files)
	/// @param _name the directory to list
	/// @return string[] return the string list of entries in directory
	function listDir(string memory _name) isPathExist(_name) public view returns (string[] memory) {
		bytes32 dirHash = keccak256(abi.encodePacked(_name));
		return listDisk[dirHash].content_list;
	}

	/// @notice get the directory list entries (folders and files)
	/// @param _name the directory to list
	/// @return longListInfo[] return the longListInfo list of entries in directory
	function longListDir(string memory _name) isPathExist(_name) public view returns (longListInfo[] memory) {
		bytes32 dirHash = keccak256(abi.encodePacked(_name));
		longListInfo[] memory _longListInfo = new longListInfo[](listDisk[dirHash].content_list.length);
		bytes32 fileHash;
		string memory pathName;
		string memory filePathName;

		if (bytes(_name).length == 1) pathName = _name;
		else pathName = string.concat(_name, '/');

		// loop on content_list
		for( uint i = 0; i < listDisk[dirHash].content_list.length; i++) {
			filePathName = string.concat(pathName, listDisk[dirHash].content_list[i]);
			fileHash = keccak256(abi.encodePacked(filePathName));
			if (!_existHash(fileHash)) continue;
			_longListInfo[i] = _getInfo(fileHash);
		}
		return _longListInfo;
	}

	/// @notice create a sub-directory
	/// @param _path path where create the sub-directory
	/// @param _name the sub-directory name
	function _createDir(string memory _path, string memory _name) internal {
		string memory filePathName;

		if (bytes(_path).length == 1) filePathName = string.concat(_path, _name);
		else filePathName = string.concat(_path, string.concat('/', _name));

		require(!exist(filePathName), "[createDir] Directory already exist");
		bytes32 dirHash = keccak256(abi.encodePacked(filePathName));
		fileInfo memory _diskInfo;
		_diskInfo.isexist = true;
		_diskInfo.name = _name;
		_diskInfo.content_type = 1;
		_diskInfo.creation_date = block.timestamp;
		listDisk[dirHash] = _diskInfo;
		// add to path
		dirHash = keccak256(abi.encodePacked(_path));
		listDisk[dirHash].content_list.push(_name);
		emit CreateDir(_path, _name);
	}

	/**** File functions ****/
	/// @notice test if the file exist
	/// @param _name the file name
	/// @return bool return true if exit, false otherwise
	function existFile(string memory _name) public view returns (bool) {
		return _existFile(_name);
	}

	/// @notice get the longListInfo of file or directory
	/// @param _name the name of the file
	/// @return longListInfo return the longListInfo of file or directory
	function infoFile(string memory _name) isFileExist(_name) public view returns (longListInfo memory) {
		return _getInfo(keccak256(abi.encodePacked(_name)));
	}

	/// @notice get the content data of file
	/// @param _name the name of the file
	/// @return bytes return the content data
	function readFile(string memory _name) isFileExist(_name) public view returns (bytes memory) {
		bytes32 fileHash = keccak256(abi.encodePacked(_name));
		return listDisk[fileHash].data;
	}

	/// @notice save the content data of file
	/// @param _path the path of the file
	/// @param _name the name of the file
	/// @param _attributs attributs of the file in JSON format
	/// @param _content_type must be 0 (binary data), 1 (url string) or 2 (ipfs string)
	/// @param _data the data of the file to save
	function createFile(string calldata _path, string calldata _name, string calldata _attributs, uint32 _content_type, bytes calldata _data) isPathExist(_path) isValidName(_name) public onlyOwner {
		require(_data.length > 0, "[createFile] No data"); // add possibility to create empty file ?
		require(_data.length <= blocSize, "[createFile] Data length > max bloc size");

		string memory pathName = string.concat(_path, string.concat('/', _name));
		if (bytes(_path).length == 1) pathName = string.concat(_path, _name);
		require(!exist(pathName), "[createFile] File already exist");

		fileInfo memory _diskInfo;
		_diskInfo.isexist = true;
		_diskInfo.name = _name;
		_diskInfo.attributs = _attributs;
		_diskInfo.content_type = _content_type + 2;
		_diskInfo.creation_date = block.timestamp;
		//_diskInfo.data = _data;
		/*
		_diskInfo.data = _data; =>
		let slot := _diskInfo.data.slot
		sstore(slot, _data)
		*/
		listDisk[keccak256(abi.encodePacked(pathName))] = _diskInfo;
		listDisk[keccak256(abi.encodePacked(pathName))].data = _data;
		/*
		keccak256(abi.encodePacked(pathName)) =>
		mstore(ptr, pathName.slot)
		let slot := keccak256(ptr, 0x20)
		return(ptr, 0x20)
		*/

		// add to path
		listDisk[keccak256(abi.encodePacked(_path))].content_list.push(_name);
		emit CreateFile(pathName);
	}
}
