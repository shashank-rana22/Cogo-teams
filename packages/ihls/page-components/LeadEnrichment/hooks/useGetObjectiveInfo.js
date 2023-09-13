import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetObjectiveInfo = ({ allocationLeadId }) => {
	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
	});

	const [searchValue, setSearchValue] = useState('');

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ loading = false, data = {} }] = useRequest({
		url    : 'get_objective_list',
		method : 'get',
		params : {
			...params,
			allocation_lead_ids: [allocationLeadId],
		},
	}, { manual: false });

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			q: searchQuery || undefined,
		}));
	}, [searchQuery]);

	return {
		loading,
		response: (data?.list || []),
		debounceQuery,
		searchValue,
		setSearchValue,
		setParams,
	};
};

export default useGetObjectiveInfo;
