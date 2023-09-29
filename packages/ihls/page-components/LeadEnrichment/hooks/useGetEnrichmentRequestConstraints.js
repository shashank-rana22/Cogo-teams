import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetEnrichmentRequestConstraints = ({ enrichment_request_id }) => {
	const [params, setParams] = useState({
		page_limit               : 10,
		page                     : 1,
		pagination_data_required : true,
		enrichment_request_id,
	});
	const [{ data, loading }] = useRequest({
		url    : 'list_enrichment_request_constraints',
		method : 'get',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	return {
		loading,
		response: (list || []),
		setParams,
		params,
		paginationData,
	};
};

export default useGetEnrichmentRequestConstraints;
