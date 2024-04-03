import { useState } from "react";

const useModalUpload = () => {
  const [isUploadShowing, setIsUploadShowing] = useState(false);
	const [pathUpload, setPathUpload] = useState("");

  function toggleUpload() {
    setIsUploadShowing(!isUploadShowing);
  }

	function changeUploadPath(value) {
		setPathUpload(value);
	}

  return {
    isUploadShowing, pathUpload, toggleUpload, changeUploadPath
  };
};

export default useModalUpload;