import { useRequest } from '@cogoport/request';

import useGetFormattedGraphData from '../useGetFormattedGraphData';

function useGetFaqTokenUtilizationStats({ formatStartDate, formatEndDate }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_token_utilization_stats',
		params : {
			filters: {
				start_date : formatStartDate || undefined,
				end_date   : formatEndDate || undefined,

			},
		},
	}, { manual: false });

	const { graph_data = {} } = data || {};

	const { graphData } = useGetFormattedGraphData({ graph_data, source: 'token_utilization' });

	return {
		tokenData: graphData,
		loading,
		trigger,
	};
}

export default useGetFaqTokenUtilizationStats;
