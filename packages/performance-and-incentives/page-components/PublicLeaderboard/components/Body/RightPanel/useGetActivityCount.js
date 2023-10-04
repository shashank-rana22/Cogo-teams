import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetActivityCount(props) {
	const { view, dateRange } = props;

	const [statParams, setStatParams] = useState({
		filters: {
			report_view_type        : view,
			created_at_greater_than : dateRange?.startDate || undefined,
			created_at_less_than    : dateRange?.endDate || undefined,
		},
	});

	const [{ data, loading }] = useAllocationRequest({
		url     : '/report_stats',
		method  : 'GET',
		authkey : 'get_agent_scoring_report_stats',
		params  : statParams,
	}, { manual: false });

	useEffect(() => {
		setStatParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				report_view_type : view || undefined,
				report_type      : ['owner_wise', 'manager_wise', 'kam_wise'].includes(view)
					? `${view.split('_')?.[GLOBAL_CONSTANTS.zeroth_index]}_report` : undefined,
				created_at_greater_than : dateRange?.startDate || undefined,
				created_at_less_than    : dateRange?.endDate || undefined,
			},
		}));
	}, [view, dateRange]);

	return {
		data,
		loading,
	};
}

export default useGetActivityCount;
