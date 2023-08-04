import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import getEnrichmentSheetsColumns from '../utils/get-enrichment-sheets-columns';

const useEnrichmentSheets = () => {
	const { profile } = useSelector((state) => state || {});

	const {
		partner: { id: partner_id },
		user: { id: user_id },
	} = profile;

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [showUpload, setShowUpload] = useState(false);

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		filters    : {
			user_id,
			partner_id,
			q: searchQuery || undefined,
		},
	});

	const [{ loading, data }, refetch] = useAllocationRequest(
		{
			url     : '/feedback_response_sheets',
			method  : 'get',
			authkey : 'get_allocation_feedback_response_sheets',
			params,
		},
		{ manual: false },
	);

	const { list = [], ...paginationData } = data || {};

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...previousParams.filters,
				user_id,
				partner_id,
				q: searchQuery || undefined,
			},
		}));
	}, [partner_id, searchQuery, user_id]);

	const columns = getEnrichmentSheetsColumns();

	return {
		refetch,
		columns,
		list,
		paginationData,
		loading,
		setParams,
		getNextPage,
		debounceQuery,
		searchValue,
		setSearchValue,
		showUpload,
		setShowUpload,
	};
};

export default useEnrichmentSheets;
