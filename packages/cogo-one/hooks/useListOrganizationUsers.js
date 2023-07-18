import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import formatOrganizationUsers from '../helpers/formatOrganizationUsers';

const getParams = ({ organizationId, query }) => ({
	filters    : { organization_id: organizationId,	q: query || undefined },
	page       : 1,
	page_limit : 100,

});

const useListOrganizationUsers = ({ organizationId }) => {
	const [search, setSearch] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'get',
	}, { manual: true });

	const { debounceQuery, query } = useDebounceQuery();

	const getOrganizationUsers = useCallback(() => {
		if (!organizationId) {
			return;
		}

		try {
			trigger({ params: getParams({ organizationId, query }) });
		} catch (err) {
			console.error('err', err);
		}
	}, [trigger, organizationId, query]);

	useEffect(() => {
		getOrganizationUsers();
	}, [getOrganizationUsers]);

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	useEffect(() => {
		setSearch('');
	}, [organizationId]);

	return {
		formattedOrgUsersList: organizationId ? formatOrganizationUsers({ data }) : [],
		loading,
		setSearch,
		search,
	};
};
export default useListOrganizationUsers;
