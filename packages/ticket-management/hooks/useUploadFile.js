import { publicRequest, request } from '@cogoport/request';

const uploadFile = (index) => async (value, onUploadProgress) => {
	const { data } = await request({
		method : 'GET',
		url    : '/get_media_upload_url',
		params : {
			file_name: value.name,
		},
	});

	const { url, headers } = data;

	await publicRequest({
		url,
		data    : value,
		method  : 'PUT',
		headers : {
			...headers,
			'Content-Type': value.type,
		},
		onUploadProgress: onUploadProgress(index),
	});

	const finalUrl = url.split('?')[0];

	return finalUrl;
};

export default uploadFile;
