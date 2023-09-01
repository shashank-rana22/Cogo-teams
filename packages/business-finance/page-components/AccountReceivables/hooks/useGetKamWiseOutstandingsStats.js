import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetKamWiseOutstandingsStats = ({
	globalFilters,
}) => {
	const {
		profile: { authorizationparameters, selected_agent_id },
	} = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_kam_wise_outstanding_stats',
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
		globalFilters,
		trigger,
	]);

	return {
		kamWiseLoading : loading,
		kamWiseStats   : data || [],
	};
};

export default useGetKamWiseOutstandingsStats;
