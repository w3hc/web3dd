import { FleekSdk, PersonalAccessTokenService } from '@fleekxyz/sdk';

/// @notice Upload file to ipfs with Fleek
/// @param fileUpload pointer to file
/// @param fileName name of file
/// @param FleekAPIkey Fleek key
/// @param FleekAPIsecret Fleek secret key
/// @return CID of file on ipfs, null on error
export const FleekUploadToIPFS = async (fileUpload, fileName, APIkey, APIsecret) => {

  try {
    const patService = new PersonalAccessTokenService({
      personalAccessToken: APIkey,
      projectId: APIsecret
    })

    const fleekSdk = new FleekSdk({ accessTokenService: patService });

    const uploadToIPFS = async (filename, filedata) => {
      const result = await fleekSdk.ipfs().add({
        path: filename,
        content: filedata,
      })
      console.log('result', result);
      return result;
    }
    console.log("fileUpload:", fileUpload);
    //var blob = new Blob([ethers.utils.toUtf8String(dataFile)]);
    const resFile = await uploadToIPFS(fileName, fileUpload);
    console.log("resFile:", resFile);
  } catch (error) {
    console.error("Error sending File to IPFS: ", error.message);
    return null;
  }
}
