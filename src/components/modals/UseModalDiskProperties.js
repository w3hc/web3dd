import { useState } from "react";

const UseModalDiskProperties = () => {
	const [isDiskPropertiesShowing, setIsDiskPropertiesShowing] = useState(false);
	const [addressDiskProperties, setAddressDiskProperties] = useState("");
	const [ownerDiskProperties, setText] = useState("");
	const [versionDiskProperties, setVersionDiskProperties] = useState("");
	const [immutableDiskProperties, setImmutableDiskProperties] = useState("");
	const [blocSizeDiskProperties, setBlocSizeDiskProperties] = useState(4096);

	function toggleDiskProperties() {
		setIsDiskPropertiesShowing(!isDiskPropertiesShowing);
	}

	function changeAddressDiskProperties(diskAddress) {
		setAddressDiskProperties(diskAddress);
	}

	function changeOwnerDiskProperties(newOwner) {
		setText(newOwner);
	}

	function changeVersionDiskProperties(newOwner) {
		setVersionDiskProperties(newOwner);
	}

	function changeImmutableDiskProperties(newOwner) {
		setImmutableDiskProperties(newOwner);
	}

	function changeBlocSizeDiskProperties(value) {
		setBlocSizeDiskProperties(value);
	}

	return {
		isDiskPropertiesShowing, addressDiskProperties, ownerDiskProperties, versionDiskProperties, immutableDiskProperties, blocSizeDiskProperties,
		toggleDiskProperties, changeAddressDiskProperties, changeOwnerDiskProperties, changeVersionDiskProperties, changeImmutableDiskProperties, changeBlocSizeDiskProperties
	};
};

export default UseModalDiskProperties;