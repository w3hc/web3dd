import { useState } from "react";

const UseModalInfo = () => {
	const [isInfoShowing, setIsInfoShowing] = useState(false);
	const [titleInfo, setTitle] = useState("");
	const [textInfo, setText] = useState("");
	const [levelInfo, setLevelInfo] = useState("INFO");

	function toggleInfo() {
		setIsInfoShowing(!isInfoShowing);
	}

	function changeInfoTitle(newTitle) {
		setTitle(newTitle);
	}

	function changeInfoText(newText) {
		setText(newText);
	}

	function changeInfoLevel(newLevel) {
		setLevelInfo(newLevel);
	}

	return {
		isInfoShowing, levelInfo, titleInfo, textInfo,
		toggleInfo, changeInfoTitle, changeInfoText, changeInfoLevel
	};
};

export default UseModalInfo;