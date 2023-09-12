import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useFetchLocations = (status) => {
	const [filter, setFilters] = useState({});
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_saas_air_schedule_subscription',
	}, { manual: true });

	useEffect(() => {
		trigger({
			params: {
				filter: { ...filter },
			},
		});
	}, [status, filter, trigger]);
	const refetchSchedule = () => {

	};
	return {
		data,
		filter,
		setFilters,
		loading,
		refetchSchedule,

	};
};

export default useFetchLocations;
