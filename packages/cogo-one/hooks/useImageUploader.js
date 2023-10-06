import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { publicRequest, request } from '@cogoport/request';
import { useCallback } from 'react';

const useImageUploader = ({ setEmailState, setRteDisabled }) => {
	const uploadFile = useCallback(async (file, fileName) => {
		const { data } = await request({
			method : 'GET',
			url    : '/get_media_upload_url',
			params : {
				file_name: fileName,
			},
		});

		const { url, headers } = data;

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

		setEmailState((prev) => ({ ...prev, rteContent: `${prev.rteContent}\n<p><img src='${finalUrl}'/></p>` }));

		return finalUrl;
	}, [setEmailState]);

	const imageHandler = useCallback(() => {
		const input = document.createElement('input');

		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.onchange = async () => {
			const file = input.files[GLOBAL_CONSTANTS.zeroth_index];
			const formData = new FormData();

			formData.append('image', file);

			const fileName = file.name;
			setRteDisabled(true);
			await uploadFile(file, fileName);
			setRteDisabled(false);
		};
	}, [uploadFile, setRteDisabled]);

	return { imageHandler };
};

export default useImageUploader;
