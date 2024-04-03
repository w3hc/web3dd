import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import uploadIcon from '../../assets/ico/upload48.png';

import { formatSize } from '../Tools';

const ModalUpload = ({ isUploadShowing, cancelFunc, validFunc, pathUpload, maxBlocSize }) => {
	const [inputName, setInputName ] = React.useState("");
	const [fileSize, setFileSize ] = React.useState(0);
	const [filePointer, setFilePointer ] = React.useState(null);
	//const [inputLink, setInputLink ] = React.useState("");
	const [ApiKey, setApiKey ] = React.useState("");
	const [SecretApiKey, setSecretApiKey ] = React.useState("");
	//console.log('[ModalUpload] maxBlocSize: ', maxBlocSize);

	function loadKey(e) {
		const file = e.target.files[0];
		//console.log('loadKey: ', e.target.files[0]);
		setFilePointer(file);
		setInputName(file.name);
		setFileSize(file.size);
		if (file.size > maxBlocSize) {
			document.getElementById("onchain").checked = false;
			document.getElementById("onchain").disabled = true;
			document.getElementById("onipfs").checked = true;
		}
	}

	function validCallback() {
		validFunc(filePointer, pathUpload, inputName, document.getElementById('onchain').checked, ApiKey, SecretApiKey);
		setInputName("");
		setFileSize(0);
	}

	if (isUploadShowing) return ReactDOM.createPortal(
		<>
		  <div className="modal_overlay">
			<div className="modal_wrapper">
			  <div className="modal_info">
				<div className="modal_header modal_title_new_folder">
				  <div className="modal_title">
				  	<img src={uploadIcon} alt="" className="modal_title_img"></img>
				  	<span style={{marginLeft: "5px"}}>Upload File</span>
				  </div>
				</div>
				<div className="modal_body">
					<div>
						<div className="modal_text">
						<input type="file" onChange={(e) => { loadKey(e); }}/>
						</div>
						<div className="modal_text">
							<div className="modal_text_left">Path:</div>
							<div className="modal_text_right" id="UploadPath" style={{marginLeft: "5px"}}>{pathUpload}</div>
						</div>
						<div className="modal_text">
							<div className="modal_text_left">Name:</div>
							<div className="modal_text_right" style={{marginLeft: "5px"}}>
								<input className=""
                        			id="UploadName"
                        			placeholder="File name"
									value={inputName}
									onChange={(e) => { setInputName (e.target.value); }}
									style={{width: "100%"}}
								/>
							</div>
						</div>
						<div className="modal_text">
							<div className="modal_text_left">Size:</div>
							<div className="modal_text_right" style={{marginLeft: "5px"}}>{fileSize !==0 ? formatSize(fileSize): ""}</div>
						</div>
						<div className="modal_text">
							<div className="modal_text_left">Storage:</div>
						</div>
						<div className="modal_text modal_upload_storage">
							<div style={{marginBottom: "5px"}}>
								<input type="radio" id="onchain" name="storage" value="0" defaultChecked="true"/>
								<label className={(fileSize <= maxBlocSize) ? "" : "modal_upload_label_disabled"} htmlFor="onchain"> On blockchain</label>
								{/*<div className={(fileSize < maxBlocSize) ? "" : "modal_upload_div_none"}>
									<span style={{marginLeft: "30px"}}>Cost</span>
								</div>*/}
							</div>
							<div style={{marginBottom: "5px"}}>
								<input type="radio" id="onipfs" name="storage" value="1"/>
								<label htmlFor="onipfs"> On ipfs (with Pinata)</label>
								<div>
									<div><span style={{marginLeft: "30px"}}>Api key:</span>
										<div><input className="modal_upload_input_key"
											id="inputApiKey"
											placeholder="Your Pinata api key"
											value={ApiKey}
											onChange={(e) => { setApiKey(e.target.value); }}
										/></div>
									</div>
									<div><span style={{marginLeft: "30px"}}>Secret key:</span>
										<div><input className="modal_upload_input_key"
											id="inputSecretKey"
											placeholder="Your Pinata secret key"
											value={SecretApiKey}
											onChange={(e) => { setSecretApiKey(e.target.value); }}
										/></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="modal_div_button">
						<button className="App-button" onClick={() => {cancelFunc(); setInputName("");setFileSize(0);}}>Cancel</button>
						<button className="App-button" onClick={validCallback} disabled={(inputName.length === 0) ? true : ""}>Upload</button>
					</div>
				</div>
			  </div>
			</div>
		  </div>
		</>,
		document.body
	)

	ModalUpload.propTypes = {
	isUploadShowing: PropTypes.bool.isRequired,
	cancelFunc: PropTypes.func.isRequired,
	validFunc: PropTypes.func.isRequired,
	pathUpload: PropTypes.string.isRequired
	};
}

export default ModalUpload;
