import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

const useGetLevels = () => {
	const [filters, setFilters] = useState({
		page        : 1,
		pageLimit   : 10,
		searchQuery : '',
	});
	const {
		search, page, pageLimit,
	} = filters || {};

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/incident-management/incident-approval/list',
			method  : 'get',
			authKey : 'get_incident_management_incident_approval_list',
		},
		{ manual: true },
	);

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	const getIncidentLevels = useCallback(async () => {
		try {
			await trigger({
				params: {
					q         : query !== '' ? query : undefined,
					pageIndex : page,
					pageSize  : pageLimit,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [page, pageLimit, query, trigger]);

	useEffect(() => {
		getIncidentLevels();
	}, [getIncidentLevels]);

	return {
		incidentLoading : loading,
		incidentData    : data,
		setFilters,
		filters,
		getIncidentLevels,
	};
};

export default useGetLevels;
