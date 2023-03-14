import { cogoToast } from '@cogo/deprecated_legacy/ui';

const useGetMediaUrl = () => {
	const uploadDocument = (file, documentData) =>
		new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			const { url, headers } = JSON.parse(documentData);
			if (url) {
				xhr.open('PUT', url);
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							resolve(documentData);
						} else {
							reject(
								cogoToast.error('There as an issue uploading the document'),
							);
						}
					}
				};
				Object.keys(headers).forEach((header) =>
					xhr.setRequestHeader(header, headers[header]),
				);
				xhr.send(file);
			} else {
				cogoToast.error('Error in Uploading File, Try again!');
			}
		});

	const getRequest = (url, params) =>
		new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', `${url}?file_name=${params.file_name}`, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve(xhr.responseText);
					} else {
						reject(
							cogoToast.error('There as an issue uploading the document.'),
						);
					}
				}
			};
			xhr.send();
		});

	const getSignature = (params) => {
		const SIGNATURE_URL = `${process.env.REST_BASE_API_URL}/get_media_upload_url`;

		try {
			const response = getRequest(SIGNATURE_URL, params);
			return response.success ? response.data : response;
		} catch (error) {
			return error;
		}
	};
	const handleUpload = async (name, file) => {
		const res = await getSignature({ file_name: name }).then((response) =>
			uploadDocument(file, response),
		);
		const resObj = JSON.parse(res);

		return resObj.url.split('?')[0];
	};

	return { handleUpload };
};

export default useGetMediaUrl;
