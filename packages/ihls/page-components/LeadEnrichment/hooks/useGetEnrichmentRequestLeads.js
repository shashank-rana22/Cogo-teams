import { useForm, useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetEnrichmentRequestLeads = ({ enrichment_request_id }) => {
	const [params, setParams] = useState({
		page_limit               : 10,
		page                     : 1,
		pagination_data_required : true,
		filters                  : {
			enrichment_request_filters: {
				enrichment_request_id,
			},
		},
	});

	const [{ data, loading }] = useRequest({
		url    : '/list_leads',
		method : 'get',
		params,
	}, { manual: false });

	const { list: response = [], ...paginationData } = data || {};

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const { control } = useForm();

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	return {
		loading,
		response: (response || []),
		control,
		debounceQuery,
		paginationData,
		setParams,
	};
};

export default useGetEnrichmentRequestLeads;
