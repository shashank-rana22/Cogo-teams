import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState, useCallback, useMemo } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

const useGetLevels = () => {
	const [filters, setFilters] = useState({
		pageIndex   : 1,
		pageLimit   : 10,
		searchQuery : '',
	});
	const {
		search, pageIndex, pageLimit, incidentType, incidentSubtype, entityCode, level,
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

	const LEVEL_KEY_MAP = useMemo(() => ({
		1 : 'onlyLevel1IncidentApproval',
		2 : 'onlyLevel2IncidentApproval',
		3 : 'onlyLevel3IncidentApproval',
	}), []);

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	useEffect(() => {
		setFilters((prev) => ({ ...prev, pageIndex: 1 }));
	}, [query]);

	const getIncidentLevels = useCallback(async () => {
		try {
			await trigger({
				params: {
					q                      : query !== '' ? query : undefined,
					pageIndex,
					pageSize               : pageLimit,
					incidentType           : incidentType || undefined,
					incidentSubtype        : incidentSubtype || undefined,
					entityCode             : entityCode || undefined,
					[LEVEL_KEY_MAP[level]] : level ? true : undefined,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [pageIndex, pageLimit, query, trigger, incidentType, incidentSubtype, entityCode, level, LEVEL_KEY_MAP]);

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
