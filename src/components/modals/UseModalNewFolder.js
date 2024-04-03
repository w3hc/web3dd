import { useState } from "react";

const useModalNewFolder = () => {
  const [isNewFolderShowing, setIsNewFolderShowing] = useState(false);
	const [textNewFolder, setTextNewFolder] = useState("");

  function toggleNewFolder() {
    setIsNewFolderShowing(!isNewFolderShowing);
  }

	function changeNewFolderText(newText) {
		setTextNewFolder(newText);
	}

  return {
    isNewFolderShowing, textNewFolder, toggleNewFolder, changeNewFolderText
  };
};

export default useModalNewFolder;