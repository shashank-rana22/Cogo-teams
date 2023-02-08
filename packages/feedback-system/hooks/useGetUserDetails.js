import { useRequest } from '@cogoport/request';

const useGetUserDetails = ({ userId = '' }) => {
	const [{ loading = false, data: userData = {} }] = useRequest({
		url    : 'list_partner_users',
		method : 'get',
		params : { filters: { user_id: userId, status: 'active' } },
	}, { manual: false });

	return {
		loading,
		userData,
	};
};

export default useGetUserDetails;
