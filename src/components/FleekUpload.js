import fleek from '@fleekhq/fleek-storage-js';

/// @notice Upload file to ipfs with Fleek
/// @param fileUpload pointer to file
/// @param fileName name of file
/// @param APIkey Fleek PAT
/// @param APIsecret Fleek projectId
/// @return CID of file on ipfs, null on error
export const FleekUploadToIPFS = async (fileUpload, fileName, APIkey, APIsecret) => {

  try {
    console.log("fileUpload:", fileUpload);

    let filedata = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsArrayBuffer(fileUpload);
    });

    console.log("filedata:", filedata);
    if (filedata.byteLength === 0) {
      console.error("Error Empty content !");
      return null;
    }

    const input = {
      apiKey: APIkey,
      apiSecret: APIsecret,
      key: fileName, // key: `my-folder/my-file-name`, -> key: 'my-file-key',
      data: filedata,
    };
  
    const result = await fleek.upload(input);
    //The Access Key Id you provided does not exist in our records.

    console.log("result:", result);
    //return result;
    return null;

  } catch (error) {
    console.error("Error sending File to IPFS: ", error.message);
    return null;
  }
}
