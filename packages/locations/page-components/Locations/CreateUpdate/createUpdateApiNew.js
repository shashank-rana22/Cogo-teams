import { request } from '@cogoport/request/helpers/request';

const createUpdateApi = async (api, params) => {
	const response = await request.post(api.endpoint, {
		...params,
	});
	return response;
};
export default createUpdateApi;
