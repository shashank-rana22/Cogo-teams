import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetActivityCount(props) {
	const { view } = props;

	const [statParams, setStatParams] = useState({
		filters: {
			report_view_type: view,
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
				report_view_type: view || undefined,
			},
		}));
	}, [view]);

	return {
		data,
		loading,
	};
}

export default useGetActivityCount;
