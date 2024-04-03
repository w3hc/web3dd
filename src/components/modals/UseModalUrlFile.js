import { useState } from "react";

const useModalUrlFile = () => {
  const [isUrlFileShowing, setIsUrlFileShowing] = useState(false);
	const [textUrlFile, setTextUrlFile] = useState("");

  function toggleUrlFile() {
    setIsUrlFileShowing(!isUrlFileShowing);
  }

	function changeUrlFileText(newText) {
		setTextUrlFile(newText);
	}

  return {
    isUrlFileShowing, textUrlFile, toggleUrlFile, changeUrlFileText
  };
};

export default useModalUrlFile;