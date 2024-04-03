import { useState } from "react";

const UseModalLoader = () => {
  const [isLoaderShowing, setIsLoaderShowing] = useState(false);
	const [textLoader, setTextLoader] = useState("");

  function toggleLoader() {
    setIsLoaderShowing(!isLoaderShowing);
  }

	function changeTextLoader(newText) {
		setTextLoader(newText);
	}

  return {
    isLoaderShowing, textLoader, toggleLoader, changeTextLoader
  };
};

export default UseModalLoader;