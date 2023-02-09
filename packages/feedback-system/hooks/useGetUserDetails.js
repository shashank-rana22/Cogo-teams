import { useRequest } from '@cogoport/request';

const useGetUserDetails = ({ userId = '' }) => {
	const [{ loading = false, data = {} }] = useRequest({
		url    : 'list_partner_users',
		method : 'get',
		params : { filters: { user_id: userId, status: 'active' } },
	}, { manual: false });

	const { list = [] } = data;
	const userData = list[0];

	return {
		loading,
		userData,
	};
};

export default useGetUserDetails;
