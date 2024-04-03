import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const ModalProperties = ({ isPropertiesShowing, hideProperties, pathProperties, nameProperties, typeProperties, dateProperties, dataTextProperties, dataBinProperties }) => {
	const [toggleBinary, setToggleBinary ] = React.useState(true);

	if(isPropertiesShowing) return ReactDOM.createPortal(
		<>
		  <div className="modal_overlay">
			<div className="modal_wrapper">
			  <div className="modal_info">
				<div className="modal_header modal_title_new_folder">
				  <div className="modal_title">Properties</div>
				</div>
				<div className="modal_body" style={{display: "flex"}}>
					<div className="modal_text_left">
						<div className="modal_text">Path:</div>
						<div className="modal_text">Name:</div>
						<div className="modal_text">Type:</div>
						<div className="modal_text">Date:</div>
					</div>
					<div className="modal_text_right" style={{paddingLeft: "10px"}}>
						<div className="modal_text">{pathProperties}</div>
						<div className="modal_text">{nameProperties}</div>
						<div className="modal_text">{typeProperties}</div>
						<div className="modal_text">{dateProperties}</div>
					</div>
				</div>
				{(dataBinProperties !== "" || dataTextProperties !== "") && <div>
					<button className="App-button" onClick={() => setToggleBinary(!toggleBinary)}>View data as UTF8</button>
					<div className="modal_properties_preview">
						{toggleBinary ? dataBinProperties : dataTextProperties}
					</div>
				</div>}
				<div className="modal_div_button"><button className="App-button" onClick={hideProperties}>Close</button></div>
			  </div>
			</div>
		  </div>
		</>,
		document.body
	)

	ModalProperties.propTypes = {
	isPropertiesShowing: PropTypes.bool.isRequired,
	hideProperties: PropTypes.func.isRequired,
	pathProperties: PropTypes.string.isRequired,
	nameProperties: PropTypes.string.isRequired,
	typeProperties: PropTypes.string.isRequired,
	dateProperties: PropTypes.string.isRequired
	};
}
export default ModalProperties;
