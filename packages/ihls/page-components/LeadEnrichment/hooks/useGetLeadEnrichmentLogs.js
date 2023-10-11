import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetLeadEnrichmentLogs = ({ leadId }) => {
	const [params, setParams] = useState({
		page_limit               : 10,
		page                     : 1,
		allocation_lead_id       : leadId,
		pagination_data_required : true,
	});

	const [{ data = {}, loading = false }] = useRequest({
		url    : 'org_enrichment_history',
		method : 'get',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	return {
		loading,
		response: (list || []),
		params,
		setParams,
		paginationData,
	};
};

export default useGetLeadEnrichmentLogs;
