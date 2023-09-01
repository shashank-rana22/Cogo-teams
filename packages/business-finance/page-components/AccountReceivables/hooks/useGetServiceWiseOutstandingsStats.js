import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetServiceWiseOutstandingsStats = ({
	globalFilters,
}) => {
	const {
		profile: { authorizationparameters, selected_agent_id },
	} = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_service_wise_outstanding_stats',
		method : 'GET',
	}, { manual: true });
	useEffect(() => {
		trigger({
			params: {
				is_precovid: 'No',
			},
		});
	}, [
		authorizationparameters,
		selected_agent_id,
		globalFilters,
		trigger,
	]);

	return {
		serviceWiseLoading : loading,
		serviceWiseStats   : data || [],
	};
};

export default useGetServiceWiseOutstandingsStats;
