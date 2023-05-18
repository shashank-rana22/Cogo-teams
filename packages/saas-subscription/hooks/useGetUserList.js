import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetUserList = () => {
	const [globalFilters, setGlobalFilters] = useState({
		page             : 1,
		customer_segment : 'platform_user',
	});
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_saas_subscription_customers',
	}, { manual: true });

	const refectUserList = async () => {
		const { page, customer_segment, search } = globalFilters;
		try {
			await trigger({
				params: {
					service_object_required : true,
					filters                 : { customer_segment, q: search },
					page,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	console.log(globalFilters, 'globalFilters');
	useEffect(() => {
		refectUserList();
	}, [globalFilters]);

	return {
		userList: data, loading, refectUserList, globalFilters, setGlobalFilters,
	};
};

export default useGetUserList;
