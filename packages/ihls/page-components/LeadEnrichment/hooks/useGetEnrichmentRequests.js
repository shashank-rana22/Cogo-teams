import { useForm, useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetEnrichmentRequests = () => {
	const [params, setParams] = useState({
		page_limit               : 10,
		page                     : 1,
		pagination_data_required : true,
	});
	const [{ data, loading }] = useRequest({
		url    : 'list_enrichment_requests',
		method : 'get',
		params,
	}, { manual: false });

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const { control, handleSubmit, reset, watch } = useForm();

	const { list = [], ...paginationData } = data || {};

	useEffect(() => {
		const subscription = watch((value) => {
			const {
				enrichment_source_id,
			} = value;

			setParams((previousParams) => ({
				...previousParams,
				filters: {
					...(previousParams.filters || {}),
					enrichment_source_id: enrichment_source_id || undefined,
				},
			}));
		});

		return () => subscription.unsubscribe();
	}, [watch, setParams]);

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	const handleClick = async (formValues) => {
		const {
			account_name,
			assigned_by,
			enrichment_agency,
		} = formValues;
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				account_name      : account_name || undefined,
				assigned_by       : assigned_by || undefined,
				enrichment_agency : enrichment_agency || undefined,
			},
		}));
	};

	return {
		loading,
		response: (list || []),
		control,
		handleClick,
		handleSubmit,
		reset,
		setParams,
		params,
		debounceQuery,
		paginationData,
	};
};

export default useGetEnrichmentRequests;
