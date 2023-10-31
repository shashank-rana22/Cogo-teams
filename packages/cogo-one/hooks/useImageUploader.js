import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { publicRequest, request } from '@cogoport/request';
import { useState } from 'react';

const useImageUploader = () => {
	const [disableRTE, setDisableRTE] = useState(false);

	const uploadFile = async ({ file, fileName }) => {
		try {
			const { data } = await request({
				method : 'GET',
				url    : '/get_media_upload_url',
				params : {
					file_name: fileName,
				},
			});

			const { url = '', headers } = data;

			await publicRequest({
				url,
				data    : file,
				method  : 'PUT',
				headers : {
					...headers,
					'Content-Type': file.type,
				},
			});

			const finalUrl = url.split('?')[GLOBAL_CONSTANTS.zeroth_index];

			return finalUrl;
		} catch (error) {
			Toast.error(error?.message || 'Error while uploading image.');
		}
		return null;
	};

	const onImageUploadBefore = (files, _info, uploadHandler) => {
		try {
			const file = files[GLOBAL_CONSTANTS.zeroth_index];
			setDisableRTE(true);
			uploadFile({ file, fileName: file.name }).then((src) => {
				const response = {
					errorMessage : 'insert error message',
					result       : [
						{
							url  : src,
							name : file.name,
							size : file.size,
						},
					],
				};
				setDisableRTE(false);
				uploadHandler(response);
			});
		} catch (e) {
			console.error(e);
		}
		return undefined;
	};

	return { disableRTE, onImageUploadBefore };
};

export default useImageUploader;
