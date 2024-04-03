import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
//import '../assets/css/modalLoader.css';

/* Levels: INFO, DEBUG, SUCCESS, WARNING, ERROR */

const ModalInfo = ({ isInfoShowing, hideInfo, levelInfo, titleInfo, textInfo }) =>
isInfoShowing
	? ReactDOM.createPortal(
		<>
		  <div className="modal_overlay">
			<div className="modal_wrapper">
			  <div className="modal_info">
				<div className={`modal_header modal_level${levelInfo}`}>
				  <div className="modal_title">{titleInfo}</div>
				</div>
				<div className="modal_body">
					<p>{textInfo}</p>
					<div className="modal_div_button"><button className="App-button" onClick={hideInfo}>Close</button></div>
				</div>
			  </div>
			</div>
		  </div>
		</>,
		document.body
	  )
	: null;

	ModalInfo.propTypes = {
	isInfoShowing: PropTypes.bool.isRequired,
	hideInfo: PropTypes.func.isRequired,
	levelInfo: PropTypes.string.isRequired,
	titleInfo: PropTypes.string.isRequired,
	textInfo: PropTypes.string.isRequired
};

export default ModalInfo;
