// from : https://textileio.github.io/storage-js/#ethpolygon

/*
import { init } from "@textile/eth-storage";

// fileUpload : file pointer
// signer : signer
export const FilecoinUploadToIPFS = async (fileUpload, signer) => {
	try {
		const storage = await init(signer);
		const deposit = await storage.addDeposit();
		console.log('deposit: ',deposit);

		const { id, cid } = await storage.store(fileUpload);
		console.log('ID: ',id);
		console.log('CID: ',cid);

		const { request, deals } = await storage.status(id);
		console.log('status_code: ',request.status_code);
		console.log('deals: ',[...deals]);

		await storage.releaseDeposit();

		return cid;
	} catch (error) {
		console.error("Error sending File to IPFS: ", error)
		return null;
	}
};
*/

/*
//C:\dvl\julien\ato-v4\src\web3\storage.js
//npm i web3.storage
//npm i minimist

https://old.web3.storage/docs/
  const args = minimist(process.argv.slice(2)) // slice(2) = process.env.REACT_APP_WEB3_STORAGE
  const token = args.token

*/

import { Web3Storage  } from 'web3.storage/dist/bundle.esm.min.js';

export const FilecoinUploadToIPFS = async (files, filecoinToken) => {
    // console.log("sending to ipfs ...");

    //function getAccessToken() {
    //    return process.env.REACT_APP_WEB3_STORAGE
    //}

    function makeStorageClient() {
        return new Web3Storage({ token: filecoinToken });
    }

    async function storeMetadata(files) {
        const client = makeStorageClient();
        const cid = await client.put(files);
        return cid;
    }

    const cid = (await storeMetadata(files));
    console.log("CID:", cid);
    return cid
}
