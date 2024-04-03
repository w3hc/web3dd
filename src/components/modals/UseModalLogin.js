import { useState } from "react";

const UseModalLogin = () => {
	const [isLoginShowing, setIsLoginShowing] = useState(true);

	function toggleLogin() {
		setIsLoginShowing(!isLoginShowing);
	}

	return {
		isLoginShowing, toggleLogin
	};
};

export default UseModalLogin;