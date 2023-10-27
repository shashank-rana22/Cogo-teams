import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetLeaderbordList(props) {
	const { view, dateRange, pageLimit, setUpdatedAt = () => {} } = props;

	const [params, setParams] = useState({
		page                     : 1,
		page_limit               : pageLimit,
		user_data_required       : true,
		role_data_required       : true,
		add_user_kam_report_data : ['owner_wise', 'manager_wise'].includes(view),
		filters                  : {
			report_view_type        : view,
			created_at_greater_than : dateRange?.startDate || undefined,
			created_at_less_than    : dateRange?.endDate || undefined,
		},
	});

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/reports',
		method  : 'GET',
		authkey : 'get_agent_scoring_reports',
		params,
	}, { manual: false });

	const { list = [], total_report_count = 0, report_synced_at = '' } = data || {};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			add_user_kam_report_data : ['owner_wise', 'manager_wise'].includes(view),
			filters                  : {
				...(previousParams.filters || {}),
				report_view_type : view || undefined,
				report_type      : ['owner_wise', 'manager_wise', 'kam_wise'].includes(view)
					? `${view.split('_')?.[GLOBAL_CONSTANTS.zeroth_index]}_report` : undefined,
				created_at_greater_than : dateRange?.startDate || undefined,
				created_at_less_than    : dateRange?.endDate || undefined,
			},
		}));
	}, [view, dateRange]);

	useEffect(() => {
		setUpdatedAt(report_synced_at);
	}, [report_synced_at, setUpdatedAt]);

	return {
		list,
		loading,
		trigger,
		total_report_count,
	};
}

export default useGetLeaderbordList;