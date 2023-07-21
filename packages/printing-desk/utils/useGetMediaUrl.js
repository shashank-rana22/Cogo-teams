import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const READY_STATE_RESPONSE = 4;
const SUCCESS_RESPONSE_CODE = 200;

const useGetMediaUrl = () => {
	const uploadDocument = (file, documentData) => new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		const { url, headers } = JSON.parse(documentData);
		if (url) {
			xhr.open('PUT', url);
			xhr.onreadystatechange = () => {
				if (xhr.readyState === READY_STATE_RESPONSE) {
					if (xhr.status === SUCCESS_RESPONSE_CODE) {
						resolve(documentData);
					} else {
						reject(
							Toast.error('There as an issue uploading the document'),
						);
					}
				}
			};
			Object.keys(headers).forEach((header) => xhr.setRequestHeader(header, headers[header]));
			xhr.send(file);
		} else {
			Toast.error('Error in Uploading File, Try again!');
		}
	});

	const getRequest = (url, params) => new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `${url}?file_name=${params.file_name}`, true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === READY_STATE_RESPONSE) {
				if (xhr.status === SUCCESS_RESPONSE_CODE) {
					resolve(xhr.responseText);
				} else {
					reject(
						Toast.error('There as an issue uploading the document.'),
					);
				}
			}
		};
		xhr.send();
	});

	const getSignature = (params) => {
		const SIGNATURE_URL = `${process.env.NEXT_PUBLIC_REST_BASE_API_URL}/get_media_upload_url`;

		try {
			const response = getRequest(SIGNATURE_URL, params);
			return response.success ? response.data : response;
		} catch (error) {
			return error;
		}
	};
	const handleUpload = async (name, file) => {
		const res = await getSignature({ file_name: name }).then((response) => uploadDocument(file, response));
		const resObj = JSON.parse(res);

		return resObj.url.split('?')[GLOBAL_CONSTANTS.zeroth_index];
	};

	return { handleUpload };
};

export default useGetMediaUrl;
