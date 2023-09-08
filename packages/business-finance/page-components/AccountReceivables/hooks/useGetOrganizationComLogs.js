import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const useGetOrganizationComLogs = ({ orgData = {}, communication_type = 'meeting' }) => {
	const [filters, setFilters] = useState({ pageLimit: 10 });
	const { selfOrganizationId } = orgData || {};
	const { page, page_limit } = filters || {};
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_organization_communication_logs',
		method : 'get',
	}, { manual: true });

	const refetch = useCallback(async () => {
		trigger({
			params: {
				filters: {
					communication_type,
					organization_id    : selfOrganizationId,
					call_data_required : communication_type === 'call',
				},
				page_limit,
				page,
			},
		});
	}, [page, page_limit, selfOrganizationId, communication_type, trigger]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		loading,
		data,
		refetch,
		setFilters,
		filters,
	};
};

export default useGetOrganizationComLogs;
