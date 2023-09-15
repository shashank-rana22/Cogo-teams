import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const list = [
	{
		id          : 1,
		objective   : 'org_name ka kuch bada sa naam',
		entity      : 'any pan',
		agent_roles : 'any iec',
		creation    : 'any source',
		activation  : 'date',

	},
	{
		id          : 2,
		objective   : 'org_name ka kuch bada sa naam',
		entity      : 'any pan',
		agent_roles : 'any iec',
		creation    : 'any source',
		activation  : 'date',

	},
];

const useGetLeadEnrichmentLogs = ({ id = null }) => {
	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
		id,
	});

	const [searchValue, setSearchValue] = useState('');

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ loading = false }] = useRequest({
		url    : 'list_enrichment_request',
		method : 'get',
		params,
	}, { manual: false });

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
		debounceQuery,
		searchValue,
		setSearchValue,
		setParams,
	};
};

export default useGetLeadEnrichmentLogs;
