import { useDebounceQuery } from '@cogoport/forms';
import { useAthenaRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetObjectiveInfo = ({ objectiveLeadId }) => {
	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
	});

	const [searchValue, setSearchValue] = useState('');

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ loading = false, data = {} }] = useAthenaRequest({
		url    : 'get_objective_list',
		method : 'get',
		params : {
			...params,
			cogo_lead_ids: [objectiveLeadId],
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
