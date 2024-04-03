import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import LoginButton from "./loginButton";
import loader from '../../assets/ico/login48.png';

const ModalLogin = ({ isLoginShowing }) =>
isLoginShowing
	? ReactDOM.createPortal(
		<>
		  <div className="modal_overlay">
			<div className="modal_wrapper">
			  <div className="modal_info">
				<div className="modal_header modal_levelSUCCESS">
				  <div className="modal_title">
					<img src={loader} alt="login" className="modal_title_img"></img>
				  	<span style={{marginLeft: "5px"}}>Login</span>
				  </div>
				</div>
				<div className="modal_body" style={{textAlign: "center"}}>
					<p>Welcome to Web3dd on Sepolia testnet</p>
					<p>Login to use your disk or create one</p>
					<div className="modal_div_button">
						<LoginButton />
					</div>
				</div>
			  </div>
			</div>
		  </div>
		</>,
		document.body
	  )
	: null;

	ModalLogin.propTypes = {
	isLoginShowing: PropTypes.bool.isRequired,
	hideLogin: PropTypes.func.isRequired
};

export default ModalLogin;
