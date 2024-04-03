import axios from "axios";
const FormData = require('form-data');

const pinFileToIPFSurl = "https://api.pinata.cloud/pinning/pinFileToIPFS";

/// @notice Upload file to ipfs with Pinata
/// @param fileUpload pointer to file
/// @param ownerAddress owner address
/// @param fileName name of file
/// @param pinataAPIkey pinata key
/// @param pinataAPIsecret pinata secret key
/// @return CID of file on ipfs, null on error
export const PinataUploadToIPFS = async (fileUpload, ownerAddress, fileName, pinataAPIkey, pinataAPIsecret) => {
  //Create formData and add file
  let data = new FormData();
  data.append('file', fileUpload);

  //Metadata is in the form of a JSON object that's been converted to a string
  const metadata = JSON.stringify({
    name: fileName,
    keyvalues: {
      owner: ownerAddress,
    },
  });
  data.append('pinataMetadata', metadata);

  //pinataOptions
  const pinataOptions = JSON.stringify({
    cidVersion: 1,
  });
  data.append('pinataOptions', pinataOptions);

  try {
    const resFile = await axios.post(pinFileToIPFSurl, data, {
      maxBodyLength: 'Infinity', // needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataAPIkey,
        pinata_secret_api_key: pinataAPIsecret,
      },
    });
    //console.log('CID: ',resFile.data.IpfsHash);
    return resFile.data.IpfsHash;
  } catch (error) {
    console.error("Error sending File to IPFS: ", error.message); //Request failed with status code 403
    return null;
  }
};
