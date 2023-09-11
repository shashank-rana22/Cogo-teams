import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useFetchLocations = (status) => {
	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_saas_air_schedule_subscription',
	}, { manual: true });

	useEffect(() => {
		trigger({
			params: {
				filters    : { status },
				page       : 1,
				page_limit : 10,
			},
		});
	}, [status, trigger]);

	return {
		list           : [],
		resolveLoading : loading,

	};
};

export default useFetchLocations;
