import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetServiceWiseOutstandingsStats = () => {
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
				is_precovid: 'NO',
			},
		});
	}, [
		authorizationparameters,
		selected_agent_id,
		trigger,
	]);

	return {
		serviceWiseLoading : loading,
		serviceWiseStats   : data || [],
	};
};

export default useGetServiceWiseOutstandingsStats;
