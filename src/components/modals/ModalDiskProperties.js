import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
//import '../assets/css/modalLoader.css';

const ModalDiskProperties = ({ isDiskPropertiesShowing,
								hideDiskProperties,
								addressDiskProperties,
								ownerDiskProperties,
								versionDiskProperties,
								immutableDiskProperties,
								blocSizeDiskProperties,
								networkName }) =>
isDiskPropertiesShowing
	? ReactDOM.createPortal(
		<>
		  <div className="modal_overlay">
			<div className="modal_wrapper">
			  <div className="modal_info">
				<div className="modal_header modal_title_new_folder">
				  <div className="modal_title">Disk Properties</div>
				</div>
				<div className="modal_body" style={{display: "flex"}}>
					<div className="modal_text_left">
						<div className="modal_text">Network:</div>
						<div className="modal_text">Disk:</div>
						<div className="modal_text">Owner:</div>
						<div className="modal_text">Version:</div>
						<div className="modal_text">Immutable:</div>
						<div className="modal_text">Max bloc size:</div>
					</div>
					<div className="modal_text_right" style={{paddingLeft: "10px"}}>
						<div className="modal_text">{networkName}</div>
						<div className="modal_text">{addressDiskProperties}</div>
						<div className="modal_text">{ownerDiskProperties}</div>
						<div className="modal_text">{versionDiskProperties}</div>
						<div className="modal_text">{immutableDiskProperties}</div>
						<div className="modal_text">{blocSizeDiskProperties} bytes</div>
					</div>
				</div>
				<div className="modal_div_button"><button className="App-button" onClick={hideDiskProperties}>Close</button></div>
			  </div>
			</div>
		  </div>
		</>,
		document.body
	  )
	: null;

	ModalDiskProperties.propTypes = {
	isDiskPropertiesShowing: PropTypes.bool.isRequired,
	hideDiskProperties: PropTypes.func.isRequired,
	addressDiskProperties: PropTypes.string.isRequired,
	ownerDiskProperties: PropTypes.string.isRequired,
	versionDiskProperties: PropTypes.string.isRequired,
	immutableDiskProperties: PropTypes.string.isRequired
};

export default ModalDiskProperties;
