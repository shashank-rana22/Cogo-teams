import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetKamWiseOutstandingsStats = () => {
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
				is_precovid : 'NO',
				filters     : {
					sales_agent_id: selected_agent_id,
				},
			},
		});
	}, [
		authorizationparameters,
		selected_agent_id,
		trigger,
	]);

	return {
		kamWiseLoading : loading,
		kamWiseStats   : data || [],
	};
};

export default useGetKamWiseOutstandingsStats;
