import { useAllocationRequest } from '@cogoport/request';

function useGetKamExpertiseDashboard(date_data) {
	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_dashboard',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_dashboard',
		params  : {
			filters: {
				created_at_greater_than : date_data.start_date,
				created_at_less_than    : date_data.end_date,
			},
		},
	});

	return {
		loading,
		dashboardData: data,
		refetch,
	};
}

export default useGetKamExpertiseDashboard;
