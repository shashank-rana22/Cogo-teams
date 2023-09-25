import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetLeaderbordList(props) {
	const { view } = props;

	const [params, setParams] = useState({
		page               : 1,
		page_limit         : 8,
		user_data_required : true,
		role_data_required : true,
		filters            : {
			report_view_type: view,
			// created_at_greater_than : new Date(),
			// created_at_less_than : new Date(),
		},
	});

	const [{ data, loading }] = useAllocationRequest({
		url     : '/reports',
		method  : 'GET',
		authkey : 'get_agent_scoring_reports',
		params,
	}, { manual: false });

	const { list = [] } = data || {};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				report_view_type : view || undefined,
				report_type      : ['owner_wise', 'manager_wise', 'kam_wise'].includes(view)
					? `${view.split('_')?.[GLOBAL_CONSTANTS.zeroth_index]}_report` : undefined,
			},
		}));
	}, [view]);

	return {
		list,
		loading,
	};
}

export default useGetLeaderbordList;
