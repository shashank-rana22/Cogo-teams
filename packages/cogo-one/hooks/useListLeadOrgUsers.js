import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_PAGE_NUMBER = 1;

const getParams = ({ query, page }) => ({
	filters                 : query ? { q: query } : undefined,
	lead_user_data_required : true,
	agent_data_required     : true,
	page,
	page_limit              : 6,
});

const useListLeadOrgUsers = () => {
	const [search, setSearch] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_lead_organization_users',
		method : 'get',
	}, { manual: true });

	const { debounceQuery, query } = useDebounceQuery();

	const getOrganizationUsers = useCallback(({ page }) => {
		try {
			trigger(
				{ params: getParams({ query, page }) },
			);
		} catch (err) {
			console.error('err', err);
		}
	}, [query, trigger]);

	const handlePagination = (val) => {
		getOrganizationUsers({ page: val });
	};

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		getOrganizationUsers({ page: DEFAULT_PAGE_NUMBER });
	}, [getOrganizationUsers]);

	return {
		data,
		loading,
		search,
		setSearch,
		handlePagination,
	};
};
export default useListLeadOrgUsers;
