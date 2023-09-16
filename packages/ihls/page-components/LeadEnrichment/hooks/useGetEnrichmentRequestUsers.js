import { useForm, useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetEnrichmentRequestUsers = ({ enrichment_request_id }) => {
	const [params, setParams] = useState({
		page_limit               : 10,
		page                     : 1,
		pagination_data_required : true,
	});
	const [{ data, loading }, refetch] = useRequest({
		url    : 'list_enrichment_users',
		method : 'get',
		params,
	}, { manual: false });

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const { control, reset, watch } = useForm();

	const { list = [], ...paginationData } = data || {};

	useEffect(() => {
		const subscription = watch((value) => {
			const {
				enrichment_source_id,
				enrichment_status,
			} = value;

			setParams((previousParams) => ({
				...previousParams,
				filters: {
					...(previousParams.filters || {}),
					enrichment_source_id : enrichment_source_id || undefined,
					enrichment_status    : enrichment_status || undefined,
				},
			}));
		});

		return () => subscription.unsubscribe();
	}, [watch, setParams]);

	useEffect(() => {
		if (params?.filters?.enrichment_request_id !== enrichment_request_id) {
			setParams((previousParams) => ({
				...previousParams,
				filters: {
					enrichment_request_id,
				},
			}));
		}
	}, [enrichment_request_id, params]);

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
		response: (list || []),
		refetch,
		control,
		reset,
		setParams,
		params,
		debounceQuery,
		paginationData,
	};
};

export default useGetEnrichmentRequestUsers;
