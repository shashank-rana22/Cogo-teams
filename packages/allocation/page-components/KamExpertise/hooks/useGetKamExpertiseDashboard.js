import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetKamExpertiseDashboard(date_data) {
	const { start_date, end_date } = date_data || {};

	const [kamLevel, setKamLevel] = useState(0);

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_dashboard',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_dashboard',
		params  : {
			filters: {
				created_at_greater_than : start_date,
				created_at_less_than    : end_date,
			},
		},
	});

	useEffect(() => {
		setKamLevel();
	}, [date_data]);

	return {
		loading,
		dashboardData: data,
		refetch,
		kamLevel,
		setKamLevel,
	};
}

export default useGetKamExpertiseDashboard;
