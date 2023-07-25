import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import formatOrganizationUsers from '../helpers/formatOrganizationUsers';

const getParams = ({ organizationId, query, filterKey }) => ({
	filters: filterKey === 'organization_id'
		? { [filterKey]: organizationId,	q: query || undefined } : undefined,
	lead_organization_id : filterKey === 'lead_organization_id' ? organizationId : undefined,
	page                 : 1,
	page_limit           : 100,

});

const useListOrganizationUsers = ({ organizationId = '', endPoint = '', filterKey = '' }) => {
	const [search, setSearch] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		url    : `/${endPoint}`,
		method : 'get',
	}, { manual: true });

	const { debounceQuery, query } = useDebounceQuery();

	const getOrganizationUsers = useCallback(() => {
		if (!organizationId) {
			return;
		}

		try {
			trigger({ params: getParams({ organizationId, query, filterKey }) });
		} catch (err) {
			console.error('err', err);
		}
	}, [organizationId, trigger, query, filterKey]);

	useEffect(() => {
		getOrganizationUsers();
	}, [getOrganizationUsers]);

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	return {
		formattedOrgUsersList: organizationId ? formatOrganizationUsers({ data, filterKey }) : [],
		loading,
		setSearch,
		search,
	};
};
export default useListOrganizationUsers;
