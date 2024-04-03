import { useState } from "react";

const UseModalCreate = () => {
	const [isCreateShowing, setIsCreateShowing] = useState(false);

	function toggleCreate() {
		setIsCreateShowing(!isCreateShowing);
	}

	return {
		isCreateShowing, toggleCreate
	};
};

export default UseModalCreate;