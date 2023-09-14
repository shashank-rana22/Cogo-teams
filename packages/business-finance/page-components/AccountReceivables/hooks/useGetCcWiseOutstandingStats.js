import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetCcWiseOutstandingStats = ({ viewGraphStats = false }) => {
	const {
		profile: { authorizationparameters, selected_agent_id },
	} = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_cc_wise_outstanding_stats',
		method : 'GET',
	}, { manual: true });

	useEffect(() => {
		if (viewGraphStats) {
			trigger({
				params: {

					is_precovid: 'NO',

				},
			});
		}
	}, [
		authorizationparameters,
		selected_agent_id,
		trigger,
		viewGraphStats,
	]);
	return {
		ccWiseLoading : loading,
		ccWiseStats   : data || [],
	};
};

export default useGetCcWiseOutstandingStats;
