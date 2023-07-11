import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useEditApplicableAgents = (props) => {
	const { roles } = props;

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [params, setParams] = useState({
		page       : 1,
		page_limit : 10,
		filters    : {
			role_ids : roles.map((role) => role.id),
			status   : 'active',
			q        : searchQuery || undefined,
		},
	});

	const [{ data, loading }] = useRequest({
		url    : 'list_partner_users',
		method : 'GET',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	const getNextPage = (nextPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: nextPage,
		}));
	};

	useEffect(() => {
		if (!searchQuery) return;

		setParams((previousParams) => ({
			...previousParams,
			page    : 1,
			filters : {
				...(previousParams.filters || {}),
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	return {
		list,
		loading,
		getNextPage,
		paginationData,
		debounceQuery,
		searchValue,
		setSearchValue,
	};
};

export default useEditApplicableAgents;
