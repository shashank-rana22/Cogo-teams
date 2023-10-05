import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const API_MAPPING = {
	organizations      : 'list_organizations',
	lead_organizations : 'list_lead_organizations',
};

const getParam = ({ orgId, searchValue }) => ({
	filters: {
		status : 'active',
		id     : !searchValue ? orgId : undefined,
		q      : searchValue || undefined,
	},
});

const useGetOrganizations = ({
	orgId = '',
	activeTab = '',
}) => {
	const [query, setQuery] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [initialLoad, setInitialLoad] = useState(true);
	const { query: searchValue = '', debounceQuery } = useDebounceQuery();

	const [{ loading, data = {} }, trigger] = useRequest({
		url    : `/${API_MAPPING[activeTab] || ''}`,
		method : 'get',
	}, { manual: true });

	const getOrganizations = useCallback(async () => {
		try {
			if (!API_MAPPING[activeTab]) {
				return;
			}
			await trigger({
				params: getParam({ orgId, searchValue: searchQuery }),
			});
			setInitialLoad(false);
		} catch (error) {
			console.error(error);
		}
	}, [activeTab, trigger, orgId, searchQuery]);

	useEffect(() => {
		debounceQuery(query?.trim());
	}, [debounceQuery, query]);

	useEffect(() => {
		setSearchQuery(searchValue || '');
	}, [searchValue]);

	useEffect(() => {
		getOrganizations();
	}, [getOrganizations]);

	return {
		organizationData     : loading ? {} : data,
		organizationsLoading : loading,
		getOrganizations,
		query,
		setQuery,
		setSearchQuery,
		initialLoad,
	};
};

export default useGetOrganizations;
