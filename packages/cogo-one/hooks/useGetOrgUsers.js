import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useState } from 'react';

const PAGE_LIMIT = 100;

const getPayload = ({ orgId = '', userId = '', searchQuery = '' }) => ({
	filters: {
		organization_id : orgId,
		user_id         : userId || undefined,
		q               : searchQuery || undefined,
	},
	page_limit: PAGE_LIMIT,
});

const useGetOrgUsers = ({ orgId = '', userId = '' }) => {
	const [query, setQuery] = useState('');
	const [initialLoad, setInitialLoad] = useState(true);

	const { query: searchQuery, debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'get',
	}, { manual: true });

	const fetchUser = useCallback(async () => {
		try {
			await trigger({
				params: getPayload({ orgId, userId, searchQuery }),
			});
			setInitialLoad(false);
		} catch (error) {
			console.error(error);
		}
	}, [orgId, searchQuery, trigger, userId]);

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
