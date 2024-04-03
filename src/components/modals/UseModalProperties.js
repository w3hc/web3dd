import { useState } from "react";

const UseModalProperties = () => {
	const [isPropertiesShowing, setIsPropertiesShowing] = useState(false);
	const [pathProperties, setPathProperties] = useState("");
	const [nameProperties, setNameProperties] = useState("");
	const [typeProperties, setTypeProperties] = useState("");
	const [dateProperties, setDateProperties] = useState("");
	const [dataTextProperties, setDataTextProperties] = useState("");
	const [dataBinProperties, setDataBinProperties] = useState("");

	function toggleProperties() {
		setIsPropertiesShowing(!isPropertiesShowing);
	}

	function changePathProperties(value) {
		setPathProperties(value);
	}

	function changeNameProperties(value) {
		setNameProperties(value);
	}

	function changeTypeProperties(value) {
		setTypeProperties(value);
	}

	function changeDateProperties(value) {
		setDateProperties(value);
	}

	function changeDataTextProperties(value) {
		setDataTextProperties(value);
	}

	function changeDataBinProperties(value) {
		setDataBinProperties(value);
	}

	return {
		isPropertiesShowing, pathProperties, nameProperties, typeProperties, dateProperties, dataTextProperties, dataBinProperties,
		toggleProperties, changePathProperties, changeNameProperties, changeTypeProperties, changeDateProperties,
		changeDataTextProperties, changeDataBinProperties
	};
};

export default UseModalProperties;