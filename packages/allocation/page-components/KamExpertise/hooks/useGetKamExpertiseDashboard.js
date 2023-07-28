/* eslint-disable no-magic-numbers */
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetKamExpertiseDashboard() {
	const [kamLevel, setKamLevel] = useState(0);

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_dashboard',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_dashboard',
		params  : {
		},
	});

	useEffect(() => {
		setKamLevel();
	}, []);

	return {
		loading,
		dashboardData: data,
		refetch,
		kamLevel,
		setKamLevel,
	};
}

export default useGetKamExpertiseDashboard;
