import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { publicRequest, request } from '@cogoport/request';

const uploadFile = async (value) => {
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
	});

	const finalUrl = url.split('?')[GLOBAL_CONSTANTS.zeroth_index];

	return finalUrl;
};

export default uploadFile;
