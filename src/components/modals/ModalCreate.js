import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const ModalCreate = ({ isCreateShowing, validFunc }) =>
isCreateShowing
	? ReactDOM.createPortal(
		<>
		  <div className="modal_overlay">
			<div className="modal_wrapper">
			  <div className="modal_info">
				<div className="modal_header modal_levelSUCCESS">
				  <div className="modal_title">Create</div>
				</div>
				<div className="modal_body">
					<p>Create your disk or refresh to chose another user</p>
					<div className="modal_div_button"><button className="App-button" onClick={validFunc}>Create Disk</button></div>
				</div>
			  </div>
			</div>
		  </div>
		</>,
		document.body
	  )
	: null;

	ModalCreate.propTypes = {
	isCreateShowing: PropTypes.bool.isRequired,
	validFunc: PropTypes.func.isRequired
};

export default ModalCreate;
