import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useMyDetails = (partner_user_id) => {
	// const myDetailsApi = useRequest(
	// 	'get',
	// 	true,
	// 	'partner',
	// )('/get_partner_user', {
	// 	params: { id: partner_user_id },
	// });

	const [{ loading = false, data }, trigger] = useRequest({
		url    : 'get_partner_user',
		method : 'GET',
	}, { manual: true });

	const profileDetailsApi = () => {
		trigger({
			params: { id: partner_user_id },
		});
	};

	useEffect(() => {
		profileDetailsApi();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		detailsData : data?.data,
		refetch     : profileDetailsApi,
		loading,
	};
};

export default useMyDetails;
