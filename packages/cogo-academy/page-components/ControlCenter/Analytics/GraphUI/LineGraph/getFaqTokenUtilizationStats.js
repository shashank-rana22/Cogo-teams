import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import useGetFormattedGraphData from '../useGetFormattedGraphData';

function useGetFaqTokenUtilizationStats({ formatStartDate, formatEndDate }) {
	const [showTotalCost, setShowTotalCost] = useState(false);

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

	const { cost_details, ...rest } = data?.graph_data || {};

	const { graphData } = useGetFormattedGraphData({ graph_data: rest, source: 'token_utilization' });

	return {
		tokenData: graphData,
		loading,
		trigger,
		cost_details,
		showTotalCost,
		setShowTotalCost,
	};
}

export default useGetFaqTokenUtilizationStats;
