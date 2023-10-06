import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useState } from 'react';

const PAGE_LIMIT = 100;

const API_MAPPING = {
	organizations      : 'list_organization_users',
	lead_organizations : 'list_lead_users',
};

const getPayload = ({ orgId = '', userId = '', searchQuery = '', orgType = '' }) => ({
	filters: {
		status               : orgType === 'organizations' ? 'active' : undefined,
		organization_id      : orgType === 'organizations' ? orgId || undefined : undefined,
		user_id              : userId || undefined,
		q                    : searchQuery || undefined,
		lead_organization_id : orgType === 'lead_organizations' ? orgId || undefined : undefined,
	},
	page_limit: PAGE_LIMIT,
});

const useGetOrgUsers = ({ orgId = '', userId = '', orgType = '' }) => {
	const [query, setQuery] = useState('');
	const [initialLoad, setInitialLoad] = useState(true);

	const { query: searchQuery, debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useRequest({
		url    : `/${API_MAPPING[orgType] || ''}`,
		method : 'get',
	}, { manual: true });

	const fetchUser = useCallback(async () => {
		try {
			if (!API_MAPPING[orgType]) {
				return;
			}
			await trigger({
				params: getPayload({ orgId, userId, searchQuery, orgType }),
			});
			setInitialLoad(false);
		} catch (error) {
			console.error(error);
		}
	}, [orgId, orgType, searchQuery, trigger, userId]);

	useEffect(() => {
		if (orgId) {
			fetchUser();
		}
	}, [fetchUser, orgId]);

	useEffect(() => {
		debounceQuery(query?.trim());
	}, [debounceQuery, query]);

	const isOrgUserIdPresent = !isEmpty(data?.list);

	return {
		orgLoading : loading,
		isOrgUserIdPresent,
		orgData    : data,
		setQuery,
		initialLoad,
	};
};

export default useGetOrgUsers;
